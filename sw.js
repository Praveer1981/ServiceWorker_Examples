// cache your all the files in the browser

cacheName = "V2";
cacheAssets = [
    'index.html',
    './js/index.js'
]

// intall event
self.addEventListener('install', event => {
    console.log('service worker has been installed')
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('service worker is caching the file');
            cache.addAll(cacheAssets)
        })
        .then( ()=> self.skipWaiting())
    );
});

//activate event

self.addEventListener('activate', event => {
    console.log('service worker is activated');
    // we do not want to have the unwanted cache; so remove those unwanted cache here
    event.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map( cache => {
                    if (cache !== cacheName) {
                        console.log('Service worker cleared cache')
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// fetch event

self.addEventListener('fetch', event => {
    console.log('service worker has fetched');
    event.respondWith(
        fetch(event.request).catch( () => {
            caches.match(event.request)
        })
    );
});
