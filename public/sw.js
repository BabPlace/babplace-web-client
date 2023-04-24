// 서비스 워커 설치
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('cache-v1').then((cache) => {
//       return cache.addAll(['/']);
//     })
//   );
// });

// 서비스 워커 캐싱
self.addEventListener('fetch', async (event) => {
  // 특정 도메인에서 요청한 리소스만 캐싱
  if (
    event.request.url.startsWith('http://dapi.kakao.com/v2/local/search/') ||
    event.request.url.startsWith('https://dapi.kakao.com/v2/local/search/')
  ) {
    try {
      const cache = await caches.open('cache-v1');
      const response = await cache.match(event.request);
      if (response) {
        console.log('cache hit!!');
        console.log(response);
        return response;
      } else {
        const fetchResponse = await fetch(event.request);
        // 캐시 메타데이터 설정
        const cacheHeaders = new Headers(fetchResponse.headers);
        cacheHeaders.append('Cache-Control', 'max-age=3600');
        const cachedResponse = new Response(fetchResponse.body, {
          status: fetchResponse.status,
          statusText: fetchResponse.statusText,
          headers: cacheHeaders,
        });
        await cache.put(event.request, cachedResponse);
        return fetchResponse;
      }
    } catch (error) {
      // if fetching fails, skip the request
    }
  }
});

// 서비스워커 변경시 업데이트
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
