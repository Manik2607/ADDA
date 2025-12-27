import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ADDA - Akhnoor District Demand Association',
    short_name: 'ADDA',
    description: 'Official website of Akhnoor District Demand Association',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0284c7',
    icons: [
      {
        src: '/ADDA.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/ADDA.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/ADDA.png',
        sizes: '144x144',
        type: 'image/png',
      },
    ],
  }
}
