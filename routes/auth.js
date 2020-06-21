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
    check('email').isEmail().withMessage("Please enter a valid email."),
    check('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
    check('confPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Confirmation password must match password.');
        return true;
    }),
    authController.postSignUp);

module.exports = router;