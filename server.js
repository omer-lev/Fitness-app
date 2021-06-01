const express = require('express');
const app = express();
const colors = require('colors');
const mongoose = require('mongoose');
const User = require('./models/User');

// Auth
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');

// Routes
const authRoutes = require('./routes/auth');
const userDefineRoutes = require('./routes/userDefine');
const workoutRoutes = require('./routes/workout');

// handlers
const isLoggedIn = require('./handlers/middleware');
const updateWeights = require('./handlers/updateWeights');

require('dotenv').config();

// Database connection
const connectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URI, connectionOptions)

const sessionConfig = {
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(session(sessionConfig));

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal({ usernameField: 'email' }, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Use routes
app.get('/', isLoggedIn, (req, res) => {
    res.render('home');
})

app.use('/', authRoutes);

app.use('/user_define', userDefineRoutes);

app.use('/workouts', workoutRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`.cyan);
})