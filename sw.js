const cacheName = 'spazza-feccia-v1';
const assets = ['index.html', 'style.css', 'main.js', 'livello2.js', 'mondo.webp', 'italia.webp'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});