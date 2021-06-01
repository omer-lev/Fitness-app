const express = require('express');
const router = express.Router();

const User = require('../models/User');

const fbw = require('../workouts/fbw');
const ab = require('../workouts/ab');
const abc = require('../workouts/abc');
const aerobic = require('../workouts/aerobic');
const aerobic_ab = require('../workouts/aerobic_ab');
const aerobic_ab_switch = require('../workouts/aerobic_ab_switch');

// handlers
const isLoggedIn = require('../handlers/middleware');
const setWorkout = require('../handlers/setWorkout');
const updateWeights = require('../handlers/updateWeights');
const switchExcersizes = require('../handlers/switchExcersizes');


router.get('/', isLoggedIn, (req, res) => {
    const { BMI, schedule, id } = req.user;
    const workout = setWorkout(BMI, schedule);

    User.findById(id, (err, user) => {
        if (err) {
            console.log(err);
            req.flash('error', `${err}`);
            res.redirect('/');
        } else {
            res.redirect(`/workouts/${workout}`);
        }
    })
})

router.post('/', isLoggedIn, (req, res) => {
    const { id, BMI, schedule, workouts } = req.user;
    const diff = parseInt(Object.keys(req.body)[0]);

    const workout = setWorkout(BMI, schedule);

    const updatedUser = {
        lastDifficulty: diff,
        workouts: updateWeights(diff, workouts, req.user.currentWorkout)
    };

    User.findByIdAndUpdate(id, updatedUser, { new: true }, (err, user) => {
        if (err) {
            console.log(err);
            req.flash('error', `${err}`);
            res.redirect(`/workouts/${workout}`);
        } else {
            res.redirect('/');
        }
    })
})

router.get('/:id', isLoggedIn, (req, res) => {
    const workout = req.params.id;

    const selectionPages = [
        'fbw_or_abc', 
        'fbw_or_aerobic_ab_switch', 
        'fbw_or_ab', 
        'fbw_or_aerobic'
    ];

    
    if (selectionPages.indexOf(workout) != -1) {
        res.render('workoutSelection', { selection: req.params.id });
    } else {
        switchExcersizes(req, workout);

        req.user.currentWorkout = workout;
        req.user.save();

        for (let i = 0; i < req.user.workouts.length; i++) {
            if (JSON.stringify(req.user.workouts[i].name) == JSON.stringify(workout)) {
                res.render(`workouts/${workout}`, { excersizes: req.user.workouts[i] });
            }
        }
    }
})

router.post('/selection', (req, res) => {
    const workout = Object.keys(req.body)[0];

    switchExcersizes(req, workout);
    res.redirect(`/workouts/${workout}`);
})

module.exports = router;