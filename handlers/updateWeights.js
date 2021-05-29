const mongoose = require('mongoose');
const User = require('../models/User');

const updateWeights = (diff, excersizes) => {
    const updatedKg = excersizes;

    for (let i = 0; i < Object.keys(updatedKg).length; i++) {
        for (let j = 0; j < updatedKg[Object.keys(updatedKg)[i]].length; j++) {
            if (updatedKg[Object.keys(updatedKg)[i]][j].hasOwnProperty('kg')) {
                updatedKg[Object.keys(updatedKg)[i]][j].kg += diff;
            }
        }
    }

    return updatedKg;
}

module.exports = updateWeights;