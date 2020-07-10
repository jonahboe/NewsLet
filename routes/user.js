var express = require('express');
var router = express.Router();

const indexController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

router.get('/', indexController.getNews);
router.get('/saved-posts', isAuth, indexController.getSavedPosts);
router.get('/my-posts', isAuth, indexController.getMyPosts);
router.get('/create-post', isAuth, indexController.getCreatePost);
router.get('/:postId', indexController.getPostDetail);
router.post('/search', indexController.postSearch);
router.post('/create-post', isAuth, indexController.postCreatePost);
router.post('/delete-post', isAuth, indexController.postDeletePost);
router.post('/save-post', isAuth, indexController.postSavePost);
router.post('/delete-saved', isAuth, indexController.postDeleteSaved);

module.exports = router;
