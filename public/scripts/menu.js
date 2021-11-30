const mealContainer = $('.meal .container');
const rightArrow = $('#right-arrow');
const leftArrow = $('#left-arrow');

let slideCount = 0;
let menu = [
    [
        "food1",
        "food1",
        "food1",
    ],

    [
        "food2",
        "food2",
        "food2",
    ],

    [
        "food3",
        "food3",
        "food3",
    ],

    [
        "food4",
        "food4",
        "food4",
    ],

    [
        "food5",
        "food5",
        "food5",
    ],

    [
        "food6",
        "food6",
        "food6",
    ],
];

rightArrow.on('click', () => {
    slideCount++;

    if (slideCount == 5) {
        rightArrow.css('visibility', 'hidden');
    };

    if (slideCount > 0) {
        leftArrow.css('visibility', 'visible');
    };

    switchMenu(slideCount);
});

leftArrow.on('click', () => {
    slideCount--;

    if (slideCount == 0) {
        leftArrow.css('visibility', 'hidden');
    }

    if (slideCount == 4) {
        rightArrow.css('visibility', 'visible');
    };

    switchMenu(slideCount);
});


const switchMenu = (slide) => {
    mealContainer.html(`
        <h3>ארוחה ${slide + 1}</h3>

        ${
            menu[slide].map(food => {
                console.log(food);
                return `<p>${food}</p>`;
            }).join('')
        }
    `);
};