// 서비스 워커 설치
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache-v1').then((cache) => {
      return cache.addAll(['/']);
    })
  );
});

// 서비스 워커 fetch 이벤트 처리
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
