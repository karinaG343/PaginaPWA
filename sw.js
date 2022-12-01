self.addEventListener("install", (e) => {
  caches.open("cache-v2").then((cache) => {
    cache.addAll([
      'css/style.css',
      'images/1.png',
      'images/2.png',
      'images/3.png',
      'images/4.png',
      'images/5.png',
      'images/6.png',
      'images/7.png',
      'images/facebook.png',
      'images/instagram.png',
      'images/twiter.png',
      'videos/1.mp4',
      'videos/2.mp4',
      'videos/3.mp4',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
    ]);
  });
  e.waitUntil(cacheProm);
});

self.addEventListener("fetch", (e) => {
  //cache-only
  e.respondWith(caches.match(e.request));
});

self.addEventListener('fetch', e =>{
  //cache with network fallback
  const respuesta = caches.match( e.request )
      .then ( res => {
          if ( res ) return res;
          //no existe el archivo
          //tengo que ir a la web
          console.log('No existe', e.request.url);
          return fetch( e.request ).then ( newResp => {
              caches.open('cache-v2')
                  .then( cache => {
                      cache.put( e.request, newResp);
                  }

                  )
              return newResp.clone;
          });
      });
      e.respondWith(respuesta);
  //only cache
  //e.respondWith( caches.match(e.request));
});