const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    height: Number,
    weight: Number,
    schedule: Number,
    BMI: Number,
    workouts: Array, //? contains objects that hold different excersizes
    lastDifficulty: Number,
    currentWorkout: String,
    currentDay: String,
    entries: Number
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);