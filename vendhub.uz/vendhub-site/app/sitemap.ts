import { MetadataRoute } from 'next'

const BASE_URL = 'https://vendhub.uz'

const MACHINE_SLUGS = ['js-001-a01', 'jq-002-a', 'tcn-csc-8c-v49']

export default function sitemap(): MetadataRoute.Sitemap {
  const machinePages: MetadataRoute.Sitemap = MACHINE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/machines/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        ru: `${BASE_URL}/machines/${slug}`,
        uz: `${BASE_URL}/uz/machines/${slug}`,
      },
    },
  }))

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
    ...machinePages,
  ]
}
