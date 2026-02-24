import type { Product } from './types'

interface ProductPresentation {
  imageSrc: string | null
  caloriesKcal: number | null
  fallbackEmoji?: string
}

const PRODUCT_PRESENTATION_BY_ID: Record<string, ProductPresentation> = {
  'prod-espresso': {
    imageSrc: '/images/products/espresso.webp',
    caloriesKcal: 5,
  },
  'prod-americano': {
    imageSrc: '/images/products/americano.webp',
    caloriesKcal: 15,
  },
  'prod-cappuccino': {
    imageSrc: '/images/products/cappuccino.webp',
    caloriesKcal: 120,
  },
  'prod-latte': {
    imageSrc: '/images/products/latte.webp',
    caloriesKcal: 150,
  },
  'prod-flat-white': {
    imageSrc: '/images/products/flat-white.webp',
    caloriesKcal: 120,
  },
  'prod-maccoffee': {
    imageSrc: '/images/products/maccoffee.webp',
    caloriesKcal: 90,
  },
  'prod-ice-latte': {
    imageSrc: '/images/products/ice-latte.webp',
    caloriesKcal: 140,
  },
  'prod-ice-americano': {
    imageSrc: '/images/products/ice-americano.webp',
    caloriesKcal: 10,
  },
  'prod-tea-lemon': {
    imageSrc: '/images/products/tea-lemon.webp',
    caloriesKcal: 25,
  },
  'prod-tea-fruit': {
    imageSrc: '/images/products/tea-fruit.webp',
    caloriesKcal: 35,
  },
  'prod-matcha-latte': {
    imageSrc: '/images/products/matcha-latte.webp',
    caloriesKcal: 160,
  },
  'prod-cocoa': {
    imageSrc: '/images/products/cocoa.webp',
    caloriesKcal: 190,
  },
  'prod-ice': {
    imageSrc: '/images/products/ice.webp',
    caloriesKcal: 0,
    fallbackEmoji: '\uD83E\uDDCA',
  },
  'prod-water': {
    imageSrc: '/images/products/water.webp',
    caloriesKcal: 0,
    fallbackEmoji: '\uD83D\uDCA7',
  },
  'prod-cola': {
    imageSrc: '/images/products/cola.webp',
    caloriesKcal: 139,
    fallbackEmoji: '\uD83E\uDD64',
  },
  'prod-orange-juice': {
    imageSrc: '/images/products/orange-juice.webp',
    caloriesKcal: 112,
    fallbackEmoji: '\uD83C\uDF4A',
  },
  'prod-chocolate-bar': {
    imageSrc: '/images/products/chocolate-bar.webp',
    caloriesKcal: 230,
    fallbackEmoji: '\uD83C\uDF6B',
  },
  'prod-chips': {
    imageSrc: '/images/products/chips.webp',
    caloriesKcal: 270,
    fallbackEmoji: '\uD83E\uDD54',
  },
  'prod-croissant': {
    imageSrc: '/images/products/croissant.webp',
    caloriesKcal: 310,
    fallbackEmoji: '\uD83E\uDD50',
  },
  'prod-frappe': {
    imageSrc: '/images/products/frappe.webp',
    caloriesKcal: 220,
  },
}

export function getProductPresentation(
  product: Pick<Product, 'id' | 'image_url'>
): ProductPresentation {
  const item = PRODUCT_PRESENTATION_BY_ID[product.id]

  return {
    imageSrc: product.image_url ?? item?.imageSrc ?? null,
    caloriesKcal: item?.caloriesKcal ?? null,
    fallbackEmoji: item?.fallbackEmoji,
  }
}
