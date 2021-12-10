let menu = "work";

const mealContainer = $('.meal .container');
const rightArrow = $('#right-arrow');
const leftArrow = $('#left-arrow');

let slideCount = 0;



rightArrow.on('click', () => {
    slideCount++;

    if (slideCount == 5) {
        rightArrow.css('visibility', 'hidden');
    };

    if (slideCount > 0) {
        leftArrow.css('visibility', 'visible');
    };

    switchSlide(slideCount);
});

leftArrow.on('click', () => {
    slideCount--;

    if (slideCount == 0) {
        leftArrow.css('visibility', 'hidden');
    }

    if (slideCount == 4) {
        rightArrow.css('visibility', 'visible');
    };

    switchSlide(slideCount);
});


const switchSlide = (slide) => {
    if (menu == "work") {
        mealContainer.html(`
            <h3>ארוחה ${slide + 1}</h3>

            ${
                workMenu[slide].map(food => {
                    return `<p>${food}</p>`;
                }).join('')
            }
        `);
    } else {
        mealContainer.html(`
            <h3>ארוחה ${slide + 1}</h3>

            ${
                restMenu[slide].map(food => {
                    return `<p>${food}</p>`;
                }).join('')
            }
        `);
    }

    
};