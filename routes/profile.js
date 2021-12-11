const express = require('express');
const router = express.Router();
const setMenu = require('../handlers/setMenu');


router.get('/', (req, res) => {
    res.render('profile');
});

router.get('/nutrition', (req, res) => {
    const menu = setMenu(req.user.BMI);
    console.log(menu);

    res.render('nutrition', { menu: menu });
});

module.exports = router;