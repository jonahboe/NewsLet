const express = require('express');
const { check } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);
router.get('/logout', authController.getLogout);

router.post('/login', authController.postLogin);
router.post(
    '/signup',
    check('user_name').isAlphanumeric().withMessage("Username must be alphanumeric with no spaces."),
    check('user_name').custom((value, { req }) => {
       if (value.search(" ") !== -1)
           throw new Error('Username must be alphanumeric with no spaces.');
       return true;
    }),
    check('user_name').isLength({ min: 3 }).withMessage("Username must be at least 3 characters."),
    check('email').isEmail().withMessage("Please enter a valid email."),
    check('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
    check('confPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Confirmation password must match password.');
        return true;
    }),
    authController.postSignUp);

module.exports = router;