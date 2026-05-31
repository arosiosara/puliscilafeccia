const cacheName = 'spazza-feccia-v2'; // Incrementato a v2 per forzare la pulizia iniziale
const assets = [
  './',
  'index.html', 
  'style.css', 
  'main.js', 
  'livello1.js', // AGGIUNTO: Mancava nell'elenco!
  'livello2.js', 
  'mondo.webp', 
  'italia.webp'
];

// Installazione: scarica gli elementi nella cache aggiornata
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('SW: Pre-caching assets');
      return cache.addAll(assets);
    }).then(() => self.skipWaiting()) // Attiva immediatamente il nuovo SW
  );
});

// Attivazione: elimina AUTOMATICAMENTE le vecchie cache obsolete
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('SW: Cleared old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // Prende il controllo immediato delle pagine aperte
  );
});

// Strategia Network-First con fallback su Cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(networkResponse => {
        // Se la rete risponde, duplica il risultato aggiornato nella cache
        if (networkResponse && networkResponse.status === 200 && e.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(cacheName).then(cache => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Se la rete fallisce (es. sei offline o su mobile con poco campo), usa la cache
        return caches.match(e.request);
      })
  );
});