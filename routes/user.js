var express = require('express');
var router = express.Router();

const indexController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

router.get('/', indexController.getNews);
router.get('/saved-articles', isAuth, indexController.getSavedArticles);
router.get('/my-posts', isAuth, indexController.getMyPosts);
router.get('/create-post', isAuth, indexController.getCreatePost);
router.post('/search', indexController.postSearch);
router.post('/create-posts', indexController.postCreatePost);


module.exports = router;
