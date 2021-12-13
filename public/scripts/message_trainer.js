const formBtn = $('.profile .profile-card form.section button');
const formInpt = $('.profile .profile-card form.section input')[0];
const messageConfirmation = $('.profile .profile-card .section#message-confirmation');

formBtn.on('click', async (e) => {
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

    messageConfirmation.css('display', 'flex');
});

$(document).ready(() => {
    $(window).keydown((e) => {
        if(e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });
});