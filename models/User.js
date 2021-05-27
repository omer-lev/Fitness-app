const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const FBW = require('./FBW');

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
    lastDifficulty: String,

    excersizes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FBW'
        }
    ]
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);