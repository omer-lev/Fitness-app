const menus = require('./menus');

const setMenu = (BMI) => {
    switch (true) {
        case BMI < 25:
            return menus.bulk;

            break;

        case BMI >= 25 && BMI <= 30:
            return menus.maintenance;

            break;

        case BMI > 30:
            return menus.cut;

            break;
    
        default:
            break;
    }
};

module.exports = setMenu;