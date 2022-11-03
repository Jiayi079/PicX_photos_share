var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require('../conf/database');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Jiayi Gu" });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'login'});
});

router.get('/registration', (req, res, next) => {
  res.render('registration', { title: 'registration'});
});

router.use('/postimage', isLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render('postimage', { title: 'postimage'});
});

router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req,res,next) => {
  res.render('Imagepost', {title: `Post ${req.params.id}` });
});

module.exports = router;