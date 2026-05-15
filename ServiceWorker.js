const cacheName = "DefaultCompany-minecraft_clone-0.1.0";
const contentToCache = [
    "Build/f3dea3e2a8fade1499b68cd83cc9364a.loader.js",
    "Build/2519eecac6e8aac55ca79ef9209aab0c.framework.js",
    "Build/e6c5a029fcd6e2f891d31a918d0c5a05.data",
    "Build/336340cc65f7c7cef3cab7a95e6e8720.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
