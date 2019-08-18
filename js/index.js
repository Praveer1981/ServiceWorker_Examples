// verify whether service worker is supported by browser or not
// navigator is a browser object
if (navigator.serviceWorker) {
    console.log('Service worker is suported by the browser')
    // register service worker
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw.js')
        .then(res => {
            console.log(`Service worker has registered ${res}`);
        })
        .catch(error => {
            console.log(`Failed to register SW ${error}`);
        })
    })
}