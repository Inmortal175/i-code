/**
 * Service Worker para I CODE
 * Cachea imágenes y recursos estáticos
 */

const CACHE_NAME = 'icode-cache-v1';
const IMAGE_CACHE = 'icode-images-v1';

// Recursos para cachear en la instalación
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/main.css',
    './css/carousel.css',
    './css/candidato.css',
    './js/carousel.js',
    './js/proposals.js',
    './js/lazy-loading.js',
    './js/candidatos-data.js',
    './resource/img/LOGO ICODE v2 dorado.webp',
    './resource/img/favicon.webp',
    './resource/img/candidatos/FIGUEROA PEREZ, Franklin.webp'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    // console.log('[SW] Instalando Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // console.log('[SW] Cacheando archivos estáticos');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    // console.log('[SW] Activando Service Worker...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME && cache !== IMAGE_CACHE) {
                        // console.log('[SW] Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Solo cachear recursos del mismo origen
    if (url.origin !== location.origin) {
        return;
    }

    // Estrategia especial para imágenes
    if (request.destination === 'image' || 
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname)) {
        event.respondWith(handleImageRequest(request));
        return;
    }

    // Estrategia para otros recursos
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(request).then(response => {
                    // Solo cachear respuestas exitosas
                    if (!response || response.status !== 200) {
                        return response;
                    }
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                });
            })
    );
});

/**
 * Manejo especial de imágenes
 * Cache First con fallback a Network
 */
async function handleImageRequest(request) {
    // 1. Intentar desde el caché
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        console.log('[SW] Imagen desde caché:', request.url);
        return cachedResponse;
    }

    // 2. Intentar desde la red
    try {
        console.log('[SW] Descargando imagen:', request.url);
        const networkResponse = await fetch(request);
        
        // Si la descarga fue exitosa, guardar en caché
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(IMAGE_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Error al cargar imagen:', error);
        
        // 3. Fallback: imagen placeholder (opcional)
        // Puedes retornar una imagen por defecto aquí
        return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#2c2c2c"/><text x="50%" y="50%" fill="#ffd700" text-anchor="middle" dy=".3em">I CODE</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
}