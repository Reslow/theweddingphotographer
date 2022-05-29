/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["offline.html", "app.css", "index.css"]);
    })
  );
  self.skipWaiting();
  console.log("sw installed", new Date().toLocaleTimeString());
});

self.addEventListener("activate", () => {
  self.skipWaiting();
  console.log("sw activated", new Date().toLocaleTimeString());
});

// kolla om jag är online eller offline

self.addEventListener("fetch", async (event) => {
  // console.log(event.request.url);

  if (!navigator.onLine) {
    console.log("offline");
    if (event.request === "GET") {
      event.respondWith(
        caches.match(event.request).then((response) => {
          console.log("response", response);
          if (response) {
            return response;
          } else {
            return caches.match(new Request("offline.html"));
          }
        })
      );
    } else {
      console.log("online");
      const response = await updateCache(event.request);
      return response;
    }
  } else return;
});

async function updateCache(request) {
  const response = await fetch(request);

  const cache = await caches.open("v1");

  cache.put(request, response.clone());

  return response;
}
