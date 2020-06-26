const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        title: 'Log In',
        activeTab: 'auth',
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        title: 'Sign Up',
        activeTab: 'auth',
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('login');
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.render('auth/login', {
                    title: 'Log In',
                    activeTab: 'auth',
                    errorMessage: "Invalid email. Please try again."
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        console.log(user);
                        return req.session.save(err => {
                            res.redirect('/');
                        });
                    }
                    else {
                        return res.render('auth/login', {
                            title: 'Log In',
                            activeTab: 'auth',
                            errorMessage: "Invalid password. Please try again."
                        });
                    }
                })
                .catch(err => {
                    res.render('auth/login', {
                        title: 'Log In',
                        activeTab: 'auth',
                        errorMessage: "Error occurred. Please try again."
                    });
                });
        })
        .catch(err => console.log(err));
};

exports.postSignUp = (req, res, next) => {
    const name = req.body.user_name;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(442).render('auth/signup', {
            title: 'Sign Up',
            activeTab: 'auth',
            errorMessage: errors.array()[0].msg
        });
    }
    // Check email
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                return res.status(442).render('auth/login', {
                    title: 'Sign Up',
                    activeTab: 'auth',
                    message: "User email already exists. Please login."
                });
            }
            // Check username
            User.findOne({name:name})
                .then(userDoc2 => {
                    if (userDoc2) {
                        return res.status(442).render('auth/signup', {
                            title: 'Sign Up',
                            activeTab: 'auth',
                            errorMessage: "User name already exists. Please choose another."
                        });
                    }
                    return bcrypt
                        .hash(password, 12)
                        .then(hashedPassword => {
                            const user = new User({
                                name: name,
                                email: email,
                                password: hashedPassword,
                            });
                            return user.save();
                        })
                        .then(result => {
                            res.render('auth/login', {
                                title: 'Log In',
                                activeTab: 'auth',
                                isLoggedIn: req.session.isLoggedIn,
                                message: "Account created successfully. Please log in."
                            });
                        });
                });
        })
        .catch(err => {
            console.log(err);
        })
};