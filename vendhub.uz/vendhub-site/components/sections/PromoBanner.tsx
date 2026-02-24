import { getTranslations } from 'next-intl/server'
import type { Promotion } from '@/lib/types'

interface PromoBannerProps {
  promo: Promotion | null
}

export default async function PromoBanner({ promo }: PromoBannerProps) {
  if (!promo) return null

  const t = await getTranslations('promoBanner')

  return (
    <section aria-label={t('ariaLabel')} className="mt-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-caramel to-caramel-dark p-8 sm:p-12 text-white">
          {/* Badge */}
          <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm font-medium mb-4">
            {t('badge')}
          </span>

          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            {promo.title}
          </h3>

          <p className="text-white/80 mt-2 max-w-md">
            {promo.description ?? ''}
          </p>

          <a
            href="#benefits"
            className="inline-flex items-center gap-1 bg-white text-caramel-dark font-medium rounded-xl px-6 py-3 mt-6 transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('more')} &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
