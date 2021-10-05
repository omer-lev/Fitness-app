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

    popUp.css('display', 'flex');

    console.log(`--> DEFFERED PROMPT: ${defferedPrompt}`);
});

installAppBtn.on('click', async () => {
    if (!defferedPrompt)
        return;
    
    defferedPrompt.prompt();

    const result = await defferedPrompt.userChoice;
    console.log(`--> USER CHOICE: ${result}`);

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