const logo = $('.nav .logo img');
const menu = $('.fa-bars');
const times = $('.drop-down .fa-times');
const mobileNav = $('.mobile-nav');
const popUp = $('.install-app');
const closePopUp = $('.install-app .fa-times');
const installAppBtn = $('.install-app button');

logo.on('click', () => {
    window.location.href = '/';
});

menu.on('click', () => {
    menu.toggle();
    mobileNav.toggle();
    times.toggle();
});

times.on('click', () => {
    menu.toggle();
    mobileNav.toggle();
    times.toggle();
});

closePopUp.on('click', () => {
    popUp.css('display', 'none');
});