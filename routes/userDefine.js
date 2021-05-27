const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');

const isLoggedIn = require('../handlers/middleware');
const setWorkout = require('../handlers/setWorkout');



router.get('/', isLoggedIn, (req, res) => {
    res.render('user_define');
})

router.post('/', isLoggedIn, (req, res) => {
    const id = req.user.id;

    const { height, weight, schedule } = req.body;
    const BMI = (weight / (height / 100)**2).toFixed(1);

    const updatedUser = {
        height: height,
        weight: weight,
        schedule: schedule,
        BMI: BMI
    };

    User.findByIdAndUpdate(id, updatedUser, { new: true }, (err, user) => {
        const { BMI, schedule } = req.user;

        if (err) {
            console.log(err);
            req.flash('error', `${err}`)
            res.redirect('/user_define');
        } else {
            const id = setWorkout(BMI, schedule);
            res.redirect(`/workouts/${id}`);
        }
    })
})

module.exports = router;