/**
 * Service Worker for SUSHI LAB
 * 
 * 【機能】
 * オフライン動作のためのキャッシュ戦略
 * Cache First: 静的アセット
 * Stale While Revalidate: その他
 */

const CACHE_NAME = 'sushi-lab-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/index.css',
    './css/components.css',
    './css/animations.css',
    './js/main.js',
    './js/app.js',
    './js/data/sushi.js',
    './js/data/manners.js',
    './js/data/phrases.js',
    './js/utils/i18n.js',
    './js/utils/filter.js',
    './js/utils/speech.js',
    './js/components/SushiCard.js',
    './js/components/MannerStep.js',
    './js/components/PhraseCard.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
