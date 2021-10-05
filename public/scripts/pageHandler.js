const logo = $('.nav .logo img');
const menu = $('.fa-bars');
const times = $('.drop-down .fa-times');
const mobileNav = $('.mobile-nav');


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