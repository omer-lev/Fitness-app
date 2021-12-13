const express = require('express');
const router = express.Router();
const isLoggedIn = require('../handlers/middleware');
const setMenu = require('../handlers/setMenu');
const TrainerMsg = require('../models/TrainerMsg');


router.get('/', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/nutrition', isLoggedIn, (req, res) => {
    const menu = setMenu(req.user.BMI);
    console.log(menu);

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