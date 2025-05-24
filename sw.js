const CACHE_NAME = 'v1'
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
]

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
})