const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const indexController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

router.get('/saved-posts', isAuth, indexController.getSavedPosts);
router.get('/my-posts', isAuth, indexController.getMyPosts);
router.get('/create-post', isAuth, indexController.getCreatePost);
router.get('/', indexController.getNews);
router.get('/:postId', indexController.getPostDetail);
router.post('/search', indexController.postSearch);
router.post('/create-post', isAuth,
    check('title').custom((value, { req }) => {
        if (value.length === 0 || value.length > 50)
            throw new Error('You must be a hacker.');
        return true;
    }),
    check('summary').custom((value, { req }) => {
        if (value.length === 0 || value.length > 100)
            throw new Error('You must be a hacker.');
        return true;
    }),
    check('article').custom((value, { req }) => {
        if (value.length === 0 || value.length > 1000)
            throw new Error('You must be a hacker.');
        return true;
    }),
    indexController.postCreatePost);
router.post('/delete-post', isAuth, indexController.postDeletePost);
router.post('/save-post', isAuth, indexController.postSavePost);
router.post('/delete-saved', isAuth, indexController.postDeleteSaved);

module.exports = router;
