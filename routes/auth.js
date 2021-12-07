const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');

const authSettings = {
    failureFlash: true,
    failureRedirect: '/login'
};

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new User({ username: username, email: email, password: password });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                req.flash('error', 'failed to automatically login after registration, please login manually');
                res.redirect('/login');
            } else {
                const redirectUrl = req.session.returnTo || '/user_define';
                delete req.session.returnTo;

                req.flash('success', 'Welcome to Fitness App!');
                res.redirect(redirectUrl);
            }
        })
    } catch (err) {
        req.flash('error', 'User already exists');
        res.redirect('/register');
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local', authSettings), (req, res) => {
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;

    req.flash('success', 'welcome back!');
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
    req.logOut();
    
    req.flash('error', 'logged out');
    res.redirect('/');
});


module.exports = router;