const cacheName = "DefaultCompany-minecraft_clone-0.1.0";
const contentToCache = [
    "Build/15f0e5c4173b869da505231974e6a8b7.loader.js",
    "Build/63a39eee47a1cfebb9c9ca80386888f8.framework.js",
    "Build/d2169c423539f01f081b1c73c0564857.data",
    "Build/d74ad8ba696745a28ab804048e9d276d.wasm",
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
