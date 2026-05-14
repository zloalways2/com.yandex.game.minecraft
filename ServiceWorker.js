const cacheName = "DefaultCompany-minecraft_clone-0.1.0";
const contentToCache = [
    "Build/157167beb02f5a066085dbd2fe86e875.loader.js",
    "Build/2519eecac6e8aac55ca79ef9209aab0c.framework.js",
    "Build/0e796551d623ae741d14ae946ff9d23d.data",
    "Build/23d1d58a4ee76e57d0bd21d451787828.wasm",
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
