const express = require('express');
const router = express.Router();

// handlers
const isLoggedIn = require('../handlers/middleware');
const setWorkout = require('../handlers/setWorkout');


router.get('/', isLoggedIn, (req, res) => {
    const { BMI, schedule } = req.user;
    const id = setWorkout(BMI, schedule);

    res.redirect(`/workouts/${id}`);
})

router.get('/:id', (req, res) => {
    res.send(req.params.id);
})

module.exports = router;