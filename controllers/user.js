exports.getNews = (req, res, next) => {
    res.render('user/news', {
        title: 'NewsLet',
        activeTab: 'news',
        showSearch: true,
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.getSavedArticles = (req, res, next) => {
    res.render('user/saved', {
        title: 'Saved',
        activeTab: 'saved',
        showSearch: true,
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.getMyPosts = (req, res, next) => {
    res.render('user/post', {
        title: 'Post',
        activeTab: 'post',
        showSearch: true,
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.postSearch = (req, res, next) => {
    res.render('user/news', {
        title: 'NewsLet',
        activeTab: 'news',
    });
};