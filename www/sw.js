// Self-destruct service worker.
// Una volta installato, cancella tutte le cache e si disinstalla.
// Capacitor non ha bisogno del service worker: i file sono gia' bundlati nell'APK.
self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (_) {}
    try {
      await self.registration.unregister();
    } catch (_) {}
    try {
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach(c => { try { c.navigate(c.url); } catch (_) {} });
    } catch (_) {}
  })());
});

self.addEventListener("fetch", e => {
  // Network-first per tutto, in attesa che il SW venga disinstallato.
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
