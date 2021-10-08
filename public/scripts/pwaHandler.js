const popUp = $('.install-app');
const closePopUp = $('.install-app .fa-times');
const installAppBtn = $('.install-app button');
let defferedPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defferedPrompt = e;

    // if mobile device
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        popUp.css('display', 'flex');
    }
});

installAppBtn.on('click', async () => {
    if (!defferedPrompt)
        return;
    
    defferedPrompt.prompt();

    const result = await defferedPrompt.userChoice;

    defferedPrompt = null;
    popUp.css('display', 'none');
});

window.addEventListener('appinstalled', (e) => {
    console.log(`--> APP INSTALLED: ${e}`);
    defferedPrompt = null;
});

closePopUp.on('click', () => {
    popUp.css('display', 'none');
});