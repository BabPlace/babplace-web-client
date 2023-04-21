// 서비스 워커 설치
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache-v1').then((cache) => {
      return cache.addAll(['/']);
    })
  );
});

// 서비스 워커 캐싱
self.addEventListener('fetch', function (event) {
  // 특정 도메인에서 요청한 리소스만 캐싱
  if (
    event.request.url.startsWith('http://dapi.kakao.com/v2/local/search/') ||
    event.request.url.startsWith('https://dapi.kakao.com/v2/local/search/') ||
    event.request.url.startsWith('https://fonts.gstatic.com/')
  ) {
    event.respondWith(
      caches
        .open('cache-v1')
        .then((cache) => {
          return cache
            .match(event.request)
            .then((response) => {
              if (response) {
                console.log('cache hit!!');
                return response;
              } else {
                return fetch(event.request)
                  .then((response) => {
                    // 캐시 메타데이터 설정
                    var cacheHeaders = new Headers(response.headers);
                    cacheHeaders.append('Cache-Control', 'max-age=3600');
                    var cachedResponse = new Response(response.body, {
                      status: response.status,
                      statusText: response.statusText,
                      headers: cacheHeaders,
                    });
                    cache.put(event.request, cachedResponse);
                    return response;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              return new Response(error);
            });
        })
        .catch((error) => {
          return new Response(error);
        })
    );
  } else {
    console.log(event.request.url);
  }
});

// 서비스워커 변경시 업데이트
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
