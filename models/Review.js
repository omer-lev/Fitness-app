const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    from: {
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
    },

    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Review', reviewSchema);