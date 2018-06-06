const version = 'static-v5';


const expectedCaches = [version];

self.addEventListener('install', event => {
  self.skipWaiting();

  console.log(version + ' 安装中');

  // cache a horse SVG into a new cache, staticversion + -
  event.waitUntil(
    caches.open(version).then(cache => {
      // cache.add('/images/horse.jpg');
      cache.add('/javascripts/pwa/index.js');
    })
  );
});

self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log(version + ' 现在可以处理请求！',+new Date());
    })
  );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 来来来，代理可以搞一些代理的事情

            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            if (response) {
                return response;
            }

            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            var request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {

                // http请求的返回已被抓到，可以处置了。

                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                // var responseClone = httpRes.clone();
                // caches.open(version).then(function (cache) {
                //     cache.put(event.request, responseClone);
                // });

                return httpRes;
            });
        })
    );
});