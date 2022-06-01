/* eslint-disable no-restricted-globals */
// listen for SW installed and save files to cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["/offline.html", "app.css", "index.css"]);
    })
  );
  self.skipWaiting();
  console.log("sw installed", new Date().toLocaleTimeString());
});

self.addEventListener("activate", () => {
  self.skipWaiting();
  console.log("sw activated", new Date().toLocaleTimeString());
});

// listen for fetches, checking if its a GET method and if I am offline.
// when offline check cache for matching file or send request for offline.html.
// if online I update cache
self.addEventListener("fetch", async (event) => {
  if (event.request.method === "GET") {
    if (!navigator.onLine) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          if (response) {
            return response;
          } else {
            return caches.match(new Request("/offline.html"));
          }
        })
      );
    } else {
      const response = await updateCache(event.request);
      return response;
    }
  }
});

async function updateCache(request) {
  const response = await fetch(request);

  const cache = await caches.open("v1");

  cache.put(request, response.clone());

  return response;
}
