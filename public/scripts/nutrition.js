let menuType = "work";

const mealContainer = $('.meal .container');
const rightArrow = $('#right-arrow');
const leftArrow = $('#left-arrow');
const workButton = $('#workButton')
const restButton = $('#restButton')

let slideCount = 0;

leftArrow.css('visibility', 'hidden');

workButton.on('click', () => {
    switchWorkType("work");
});

restButton.on('click', () => {
    switchWorkType("rest");
});

rightArrow.on('click', () => {
    slideCount++;

    switchSlide(slideCount);

    setArrows(slideCount);
});

leftArrow.on('click', () => {
    slideCount--;

    switchSlide(slideCount);

    setArrows(slideCount);
});

const switchSlide = (slide) => {
    if (menuType == "work") {
        mealContainer.html(`
            <h3>ארוחה ${slide + 1}</h3>

            <p dir="rtl">${workMenu[slide]}</p>
        `);
    } else {
        mealContainer.html(`
            <h3>ארוחה ${slide + 1}</h3>

            <p dir="rtl">${restMenu[slide]}</p>
        `);
    }
};

const switchWorkType = (type) => {
    menuType = type; 
    slideCount = 0;

    switchSlide(0);
    setArrows(0);
};

const setArrows = (slide) => {
    slide > 0 && leftArrow.css('visibility', 'visible');

    switch (true) {
        case slide == 0:
            leftArrow.css('visibility', 'hidden');
            rightArrow.css('visibility', 'visible');

            break;
    

        case slide == 4:
            rightArrow.css('visibility', 'visible');

            break;
    

        case slide == 5:
            rightArrow.css('visibility', 'hidden');

            break;
    
        default:
            break;
    }
};