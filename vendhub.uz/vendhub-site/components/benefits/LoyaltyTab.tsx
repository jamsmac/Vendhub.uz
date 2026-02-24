import {
  Coffee,
  CalendarCheck,
  MessageSquare,
  UserPlus,
  Cake,
  ShoppingBag,
  Flame,
  Trophy,
  Share2,
  ShoppingCart,
  Gift,
  Star,
  Check,
  X,
  Send,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { loyaltyTiers as fallbackTiers } from '@/lib/data'
import type { LoyaltyTier } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

const PRIVILEGE_KEYS = [
  { key: 'cashback', tKey: 'cashback' as const },
  { key: 'discount', tKey: 'orderDiscount' as const },
  { key: 'priority_promos', tKey: 'priorityPromos' as const },
  { key: 'special_codes', tKey: 'specialCodes' as const },
  { key: 'birthday_bonus', tKey: 'birthdayBonus' as const },
  { key: 'early_access', tKey: 'earlyAccess' as const },
  { key: 'personal_offers', tKey: 'personalOffers' as const },
  { key: 'free_drink_monthly', tKey: 'freeDrink' as const },
]

const EARN_KEYS = [
  { icon: Coffee, labelKey: 'purchases' as const, descKey: 'purchasesDesc' as const },
  { icon: CalendarCheck, labelKey: 'dailyLogin' as const, descKey: 'dailyLoginDesc' as const },
  { icon: MessageSquare, labelKey: 'reviews' as const, descKey: 'reviewsDesc' as const },
  { icon: UserPlus, labelKey: 'referral' as const, descKey: 'referralDesc' as const },
  { icon: Cake, labelKey: 'birthday' as const, descKey: 'birthdayDesc' as const },
  { icon: ShoppingBag, labelKey: 'firstOrder' as const, descKey: 'firstOrderDesc' as const },
  { icon: Flame, labelKey: 'streak' as const, descKey: 'streakDesc' as const },
  { icon: Trophy, labelKey: 'achievements' as const, descKey: 'achievementsDesc' as const },
  { icon: Share2, labelKey: 'social' as const, descKey: 'socialDesc' as const },
]

const SPEND_KEYS = [
  { icon: ShoppingCart, labelKey: 'payments' as const, descKey: 'paymentsDesc' as const },
  { icon: Gift, labelKey: 'gifts' as const, descKey: 'giftsDesc' as const },
  { icon: Star, labelKey: 'merch' as const, descKey: 'merchDesc' as const },
]

export default async function LoyaltyTab() {
  const t = await getTranslations('loyalty')

  const { data } = await supabase
    .from('loyalty_tiers')
    .select('*')
    .order('sort_order')

  const sortedTiers = (data?.length ? data as LoyaltyTier[] : fallbackTiers)
    .sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div>
      {/* Overview line */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10">
        <span className="text-sm sm:text-base text-chocolate/70 bg-foam rounded-full px-4 py-2">
          {t('overview.pointValue')}
        </span>
        <span className="text-sm sm:text-base text-chocolate/70 bg-foam rounded-full px-4 py-2">
          {t('overview.cashback')}
        </span>
        <span className="text-sm sm:text-base text-chocolate/70 bg-foam rounded-full px-4 py-2">
          {t('overview.levels')}
        </span>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {sortedTiers.map((tier, idx) => (
          <Card
            key={tier.id}
            hover
            className={[
              'p-5 text-center relative',
              idx === 0 ? 'ring-2 ring-caramel' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {idx === 0 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-caramel text-white text-xs font-medium px-3 py-1 rounded-full">
                {t('tier.current')}
              </span>
            )}
            <div className="text-4xl mb-2">{tier.emoji}</div>
            <h4 className="font-display font-bold text-espresso-dark">
              {tier.level}
            </h4>
            <p className="text-xs text-chocolate/50 mt-1">
              {t('tier.from', { threshold: formatPrice(tier.threshold) })}
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium text-espresso">
                {t('tier.discount', { percent: tier.discount_percent })}
              </p>
              <p className="text-sm text-chocolate/60">
                {t('tier.cashback', { percent: tier.cashback_percent })}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Privileges — mobile cards */}
      <div className="sm:hidden mb-12 space-y-4">
        <h3 className="font-display text-lg font-bold text-espresso-dark mb-4 text-center">
          {t('privileges.title')}
        </h3>
        {sortedTiers.map((tier) => (
          <Card key={tier.id} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{tier.emoji}</span>
              <h4 className="font-medium text-espresso-dark">{tier.level}</h4>
            </div>
            <div className="space-y-2">
              {PRIVILEGE_KEYS.map((row) => {
                const val = tier.privileges[row.key]
                return (
                  <div
                    key={row.key}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-chocolate/70">{t(`privileges.${row.tKey}`)}</span>
                    {typeof val === 'number' ? (
                      val > 0 ? (
                        <span className="text-espresso font-medium">
                          {formatPrice(val)}
                        </span>
                      ) : (
                        <X size={14} className="text-gray-300" />
                      )
                    ) : val ? (
                      <Check size={14} className="text-mint" />
                    ) : (
                      <X size={14} className="text-gray-300" />
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Privileges — desktop table */}
      <Card className="mb-12 hidden sm:block">
        <div className="p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold text-espresso-dark mb-4">
            {t('privileges.title')}
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-espresso/5">
              <th className="text-left px-5 py-3 text-chocolate/50 font-medium">
                {t('privileges.header')}
              </th>
              {sortedTiers.map((tier) => (
                <th
                  key={tier.id}
                  className="text-center px-3 py-3 text-chocolate/70 font-medium"
                >
                  {tier.emoji} {tier.level}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRIVILEGE_KEYS.map((row) => (
              <tr
                key={row.key}
                className="border-t border-espresso/5 hover:bg-foam/50 transition-colors"
              >
                <td className="px-5 py-3 text-chocolate/70">{t(`privileges.${row.tKey}`)}</td>
                {sortedTiers.map((tier) => {
                  const val = tier.privileges[row.key]
                  return (
                    <td key={tier.id} className="text-center px-3 py-3">
                      {typeof val === 'number' ? (
                        val > 0 ? (
                          <span className="text-espresso font-medium">
                            {formatPrice(val)}
                          </span>
                        ) : (
                          <X size={16} className="text-gray-300 mx-auto" />
                        )
                      ) : val ? (
                        <Check size={16} className="text-mint mx-auto" />
                      ) : (
                        <X size={16} className="text-gray-300 mx-auto" />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* How to earn points */}
      <div className="mb-12">
        <h3 className="font-display text-lg font-bold text-espresso-dark mb-6 text-center">
          {t('earn.title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EARN_KEYS.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.labelKey} hover className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-mint/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-mint" />
                </div>
                <div>
                  <p className="text-sm font-medium text-chocolate">
                    {t(`earn.${item.labelKey}`)}
                  </p>
                  <p className="text-xs text-chocolate/50">{t(`earn.${item.descKey}`)}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* How to spend points */}
      <div className="mb-12">
        <h3 className="font-display text-lg font-bold text-espresso-dark mb-6 text-center">
          {t('spend.title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SPEND_KEYS.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.labelKey} hover className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-caramel/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-caramel" />
                </div>
                <p className="font-medium text-chocolate">{t(`spend.${item.labelKey}`)}</p>
                <p className="text-xs text-chocolate/50 mt-1">{t(`spend.${item.descKey}`)}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-espresso to-espresso-light text-white border-none">
        <Send size={32} className="mx-auto mb-3 opacity-80" />
        <h3 className="font-display text-xl font-bold mb-2">
          {t('cta.title')}
        </h3>
        <p className="text-white/70 mb-5 text-sm">
          {t('cta.subtitle')}
        </p>
        <Button
          variant="caramel"
          href="https://t.me/vendhub_bot"
        >
          {t('cta.button')}
        </Button>
      </Card>
    </div>
  )
}
