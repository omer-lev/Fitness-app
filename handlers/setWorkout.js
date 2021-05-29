const setWorkout = (BMI, schedule) => {
    switch (true) {
        case BMI > 0 && BMI <= 18.5:
            switch (schedule) {
                case 1:
                case 2:
                    return 'fbw';
                    break;
            
                default:
                    return 'abc';
                    break;
            }
        
        case BMI > 18.5 && BMI <= 25:
            switch(schedule) {
                case 1:
                case 2:
                    return 'ab';
                    break;
                
                default:
                    return 'fbw_abc';
                    break;
            }

        case BMI > 25 && BMI <= 30:
            switch(schedule) {
                case 1:
                    return 'fbw';
                    break;
                
                case 2:
                    return 'aerobic_ab_switch';
                    break;
                
                default:
                    return 'fbw_ab';
                    break;
            }

        case BMI > 30 && BMI <= 35:
            switch(schedule) {
                case 1:
                    return 'fbw_aerobic';
                    break;
                
                case 2:
                    return 'aerobic_ab_switch';
                    break;
                
                default:
                    return 'ab_aerobic';
                    break;
            }
        
        case BMI > 35:
            switch(schedule) {
                case 1:
                    return 'aerobic';
                    break;
                
                case 2:
                    return 'aerobic_ab_switch';
                    break;
                
                default:
                    return 'ab_aerobic';
                    break;
            }
        
        default:
            break;
    }
};

module.exports = setWorkout;