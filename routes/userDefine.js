const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');

const fbw = require('../workouts/fbw');
const ab = require('../workouts/ab');
const abc = require('../workouts/abc');
const aerobic = require('../workouts/aerobic');
const aerobic_ab = require('../workouts/aerobic_ab');
const aerobic_ab_switch = require('../workouts/aerobic_ab_switch');

const isLoggedIn = require('../handlers/middleware');
const setWorkout = require('../handlers/setWorkout');



router.get('/', isLoggedIn, (req, res) => {
    req.user.workouts.length > 0 ? res.redirect('/') : res.render('user_define');
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

    const selectionPages = [
        'fbw_or_abc', 
        'fbw_or_aerobic_ab_switch', 
        'fbw_or_ab', 
        'fbw_or_aerobic'
    ];

    User.findByIdAndUpdate(id, updatedUser, { new: true, useFindAndModify: false }, (err, user) => {
        if (err) {
            console.log(err);
            req.flash('error', `${err}`)
            res.redirect('/user_define');
        } else {
            const workoutName = setWorkout(user.BMI, user.schedule);
            
            res.redirect(`/workouts/${workoutName}`);
        }
    })
})

module.exports = router;