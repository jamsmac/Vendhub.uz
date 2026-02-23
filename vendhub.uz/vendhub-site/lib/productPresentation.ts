import type { Product } from './types'

interface ProductPresentation {
  imageSrc: string | null
  caloriesKcal: number | null
  fallbackEmoji?: string
}

const PRODUCT_PRESENTATION_BY_ID: Record<string, ProductPresentation> = {
  'prod-espresso': {
    imageSrc: '/images/products/espresso.png',
    caloriesKcal: 5,
  },
  'prod-americano': {
    imageSrc: '/images/products/americano.png',
    caloriesKcal: 15,
  },
  'prod-cappuccino': {
    imageSrc: '/images/products/cappuccino.png',
    caloriesKcal: 120,
  },
  'prod-latte': {
    imageSrc: '/images/products/latte.png',
    caloriesKcal: 150,
  },
  'prod-flat-white': {
    imageSrc: '/images/products/flat-white.png',
    caloriesKcal: 120,
  },
  'prod-maccoffee': {
    imageSrc: '/images/products/maccoffee.png',
    caloriesKcal: 90,
  },
  'prod-ice-latte': {
    imageSrc: '/images/products/ice-latte.png',
    caloriesKcal: 140,
  },
  'prod-ice-americano': {
    imageSrc: '/images/products/ice-americano.png',
    caloriesKcal: 10,
  },
  'prod-tea-lemon': {
    imageSrc: '/images/products/tea-lemon.png',
    caloriesKcal: 25,
  },
  'prod-tea-fruit': {
    imageSrc: '/images/products/tea-fruit.png',
    caloriesKcal: 35,
  },
  'prod-matcha-latte': {
    imageSrc: '/images/products/matcha-latte.png',
    caloriesKcal: 160,
  },
  'prod-cocoa': {
    imageSrc: '/images/products/cocoa.png',
    caloriesKcal: 190,
  },
  'prod-ice': {
    imageSrc: '/images/products/ice.png',
    caloriesKcal: 0,
    fallbackEmoji: '\uD83E\uDDCA',
  },
  'prod-water': {
    imageSrc: '/images/products/water.png',
    caloriesKcal: 0,
    fallbackEmoji: '\uD83D\uDCA7',
  },
  'prod-cola': {
    imageSrc: '/images/products/cola.png',
    caloriesKcal: 139,
    fallbackEmoji: '\uD83E\uDD64',
  },
  'prod-orange-juice': {
    imageSrc: '/images/products/orange-juice.png',
    caloriesKcal: 112,
    fallbackEmoji: '\uD83C\uDF4A',
  },
  'prod-chocolate-bar': {
    imageSrc: '/images/products/chocolate-bar.png',
    caloriesKcal: 230,
    fallbackEmoji: '\uD83C\uDF6B',
  },
  'prod-chips': {
    imageSrc: '/images/products/chips.png',
    caloriesKcal: 270,
    fallbackEmoji: '\uD83E\uDD54',
  },
  'prod-croissant': {
    imageSrc: '/images/products/croissant.png',
    caloriesKcal: 310,
    fallbackEmoji: '\uD83E\uDD50',
  },
  'prod-frappe': {
    imageSrc: '/images/products/frappe.png',
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
