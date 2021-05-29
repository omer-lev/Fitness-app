const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');

const fbw = require('../workouts/fbw');
const ab = require('../workouts/ab');

const isLoggedIn = require('../handlers/middleware');
const setWorkout = require('../handlers/setWorkout');



router.get('/', isLoggedIn, (req, res) => {
    res.render('user_define');
})

router.post('/', isLoggedIn, (req, res) => {
    const id = req.user.id;

    const { height, weight, schedule } = req.body;
    const BMI = (weight / (height / 100)**2).toFixed(1);
    const workout = setWorkout(BMI, parseInt(schedule));

    const updatedUser = {
        height: height,
        weight: weight,
        schedule: schedule,
        BMI: BMI
    };

    User.findByIdAndUpdate(id, updatedUser, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            console.log(err);
            req.flash('error', `${err}`)
            res.redirect('/user_define');
        } else {
            user.excersizes = eval(workout);
            user.save();

            res.redirect(`/workouts/${workout}`);
        }
    })
})

module.exports = router;