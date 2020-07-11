const Post = require('../models/post');

exports.getNews = (req, res, next) => {
    const search = req.query.search;
    if (search !== undefined && search !== "") {
        let list = search.split(' ');
        Post.find({'tags': {$in: list}})
            .then(posts => {
                res.render('user/news', {
                    title: 'NewsLet',
                    activeTab: 'news',
                    showSearch: true,
                    isLoggedIn: req.session.isLoggedIn,
                    posts: posts.reverse(),
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        Post.find()
            .then(posts => {
                res.render('user/news', {
                    title: 'NewsLet',
                    activeTab: 'news',
                    showSearch: true,
                    isLoggedIn: req.session.isLoggedIn,
                    posts: posts.reverse(),
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
};

exports.getPostDetail = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            res.render('user/post-detail', {
                title: post.title,
                isLoggedIn: req.session.isLoggedIn,
                post: post,
            });
        })
        .catch(err => console.log(err));
};

exports.getSavedPosts = (req, res, next) => {
    req.user
        .populate('saved.items.postId')
        .execPopulate()
        .then(user => {
            const posts = user.saved.items;
            const filtered = posts.filter(post => {
                if (post.postId === null) {
                    req.user
                        .deleteSavedBySaveId(post._id)
                        .catch(err => console.log(err));
                    return false;
                }
                return true;
            });
            res.render('user/saved', {
                title: 'Saved',
                activeTab: 'saved',
                isLoggedIn: req.session.isLoggedIn,
                posts: filtered.reverse(),
            });
        })
        .catch(err => console.log(err));
};

exports.getMyPosts = (req, res, next) => {
    Post.find({ userId: req.session.user._id })
        .then(posts => {
            res.render('user/post', {
                title: 'Posts',
                activeTab: 'posts',
                isLoggedIn: req.session.isLoggedIn,
                posts: posts.reverse(),
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCreatePost = (req, res, next) => {
    res.render('user/create-post', {
        title: 'Create Post',
        activeTab: 'post',
        showSearch: false,
        isLoggedIn: req.session.isLoggedIn,
    });
};

exports.postSearch = (req, res, next) => {
    res.redirect('/')
};

exports.postCreatePost = (req, res, next) => {
    const title = req.body.title;
    const summary = req.body.summary;
    const article = req.body.article;
    const date = req.body.date;
    const image = req.file;
    const tags = req.body.tagString.split(',');

    const post = new Post({
        title: title,
        summary: summary,
        article: article,
        date: date,
        image: image.path.substring(7),
        tags: tags,
        userId: req.session.user,
        author: req.session.user.name,
    });
    post.save()
        .then(result => {
            // console.log(result);
            console.log('Created Post');
            res.redirect('/my-posts');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeletePost = (req, res, next) => {
    const postId = req.body.postId;
    Post.findById(postId)
        .then(post => {
            const fs = require('fs');
            fs.unlink("public/" + post.image, (err) => {
                if (err) {
                    throw err;
                }
            });
            post.remove();
            res.redirect('/my-posts');
        })
        .catch(err => console.log(err));
};

exports.postSavePost = (req, res, next) => {
    const postId = req.body.postId;
    Post.findById(postId)
        .then(post => {
            return req.user.savePost(post);
        })
        .then(result => {
            res.redirect('/saved-posts');
        });
};

exports.postDeleteSaved = (req, res, next) => {
    const postId = req.body.postId;
    req.user
        .deleteSaved(postId)
        .then(result => {
            res.redirect('/saved-posts');
        })
        .catch(err => console.log(err));
};