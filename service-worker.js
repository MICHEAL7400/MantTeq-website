
const CACHE_NAME = 'mantteq-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/index.css',
  '/scripts/index.js',
  // Add other critical assets
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});