
var CACHE = 'datos';
const staticAssets = [
  './',
  './css/front.css',
  './css/front.css.map',
  './vendor/bootstrap/dist/css/bootstrap.min.css',
  './vendor/bootstrap/dist/css/bootstrap-grid.min.css',
  './vendor/bootstrap/dist/css/bootstrap-reboot.min.css',
  './vendor/bootstrap/dist/js/bootstrap.min.js',
  './vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
  './data.js',
  './manifest.json',
   './index.html',
  './sw.js'
];

self.addEventListener('install', function(evt) {
  //console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
});

self.addEventListener('fetch', function(evt) {
  var req = evt.request.clone();
  evt.waitUntil(update(evt.request));
  evt.respondWith(fromCache(evt.request));
   
  

});


function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request)
        .then(function (response) {
          return cache.put(request, response.clone())
                      .then(function () {
                        //console.log('Cache actualizado');
          return response;
      });
    });
  });
}
    

