const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    review: {
        type: String,
        required: true,
    },

    workout: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);