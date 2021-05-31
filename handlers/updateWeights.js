const mongoose = require('mongoose');
const User = require('../models/User');

const updateWeights = (diff, workouts, currentWorkout) => {
    const updatedKg = workouts;
    const index = updatedKg.findIndex(workout => workout.name === currentWorkout);

    for (let j = 1; j < Object.keys(updatedKg[index]).length; j++) {
        const excersizes = Object.keys(updatedKg[index])[j];

        for (let x = 0; x < updatedKg[index][excersizes].length; x++) {
            const excersize = updatedKg[index][excersizes][x];

            if (excersize.hasOwnProperty('kg')) {
                excersize.kg += diff;
            }
        }
    }

    return updatedKg;
}

module.exports = updateWeights;