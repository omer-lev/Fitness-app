const express = require('express');
const router = express.Router();

const User = require('../models/User');

// handlers
const isLoggedIn = require('../handlers/middleware');
const setWorkout = require('../handlers/setWorkout');
const updateWeights = require('../handlers/updateWeights');


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

router.get('/:id', isLoggedIn, (req, res) => {
    const workout = req.params.id;

    console.log(req.user.excersizes);

    res.render(`${workout}`, { excersizes: req.user.excersizes });
})

router.post('/', isLoggedIn, (req, res) => {
    const { id, BMI, schedule, excersizes } = req.user;
    const diff = parseInt(Object.keys(req.body));

    const workout = setWorkout(BMI, schedule);

    const updatedUser = {
        lastDifficulty: diff,
        excersizes: updateWeights(diff, excersizes)
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

module.exports = router;