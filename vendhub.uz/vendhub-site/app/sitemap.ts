import { MetadataRoute } from 'next'

const BASE_URL = 'https://vendhub.uz'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ru: BASE_URL,
          uz: `${BASE_URL}/uz`,
        },
      },
    },
  ]
}
