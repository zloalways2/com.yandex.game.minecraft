const cacheName = "DefaultCompany-minecraft_clone-0.1.0";
const contentToCache = [
    "Build/265fb8c49b8a64d9b1c57924c92265c3.loader.js",
    "Build/63a39eee47a1cfebb9c9ca80386888f8.framework.js",
    "Build/066cdb7c223700ca8a4c6b761cc446ad.data",
    "Build/ef468134ab434c8d81cee29301e68d12.wasm",
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
