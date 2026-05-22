const CACHE_NAME = 'rj-playbill-cache-v1';
const IMAGE_CACHE_NAME = 'rj-playbill-images-v1';

// App Shell assets to cache instantly
const PRECACHE_ASSETS = [
  '/programa_de_mano/',
  '/programa_de_mano/index.html',
  '/programa_de_mano/manifest.json',
  '/programa_de_mano/icons/icon.svg',
  '/programa_de_mano/icons/icon-maskable.svg'
];

// Install Event - Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching App Shell');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== IMAGE_CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Smart Intercept
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Strategy for images (local icons or external Unsplash / Pravatar)
  if (
    event.request.destination === 'image' ||
    requestUrl.hostname.includes('unsplash.com') ||
    requestUrl.hostname.includes('pravatar.cc') ||
    requestUrl.pathname.includes('images')
  ) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Serve immediately, but update cache in background for fresh profile pictures
            fetch(event.request)
              .then((networkResponse) => {
                if (networkResponse.status === 200) {
                  cache.put(event.request, networkResponse.clone());
                }
              })
              .catch(() => {/* Ignore network update failure offline */});
            return cachedResponse;
          }

          // Cache-First (fetch & cache on first load)
          return fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch((error) => {
              console.error('[Service Worker] Image fetch failed offline:', error);
              // Return a transparent 1x1 pixel SVG fallback if offline and not in cache
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"/>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            });
        });
      })
    );
    return;
  }

  // Strategy for local scripts, styles, HTML (Stale-While-Revalidate)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached resource immediately
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {/* Ignore network update failure offline */});
        return cachedResponse;
      }

      // If not in cache, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Cache it if it's a valid local asset request
        if (
          networkResponse.status === 200 &&
          (requestUrl.origin === location.origin || requestUrl.hostname.includes('fonts'))
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Fallback for HTML pages when completely offline
        if (event.request.mode === 'navigate') {
          return caches.match('/programa_de_mano/index.html') || caches.match('/programa_de_mano/');
        }
        throw err;
      });
    })
  );
});
