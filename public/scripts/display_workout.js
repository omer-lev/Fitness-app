const workoutName = $('.name h2');
const excersize = $('.excersize h2');
const title = $('.title h1');
const video = $('.video');
const view = $('.view');
const info = $('.info');

const leftArrow = $('#left-arrow');
const rightArrow = $('#right-arrow');

const feedbackForm = $('#feedback');
const diffBtn = $('.diffBtns div input');
const reviewInput = $('#reviewInpt');
const doneForm = $('#done');

let counter = 0;
let excersizeIndex = index;
let currentExcersize = Object.keys(excersizes)[excersizeIndex];

let finalExcersize = Object.keys(excersizes)[Object.keys(excersizes).length - 1];
let finalExcersizeIndex = excersizes[finalExcersize].length - 1;

let initialInfo = {
    kg: excersizes[currentExcersize][counter].kg,
    sets: excersizes[currentExcersize][counter].sets,
    reps: excersizes[currentExcersize][counter].reps,
    duration: excersizes[currentExcersize][counter].duration,
    speed: excersizes[currentExcersize][counter].speed
};


const updateWorkout = (name, excersizeName, t_info) => {
    info.html('');
    view.html('');
    
    // updating content
    if (excersizes.name != "fbw" && excersizes.name != "aerobic") {
        workoutName.text(`${excersizes[currentExcersize][counter].day} - ${name}`);
    } else {
        workoutName.text(`${name}`);
    }
    excersize.text(excersizeName);

    view.append(`<iframe src="${excersizes[currentExcersize][counter].url}" frameborder="0"></iframe>`);

    // displaying info
    for (let i = 0; i < Object.keys(t_info).length; i++) {
        const type = Object.keys(t_info)[i];
        const value = t_info[type];

        switch (true) {
            case type =="duration":
                if (value !== "דקה") {
                    info.append(`<li>${value} minutes</li>`);
                } else {
                    info.append(`<li>${value}</li>`)
                }
                break;

            case type == "speed":
                info.append(`<li>speed ${value}</li>`);
                break;

            case value == "כמות חזרות יורדת בהדרגה: 6-8-10-12":
                info.append(`<li>${value}</li>`);
                break;
        
            default:
                info.append(`<li>${value} ${type}</li>`);
                break;
        }
    }

    // if first excersize of day
    if (excersizeIndex == index && counter == 0) {
        leftArrow.css('visibility', 'hidden');
    }

    // if last excersize of day that isn't the last one (A, B...)
    if (excersizes[currentExcersize][counter].last && currentExcersize != finalExcersize) {
        doneForm.css('display', 'block');
        $('.workout').css('padding-bottom', '0');
        
        if (excersizes[currentExcersize][counter].day == "אירובי") {
            $('#done button').html(`סיים אימון אירובי`);
        } else {
            $('#done button').html(`${excersizes[currentExcersize][counter].day} סיים אימון`);
        }

        rightArrow.css('visibility', 'hidden');
    } else {
        doneForm.css('display', 'none');
    }
}

const setInfo = (allInfo) => {
    const updatedInfo = {};

    for (let i = 0; i < Object.keys(allInfo).length; i++) {
        if (allInfo[Object.keys(allInfo)[i]] !== undefined) {
            updatedInfo[Object.keys(allInfo)[i]] = allInfo[Object.keys(allInfo)[i]];
        }
    }

    return updatedInfo;
}

const updateInfo = () => {
    const allInfo = {
        kg: excersizes[currentExcersize][counter].kg,
        sets: excersizes[currentExcersize][counter].sets,
        reps: excersizes[currentExcersize][counter].reps,
        duration: excersizes[currentExcersize][counter].duration,
        speed: excersizes[currentExcersize][counter].speed
    };

    const updatedInfo = setInfo(allInfo);

    updateWorkout(
        currentExcersize,
        excersizes[currentExcersize][counter].name,
        updatedInfo
    );
}

// initialize page info
initialInfo = setInfo(initialInfo);
updateWorkout(
    currentExcersize,
    excersizes[currentExcersize][0].name,
    initialInfo
)

if (excersizeIndex == index && counter == 0) {
    leftArrow.css('visibility', 'hidden');
}

rightArrow.on('click', () => {
    if (counter + 1 < excersizes[currentExcersize].length) {
        counter++;

        updateInfo();
    } else {
        counter = 0;
        excersizeIndex++;
        currentExcersize = Object.keys(excersizes)[excersizeIndex];

        updateInfo();
    }

    if (currentExcersize == finalExcersize && counter == finalExcersizeIndex) {
        rightArrow.css('visibility', 'hidden');
        feedbackForm.css('display', 'block');
        $('.workout').css('padding-bottom', 0);
    }
    leftArrow.css('visibility', 'visible');
});

leftArrow.on('click', () => {
    if (counter - 1 != -1) {
        counter--;

        updateInfo();
    } else {
        excersizeIndex--;
        currentExcersize = Object.keys(excersizes)[excersizeIndex];
        counter = excersizes[currentExcersize].length - 1;

        updateInfo();
    }

    if (excersizeIndex == 1 && counter == 0) {
        leftArrow.css('visibility', 'hidden');
    }
    rightArrow.css('visibility', 'visible');
    feedbackForm.css('display', 'none');
    $('.workout').css('padding-bottom', '4vh');
});

feedbackForm.on('submit', (e) => {
    e.preventDefault();

    let diff, review;

    review = reviewInput[0].value;

    for (let i = 0; i < diffBtn.length; i++) {
        if (diffBtn[i].checked) {
            diff = diffBtn[i].value;
            console.log('diff', diff);
        }
    }
    
    $.ajax({
        url: '/workouts',
        method: 'POST',
        data: {
            diff: diff,
            review: review
        }
    });

    window.location.href = '/workouts';
})