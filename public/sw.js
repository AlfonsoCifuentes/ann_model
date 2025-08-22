const CACHE_NAME = 'ana-nicoleta-v1'
const OFFLINE_URL = '/offline'

// Assets críticos para cache inmediato
const CRITICAL_ASSETS = [
  '/',
  '/about',
  '/portfolio',
  '/contact',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Estrategias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
}

// Configuración de recursos
const RESOURCE_CONFIG = {
  images: {
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
    maxEntries: 100
  },
  pages: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    maxEntries: 50
  },
  api: {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 5 * 60 * 1000, // 5 minutos
    maxEntries: 20
  }
}

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching critical assets...')
        return cache.addAll(CRITICAL_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activar Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Interceptar peticiones
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Solo manejar peticiones HTTP/HTTPS
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Estrategia para imágenes
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    event.respondWith(handleImageRequest(request))
    return
  }

  // Estrategia para páginas
  if (request.mode === 'navigate') {
    event.respondWith(handlePageRequest(request))
    return
  }

  // Estrategia para API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Estrategia por defecto
  event.respondWith(handleDefaultRequest(request))
})

// Manejar peticiones de imágenes
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      // Revalidar en background
      fetch(request).then(response => {
        if (response.ok) {
          cache.put(request, response.clone())
        }
      }).catch(() => {
        // Error de red, usar cache
      })
      
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      // Gestionar límites de cache
      await manageCacheSize(cache, RESOURCE_CONFIG.images.maxEntries)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse

  } catch (error) {
    console.error('Error handling image request:', error)
    
    // Fallback image
    return new Response(
      '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="#9ca3af">Image not available</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    )
  }
}

// Manejar peticiones de páginas
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse

  } catch (error) {
    console.error('Network request failed:', error)
    
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }

    // Página offline como fallback
    const offlineResponse = await cache.match(OFFLINE_URL)
    if (offlineResponse) {
      return offlineResponse
    }

    // Fallback HTML básico
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Ana Nicoleta</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: system-ui; padding: 2rem; text-align: center;">
          <h1>You're offline</h1>
          <p>Please check your internet connection and try again.</p>
          <button onclick="location.reload()" style="padding: 0.5rem 1rem; margin-top: 1rem;">
            Retry
          </button>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache'
        }
      }
    )
  }
}

// Manejar peticiones API
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse

  } catch (error) {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }

    throw error
  }
}

// Manejar peticiones por defecto
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse

  } catch (error) {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }

    throw error
  }
}

// Gestionar tamaño del cache
async function manageCacheSize(cache, maxEntries) {
  const keys = await cache.keys()
  
  if (keys.length >= maxEntries) {
    // Eliminar las entradas más antiguas
    const entriesToDelete = keys.slice(0, keys.length - maxEntries + 1)
    await Promise.all(entriesToDelete.map(key => cache.delete(key)))
  }
}

// Limpiar caches antiguos
async function cleanupOldCaches() {
  const cacheNames = await caches.keys()
  const oldCaches = cacheNames.filter(name => name !== CACHE_NAME)
  
  await Promise.all(oldCaches.map(name => caches.delete(name)))
}

// Background sync para acciones diferidas
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync())
  }
})

async function handleBackgroundSync() {
  // Implementar lógica de sincronización en background
  console.log('Background sync triggered')
}

// Push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icons/portfolio-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Ana Nicoleta Portfolio', options)
  )
})

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/portfolio')
    )
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
  } else {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})
