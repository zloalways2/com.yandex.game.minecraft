const cacheName = "DefaultCompany-minecraft_clone-0.1.0";
const contentToCache = [
    "Build/6dba037a5666b2c728e2e741c2e876de.loader.js",
    "Build/f3bc1a878122c560f725f7c38815fed5.framework.js",
    "Build/e69884d473a202ea9d682a9360e5b67d.data",
    "Build/016e610c9462c9c69f2244d60af6f52f.wasm",
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
