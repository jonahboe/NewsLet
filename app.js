const createError = require('http-errors');
const express = require('express');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Set up connection to Heroku
const cors = require('cors');
const corsOptions = {
    origin: "https://arcane-temple-26045.herokuapp.com/",
    optionsSuccessStatus: 200
};
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

// Set up session tracking
const MONGODB_URI = "mongodb+srv://jonahboe:JuZnmv2Wj7VJcTB8@cse341-wbw23.azure.mongodb.net/news-let?retryWrites=true&w=majority";
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL || MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Route setup. You can implement more in the future!
const user = require('./routes/user');
const auth = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for mongoose
app.use(
    session({
        secret: 'thiasf3rf398h3208hf3028f0329h4',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// Check if the current user has a session
const User = require('./models/user');
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// Get the server going
mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {

        // Run our website
        app.use(express.static(path.join(__dirname, 'public')))
            .set('views', path.join(__dirname, 'views'))
            .set('view engine', 'pug')

            .use(
                multer({
                    storage: multer.diskStorage({
                        destination: (req, file, cb) => {
                            cb(null, 'public/images/posts');
                        },
                        filename: (req, file, cb) => {
                            cb(null, new Date().toISOString() + '-' + file.originalname);
                        }
                    })
                })
                .single('image')
            )

            .use('/auth', auth)
            .use('/', user)

            .use(function(req, res, next) {
                next(createError(404));
            })
            .use(function(err, req, res, next) {
                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error page
                res.status(err.status || 500);
                res.render('error', {
                    isLoggedIn: req.session.isLoggedIn
                });
            })
            .listen(PORT, () => console.log(`Listening on ${ PORT }`));
    })
    .catch(err => {
        console.log(err);
    });