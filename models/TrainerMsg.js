const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('TrainerMsg', trainerSchema);