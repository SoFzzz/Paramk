import type { NextConfig } from 'next';

// Caché del navegador para los archivos de /public (los nombres no llevan hash, así que sin "immutable"):
// 7 días fresco y hasta 30 días sirviendo la copia mientras se revalida en segundo plano.
const staticCache = [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' }];

const nextConfig: NextConfig = {
  // URLs con barra final (/sobre-mi/), como en la versión original
  trailingSlash: true,
  // Fecha de build: valor inicial del reloj (igual en servidor y cliente; se actualiza tras hidratar)
  env: { NEXT_PUBLIC_BUILD_DATE: new Date().toISOString() },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Las variantes optimizadas se guardan 31 días (menos regeneraciones en la primera visita)
    minimumCacheTTL: 2678400
  },
  async headers() {
    return [
      { source: '/characters/:path*', headers: staticCache },
      { source: '/projects/:path*', headers: staticCache },
      { source: '/scene/:path*', headers: staticCache },
      { source: '/testimonials/:path*', headers: staticCache },
      { source: '/cv/:path*', headers: staticCache },
      { source: '/:file(photo.*|photo-sof.*|logo.*|favicon.*|apple-touch-icon.*|og.*)', headers: staticCache }
    ];
  }
};

export default nextConfig;
