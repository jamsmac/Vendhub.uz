'use client'

import { useTranslations } from 'next-intl'
import Card from '@/components/ui/Card'

const STATS = [
  { emoji: '\u2615', valueKey: 'machinesValue', labelKey: 'machines', accent: 'bg-orange-50' },
  { emoji: '\uD83E\uDD64', valueKey: 'drinksValue', labelKey: 'drinks', accent: 'bg-amber-50' },
  { emoji: '\uD83D\uDCCA', valueKey: 'ordersValue', labelKey: 'orders', accent: 'bg-emerald-50' },
  { emoji: '\u2B50', valueKey: 'ratingValue', labelKey: 'rating', accent: 'bg-yellow-50' },
] as const

export default function StatsSection() {
  const t = useTranslations('stats')

  return (
    <div className="relative -mt-8 z-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <Card key={stat.labelKey} hover className="p-6 text-center">
              <div
                className={`w-12 h-12 rounded-full ${stat.accent} flex items-center justify-center mx-auto text-2xl`}
              >
                {stat.emoji}
              </div>
              <div className="text-3xl font-bold text-espresso-dark mt-3">
                {t(stat.valueKey)}
              </div>
              <div className="text-sm text-chocolate/60 mt-1">{t(stat.labelKey)}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
