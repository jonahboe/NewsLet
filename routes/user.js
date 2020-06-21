var express = require('express');
var router = express.Router();

const indexController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

router.get('/', indexController.getNews);
router.get('/saved-articles', isAuth, indexController.getSavedArticles);
router.get('/my-posts', isAuth, indexController.getMyPosts);
router.post('/search', indexController.postSearch);


module.exports = router;
