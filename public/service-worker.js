importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

let defferedPrompt;
const popUp = $('.install-app');

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
);

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defferedPrompt = e;

    popUp.css('display', 'flex');

    console.log(`--> DEFFERED PROMPT: ${defferedPrompt}`);
});