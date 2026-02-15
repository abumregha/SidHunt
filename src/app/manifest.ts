import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IdeaDigest - صائد الأفكار',
    short_name: 'IdeaDigest',
    description: 'ملخصات ذكية لأفضل أفكار ومواقع Reddit اليومية',
    start_url: '/',
    display: 'standalone',
    background_color: '#fcfcfc',
    theme_color: '#fcfcfc',
    icons: [
      {
        src: 'https://picsum.photos/seed/appicon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/appicon/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
