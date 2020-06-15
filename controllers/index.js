let isLoggedIn = false;

exports.getNews = (req, res, next) => {
    res.render('news', {
        title: 'NewsLet',
        activeTab: 'news',
        isLoggedIn: isLoggedIn,
    });
};

exports.getSavedArticles = (req, res, next) => {
    res.render('saved', {
        title: 'Saved',
        activeTab: 'saved',
        isLoggedIn: isLoggedIn,
    });
};

exports.getMyPosts = (req, res, next) => {
    res.render('post', {
        title: 'Post',
        activeTab: 'post',
        isLoggedIn: isLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    isLoggedIn = true;
    console.log("You logged in!!!");
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    isLoggedIn = false;
    res.redirect('/');
};

exports.postSearch = (req, res, next) => {
    res.render('index', {
        title: 'NewsLet',
        activeTab: 'news',
    });
};