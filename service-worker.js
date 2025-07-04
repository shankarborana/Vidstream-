const CACHE_NAME = 'online-video-stream-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/app.js',
  '/js/theme.js',
  '/icons/favicon-32x32.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/video-placeholder.png'
  // Add more assets/icons as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Only cache assets, not torrent/video streams
  const reqUrl = new URL(event.request.url);
  if (ASSETS.some(asset => reqUrl.pathname.endsWith(asset))) {
    event.respondWith(
      caches.match(event.request).then(resp => resp || fetch(event.request))
    );
  }
});