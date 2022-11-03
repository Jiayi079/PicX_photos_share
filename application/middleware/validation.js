const checkUsername = (username) => {
    /**
     * Regex Explanation
     * ^    -->  start of the string
     * \D   -->  anything NOT a digit [^0-9]
     * \w   -->  anything that is a alphanumeric character [a-zA-Z0-9]
     * {2,} -->  2 or more characters w/ NO UPPER LIMIT
     */
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}

const checkPassword = (password) => {
    let userPasswordChecker = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return userPasswordChecker.test(password);
}

const checkEmail = (email) => {
    let userEmailChecker = /^\S+@\S+\.\S+$/;
    return userEmailChecker.test(email);
}

const registerValidator = (req, res, next) => {
    let username = req.body.username;
    if(!checkUsername(username)){
        req.flash('error','Invalid Username!!!');
        req.session.save(err => {
            res.redirect("/registration");
        });
    }else{
        next();
    }
    let password = req.body.password;
    if(!checkPassword(password)){
        req.flash('error', 'Invalid Password!!!');
        req.session.save(err => {
            res.redirect("/registration");
        })
    }
    let email = req.body.email;
    if(!checkEmail(email)){
        req.flash('error', 'Invalid Email!!!');
        req.session.save(err => {
            res.redirect("/registration");
        })
    }
}

const loginValidator = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if(!checkUsername(username)){
        req.flash('error', "Your username is not valid!!!");
        req.session.save(err =>{
            res.redirect("/login");
        });
    }else if(!checkPassword(password)){
        req.flash('error', "your password is not vaild!!!");
        req.session.save(err =>{
            res.redirect("/login");
        });
    }else{
        next();
    }
}

module.exports = {registerValidator, loginValidator};