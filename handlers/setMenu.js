const setMenu = (BMI) => {
    switch (true) {
        case BMI < 25:
            return "mass menu";

            break;

        case BMI >= 25 && BMI <= 30:
            return "maintenance menu";

            break;

        case BMI > 30:
            return "cut menu";

            break;
    
        default:
            return "default";
            break;
    }
};

module.exports = setMenu;