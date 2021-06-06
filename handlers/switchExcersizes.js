const fbw = require('../workouts/fbw');

const ab = require('../workouts/ab');
const abc = require('../workouts/abc');

const aerobic = require('../workouts/aerobic');
const aerobic_ab = require('../workouts/aerobic_ab');
const aerobic_ab_switch = require('../workouts/aerobic_ab_switch');


const switchExcersizes = (req, workout) => {
    let found = false;

    for (let i = 0; i < req.user.workouts.length; i++) {
        if (JSON.stringify(req.user.workouts[i].name) == JSON.stringify(workout)) {
            found = true;
        }
    }

    if (found === false) {
        req.user.workouts.push(eval(workout));
        req.user.currentWorkout = workout;

        if (workout == "ab" || workout == "abc") {
            req.user.currentDay = "a";
        }

        req.user.save();
    }
}

module.exports = switchExcersizes;