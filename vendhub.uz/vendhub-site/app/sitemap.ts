import { MetadataRoute } from 'next'

const BASE_URL = 'https://vendhub.uz'

const sections = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '#map', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '#menu', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '#benefits', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '#partner', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: '#about', changeFrequency: 'monthly' as const, priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return sections.map((section) => ({
    url: section.path ? `${BASE_URL}/${section.path}` : BASE_URL,
    lastModified: new Date(),
    changeFrequency: section.changeFrequency,
    priority: section.priority,
    alternates: {
      languages: {
        ru: section.path ? `${BASE_URL}/${section.path}` : BASE_URL,
        uz: section.path
          ? `${BASE_URL}/uz/${section.path}`
          : `${BASE_URL}/uz`,
      },
    },
  }))
}
