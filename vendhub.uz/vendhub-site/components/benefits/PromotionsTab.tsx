'use client'

import { useState, useEffect } from 'react'
import { Copy, ChevronDown, ChevronUp, Zap, Tag, Gift } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { supabase } from '@/lib/supabase'
import { promotions as fallbackPromotions } from '@/lib/data'
import type { Promotion } from '@/lib/types'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'

export default function PromotionsTab() {
  const { showToast } = useToast()
  const t = useTranslations('promotions')
  const locale = useLocale()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [promotions, setPromotions] = useState<Promotion[]>(fallbackPromotions)

  useEffect(() => {
    supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (!error && data?.length) setPromotions(data as Promotion[])
      })
  }, [])

  const activePromos = promotions
    .filter((p) => p.is_active)
    .sort((a, b) => a.sort_order - b.sort_order)

  async function copyPromoCode(code: string) {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    showToast(t('copied'), 'success')
  }

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(locale === 'uz' ? 'uz-UZ' : 'ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activePromos.map((promo) => (
          <Card key={promo.id} className="overflow-hidden">
            {/* Gradient top strip */}
            <div className={`h-2 bg-gradient-to-r ${promo.gradient}`} />

            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <Badge variant="promo">{promo.badge}</Badge>
                {promo.valid_until && (
                  <span className="text-xs text-chocolate/40">
                    до {formatDate(promo.valid_until)}
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl font-bold text-espresso-dark mb-2">
                {promo.title}
              </h3>

              <p className="text-sm text-chocolate/60 mb-4">
                {promo.description}
              </p>

              {promo.promo_code && (
                <button
                  type="button"
                  onClick={() => copyPromoCode(promo.promo_code!)}
                  className="flex items-center gap-2 bg-foam border border-espresso/10 rounded-xl px-4 py-2.5 mb-4 w-full group hover:border-caramel transition-colors"
                >
                  <code className="font-mono font-bold text-espresso tracking-wider flex-1 text-left">
                    {promo.promo_code}
                  </code>
                  <Copy
                    size={16}
                    className="text-espresso/40 group-hover:text-caramel transition-colors shrink-0"
                  />
                </button>
              )}

              {/* Expandable conditions */}
              <button
                type="button"
                onClick={() => toggleExpand(promo.id)}
                className="flex items-center gap-1 text-sm text-espresso/50 hover:text-espresso transition-colors"
              >
                {t('conditions')}
                {expandedId === promo.id ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              {expandedId === promo.id && (
                <ul className="mt-3 space-y-1.5 animate-fadeIn">
                  {promo.conditions.map((cond, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-chocolate/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-caramel shrink-0" />
                      {cond}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* How promo codes work */}
      <Card className="mt-10 p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold text-espresso-dark mb-6 text-center">
          {t('howToUse')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-caramel/10 flex items-center justify-center mb-3">
              <Tag size={24} className="text-caramel" />
            </div>
            <p className="text-sm font-medium text-chocolate">
              {t('steps.copy')}
            </p>
            <p className="text-xs text-chocolate/50 mt-1">
              {t('steps.copyDesc')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-mint/10 flex items-center justify-center mb-3">
              <Zap size={24} className="text-mint" />
            </div>
            <p className="text-sm font-medium text-chocolate">
              {t('steps.enter')}
            </p>
            <p className="text-xs text-chocolate/50 mt-1">
              {t('steps.enterDesc')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
              <Gift size={24} className="text-purple-500" />
            </div>
            <p className="text-sm font-medium text-chocolate">
              {t('steps.discount')}
            </p>
            <p className="text-xs text-chocolate/50 mt-1">
              {t('steps.discountDesc')}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
