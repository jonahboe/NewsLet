var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();

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
const index = require('./routes/index');
const user = require('./routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

// for mongoose
app.use(
    session({
        secret: 'thiasf3rf398h3208hf3028f0329h4',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// Get the server going
mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {
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

        // Run our website
        app.use(express.static(path.join(__dirname, 'public')))
            .set('views', path.join(__dirname, 'views'))
            // For view engine as ejs
            //.set('view engine', 'ejs')
            // For view engine as Pug
            .set('view engine', 'pug') // For view engine as PUG.
            // For view engine as hbs (Handlebars)
            //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
            //.set('view engine', 'hbs')
            .use(bodyParser({extended: true})) // For parsing the body of a POST

            .use('/', index)
            .use('/user', user)

            .get('/', (req, res, next) => {
                // This is the primary index, always handled last.
                res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
            })
            .use(function(req, res, next) {
                next(createError(404));
            })
            .use(function(err, req, res, next) {
                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};

                // render the error page
                res.status(err.status || 500);
                res.render('error');
            })
            .listen(PORT, () => console.log(`Listening on ${ PORT }`));
    })
    .catch(err => {
        console.log(err);
    });