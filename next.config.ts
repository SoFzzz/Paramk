import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // URLs con barra final (/sobre-mi/), como en la versión original
  trailingSlash: true,
  // Fecha de build: valor inicial del reloj (igual en servidor y cliente; se actualiza tras hidratar)
  env: { NEXT_PUBLIC_BUILD_DATE: new Date().toISOString() }
};

export default nextConfig;
