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
            updateWorkoutDay(req);

            req.user.save();
            res.redirect('/');
        }
    })
})

router.post('/done', isLoggedIn, (req, res) => {
    updateWorkoutDay(req);
    console.log(req.user.currentDay);

    req.user.save();
    res.redirect('/');
})

router.get('/:id', isLoggedIn, (req, res) => {
    const workout = req.params.id;
    let t_index = 1;

    req.user.currentWorkout = workout;
    req.user.save();

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

        switch (workout) {
            case "ab":
                switch (req.user.currentDay) {
                    case "a":
                        t_index = 1;
                        break;
                
                    case "b":
                        t_index = 4;
                        break;
                
                    default:
                        break;
                }
                break;
        
            case "abc":
                switch (req.user.currentDay) {
                    case "a":
                        t_index = 1;
                        break;
                
                    case "b":
                        t_index = 4;
                        break;

                    case "c":
                        t_index = 7;
                        break;
                
                    default:
                        break;
                }
                break;

            case "aerobic_ab_switch":
                switch (req.user.currentDay) {
                    case "a":
                        t_index = 1;
                        break;
                
                    case "aerobic":
                        t_index = 4;
                        break;

                    case "b":
                        t_index = 6;
                        break;
                
                    default:
                        break;
                }
                break;

            case "aerobic_ab":
                switch (req.user.currentDay) {
                    case "aerobic":
                        t_index = 1;
                        break;
                
                    case "a":
                        t_index = 3;
                        break;

                    case "b":
                        t_index = 6;
                        break;
                
                    default:
                        break;
                }
                break;
        
            default:
                break;
        }

        for (let i = 0; i < req.user.workouts.length; i++) {
            if (JSON.stringify(req.user.workouts[i].name) == JSON.stringify(workout)) {
                res.render(`workouts/${workout}`, {
                    excersizes: req.user.workouts[i], 
                    index: t_index, 
                    firstExcersize: req.user.workouts[i][Object.keys(req.user.workouts[i])[t_index]][0] 
                });
            }
        }
    }
})

router.post('/selection', (req, res) => {
    const workout = Object.keys(req.body)[0];

    switchExcersizes(req, workout);
    res.redirect(`/workouts/${workout}`);
})


const updateWorkoutDay = (req) => {
    if (req.user.currentWorkout == "aerobic_ab_switch") {
        switch (req.user.currentDay) {
            case "a":
                req.user.currentDay = "aerobic"
                break;
        
            case "aerobic":
                req.user.currentDay = "b"
                break;
        
            case "b":
                req.user.currentDay = "a"
                break;
        
            default:
                break;
        }
    } 
    else if (req.user.currentWorkout == "aerobic_ab") {
        switch (req.user.currentDay) {
            case "aerobic":
                req.user.currentDay = "a"
                break;
        
            case "a":
                req.user.currentDay = "b"
                break;
        
            case "b":
                req.user.currentDay = "aerobic"
                break;
        
            default:
                break;
        }
    }
    else {
        switch (req.user.currentDay) {
            case "a":
                req.user.currentDay = "b"
                break;
        
            case "b":
                req.user.currentDay = "c"
                break;
        
            case "c":
                req.user.currentDay = "a"
                break;
        
            default:
                break;
        }
    }
}

module.exports = router;