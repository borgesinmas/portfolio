/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: Cloudflare Pages sirve la web como archivos (sin OpenNext).
  output: "export",
  // El optimizador de imágenes de Next necesita un servidor; en estático se desactiva.
  // Las imágenes ya están en WebP y a tamaño razonable.
  images: {
    unoptimized: true,
  },
  // Las cabeceras de seguridad viven en public/_headers (output: export ignora headers()).
};

export default nextConfig;
