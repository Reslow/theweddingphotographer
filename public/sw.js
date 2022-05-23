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
  console.log(event);

  if (!navigator.onLine) {
    console.log("offline");

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
  }
});
