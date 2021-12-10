const logo = $('.nav .logo img');
const menuElement = $('.fa-bars');
const timesElement = $('.drop-down .fa-times');
const mobileNav = $('.mobile-nav');


logo.on('click', () => {
    window.location.href = '/';
});

menuElement.on('click', () => {
    menuElement.toggle();
    mobileNav.toggle();
    timesElement.toggle();
});

timesElement.on('click', () => {
    menuElement.toggle();
    mobileNav.toggle();
    timesElement.toggle();
});