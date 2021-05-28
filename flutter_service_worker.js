'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "44e568a6f5605f4942418ee26b93b7e8",
"assets/assets/images/cars/acura_0.png": "feeb7137bfeeaf440b5cfc16bc65b733",
"assets/assets/images/cars/acura_1.png": "cfb1b206cb48952c8ade53d72c680ceb",
"assets/assets/images/cars/acura_2.png": "fd9ebf61ec16e6fb6c19b61d4374320f",
"assets/assets/images/cars/alfa_romeo_c4_0.png": "e7ae58c4d332186edbd397737c14d260",
"assets/assets/images/cars/camaro_0.png": "677bd08f93fae5f591fd7571c1c0af2d",
"assets/assets/images/cars/camaro_1.png": "9fa4d89425bff4288500294f805c96fb",
"assets/assets/images/cars/camaro_2.png": "562bdc074df939e8fab2e48e76643a87",
"assets/assets/images/cars/citroen_0.png": "2fa940165dbf8e93bba7c2fdc96a1ef1",
"assets/assets/images/cars/citroen_1.png": "a60afcd4ed2935a8e0a0c807b3ceb3c6",
"assets/assets/images/cars/citroen_2.png": "04ad288c18da9d48e16ebd008aebd20e",
"assets/assets/images/cars/ferrari_spider_488_0.png": "758173f3bed4f3fe44066790107cd534",
"assets/assets/images/cars/ferrari_spider_488_1.png": "4f5c94e7dc48807ba373915f005e5b92",
"assets/assets/images/cars/ferrari_spider_488_2.png": "cdf256ec3680ad0f2a7cc283333089cb",
"assets/assets/images/cars/ferrari_spider_488_3.png": "f35068f7d52ae64cd51157ae275d7ee0",
"assets/assets/images/cars/ferrari_spider_488_4.png": "1aa650ebc79837396bf4dec0fddc796a",
"assets/assets/images/cars/fiat_0.png": "f606c59406bed3066df0dc8f77fd9742",
"assets/assets/images/cars/fiat_1.png": "d1e2d3affc9c344abf4b94de121d844f",
"assets/assets/images/cars/ford_0.png": "c785b9c4aa4994978d89ed2c2633fdd4",
"assets/assets/images/cars/ford_1.png": "0a7083546bc392a6f7dc66904417ac9d",
"assets/assets/images/cars/honda_0.png": "f8e872966e53d4f81eacd325eecd2bfb",
"assets/assets/images/cars/land_rover_0.png": "c46ec62a20849574c15f62703dae2744",
"assets/assets/images/cars/land_rover_1.png": "746595c694bface1662c333f51772c25",
"assets/assets/images/cars/land_rover_2.png": "178a75ea05e9a15a0839e84faf41defc",
"assets/assets/images/cars/nissan_gtr_0.png": "b74c138a4b2bed105129359692995642",
"assets/assets/images/cars/nissan_gtr_1.png": "62676bafb54089dcfe996a0ca2241765",
"assets/assets/images/cars/nissan_gtr_2.png": "3042f543242ef12313847028383ce703",
"assets/assets/images/cars/nissan_gtr_3.png": "b5e0b1d9e6d188d1a6cbb936bcf2f441",
"assets/assets/images/dealers/avis.png": "29cf4766baaa2ff9dd63a171b101e045",
"assets/assets/images/dealers/hertz.png": "998da7c9d50f4d79895cd42c5d46618a",
"assets/assets/images/dealers/tesla.jpg": "9247d932cc0ebfa923c71070112b955a",
"assets/assets/images/users/user.jpg": "48bebe7fdf43a63725a00edb0142b317",
"assets/FontManifest.json": "e024588c84b5d20cb7869d6f908130e8",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "d5d0caccca4a6e9203026160f57196ba",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/line_icons/lib/assets/fonts/LineIcons.ttf": "23621397bc1906a79180a918e98f35b2",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "269eca3899e3ae4fd3c8628f85234741",
"/": "269eca3899e3ae4fd3c8628f85234741",
"main.dart.js": "d7f8b4ed899bf7950a15fad16e534c51",
"manifest.json": "20e1c87963eba49acf1505988c224776",
"version.json": "b3ab22c988d5d5b77c01ae97b294b187"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
