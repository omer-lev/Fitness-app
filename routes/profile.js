const express = require('express');
const router = express.Router();
const isLoggedIn = require('../handlers/middleware');
const setMenu = require('../handlers/setMenu');
const TrainerMsg = require('../models/TrainerMsg');


router.get('/nutrition', isLoggedIn, (req, res) => {
    const menu = setMenu(req.user.BMI);

    res.render('nutrition', { menu: menu });
});

router.post('/trainerMsg', (req, res) => {
    const message = req.body.message;

    const newMessage = new TrainerMsg({
        message: message,
        from: req.user.username
    });

    newMessage.save();
    console.log(newMessage);
});

module.exports = router;