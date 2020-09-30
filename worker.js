const cacheName = "static";
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(
                [
                    'index.html'
                ]
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event, request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event, request)
                    .then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    })

            })
    );
}); 