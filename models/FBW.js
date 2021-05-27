const mongoose = require('mongoose');

const fbwSchema = new mongoose.Schema({
    running: Object,
    chest: Array,
    legs: Array,
    back: Array,
    shoulders: Array,
    backArm: Array,
    frontArm: Array,
    stomache: Array
});

module.exports = mongoose.model('FBW', fbwSchema);