var express = require('express');
var router = express.Router();

const indexController = require('../controllers/index');


router.get('/', indexController.getNews);
router.get('/saved-articles', indexController.getSavedArticles);
router.get('/my-posts', indexController.getMyPosts);
router.post('/search', indexController.postSearch);
router.post('/login', indexController.postLogin);
router.post('/logout', indexController.postLogout);
router.post('/search', indexController.postSearch);


module.exports = router;
