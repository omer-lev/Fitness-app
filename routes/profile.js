const express = require('express');
const router = express.Router();
const setMenu = require('../handlers/setMenu');


router.get('/', (req, res) => {
    res.render('profile');
});

router.get('/nutrition', (req, res) => {
    // const { BMI } = req.body;
    const BMI = 25;
    const menu = setMenu(BMI);

    res.render('nutrition', { menu: menu });
});

module.exports = router;