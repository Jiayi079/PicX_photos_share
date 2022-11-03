var express = require('express');
var router = express.Router();
// var db = require("../conf/database");
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
var sharp = require('sharp');
var multer = require ('multer');
var crypto = require('crypto');
var PostModel = require('../models/Posts');
var PostError = require('../helpers/error/PostError');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb){
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});


router.post('/createPost', uploader.single("image"), (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;

    /**
     * do server validation on your own
     * not do in video must do on your own
     * if any values that used for the insert statement
     * are undefined, mysql.query or execute will fail
     * with the following error:
     * BIND parameters cannot be undefined
     */

     sharp(fileUploaded)
     .resize(200)
     .toFile(destinationOfThumbnail)
     .then(() =>{
        //  let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userId) VALUE(?,?,?,?, now(),?);;';
        //  return db.execute(baseSQL, [title, description, fileUploaded, destinationOfThumbnail, fk_userId]);
        return PostModel.create(title, description, fileUploaded, destinationOfThumbnail, fk_userId);
     })
     .then((postWasCreated)=>{
        if(postWasCreated){
            req.flash('success', "Your post was created successfully!");
            res.redirect('/');
        } else{
            throw new PostError('Post could not create!', 'postImage', 200)
        }
    })
     .catch((err) => {
         if(err instanceof PostError){
             errorPrint(err.getMessage());
             req.flash('error', err.getMessage());
             res.status(err.getStatus());
             res.redirect(err.getRedirectURL());
         } else{
             next(err);
         }
     })
})

router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                message: "No search term given",
                results: []
            });
        } else {
            let results = await PostModel.search(searchTerm);
            if (results.length) {
                res.send({
                    message: `${results.length} results found`,
                    results: results
                });
            } else {
                let results = await PostModel.getNRecentPosts(8);
                res.send({
                    message: "No results where found for your search but here are the 8 most recent posts",
                    results: results
                });
            }
        }
    } catch(err){
        next(err);
    }
});

module.exports = router;