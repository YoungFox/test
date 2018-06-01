var st = +new Date();
self.addEventListener('install', event => {
  console.log('V1 installing…');
  console.log('install time :' + (+new Date()-st));
  // cache a cat SVG
  event.waitUntil(
    
    caches.open('static-v1').then(cache => {cache.add('/images/cat.jpg');console.log('cache cat time :' + (+new Date()-st));})
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
  console.log('active time :' + (+new Date()-st));
});

console.log('fetch start');
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  console.log('fetch time :' + (+new Date()-st));
  // serve the cat SVG from the cache if the request is
  // same-origin and the path is 'dog.jpg'
  // debugger;
  console.log(url);
  if (url.origin == location.origin && url.pathname == '/images/dog.jpg') {
    event.respondWith(caches.match('/images/cat.jpg'));
  }
});
console.log('fetch end');