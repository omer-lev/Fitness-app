const trainerForm = $('.profile .profile-card form.section');
const formBtn = $('.profile .profile-card form.section button');
const formInpt = $('.profile .profile-card form.section input')[0];
const messageConfirmation = $('.profile .profile-card .section#message-confirmation');
const messageConfirmationTxt = $('.profile .profile-card .section#message-confirmation p');

formBtn.on('click', async () => {
    if (formInpt.value == "") return;

    formBtn[0].innerText = "...";

    $.ajax({
        url: '/profile/trainerMsg',
        method: 'POST',
        async: true,
        data: {
            message: formInpt.value
        }
    });

    formBtn[0].innerText = "send";
});

trainerForm.on('submit', (e) => {
    e.preventDefault();

    formInpt.value = "";
    messageConfirmation.css('display', 'flex');
});

messageConfirmationTxt.on('click', () => {
    console.log('clicked');
    messageConfirmation.css('display', 'none');
});

$(document).ready(() => {
    $(window).keydown((e) => {
        if(e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
});