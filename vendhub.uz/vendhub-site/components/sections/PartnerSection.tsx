'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  MapPin,
  Package,
  TrendingUp,
  Building2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import PartnerForm from '@/components/partner/PartnerForm'
import { partners as fallbackPartners } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import type { Partner } from '@/lib/types'

const MODEL_KEYS = ['locations', 'suppliers', 'investors', 'franchise'] as const
type ModelKey = (typeof MODEL_KEYS)[number]

const MODEL_ICONS: Record<ModelKey, typeof MapPin> = {
  locations: MapPin,
  suppliers: Package,
  investors: TrendingUp,
  franchise: Building2,
}

const MODEL_ACCENTS: Record<ModelKey, { bg: string; text: string }> = {
  locations: { bg: 'bg-mint/10', text: 'text-mint' },
  suppliers: { bg: 'bg-caramel/10', text: 'text-caramel' },
  investors: { bg: 'bg-espresso-50', text: 'text-espresso' },
  franchise: { bg: 'bg-purple-100', text: 'text-purple-500' },
}

export default function PartnerSection() {
  const t = useTranslations('partner')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [cmsData, setCmsData] = useState<Record<string, string>>({})
  const [partnerList, setPartnerList] = useState<Partner[]>(fallbackPartners)

  useEffect(() => {
    supabase
      .from('site_content')
      .select('key, value')
      .eq('section', 'partnership')
      .then(({ data, error }) => {
        if (!error && data) {
          const map: Record<string, string> = {}
          for (const item of data) {
            map[item.key] = item.value
          }
          setCmsData(map)
        }
      })

    supabase
      .from('partners')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setPartnerList(data as Partner[])
        }
      })
  }, [])

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function getModelTitle(key: ModelKey): string {
    return cmsData[`${key}_title`] || t(`models.${key}.title`)
  }

  function getModelDescription(key: ModelKey): string {
    return cmsData[`${key}_description`] || t(`models.${key}.description`)
  }

  function getModelBenefits(key: ModelKey): string[] {
    const raw = cmsData[`${key}_benefits`]
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) return parsed
      } catch {
        // fall through to i18n
      }
    }
    return t.raw(`models.${key}.benefits`) as string[]
  }

  return (
    <section id="partner" className="section-padding bg-foam">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Model cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {MODEL_KEYS.map((key) => {
            const Icon = MODEL_ICONS[key]
            const accent = MODEL_ACCENTS[key]
            const isExpanded = expandedId === key
            const benefits = getModelBenefits(key)
            return (
              <Card key={key} hover className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={24} className={accent.text} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-espresso-dark">
                      {getModelTitle(key)}
                    </h3>
                    <p className="text-sm text-chocolate/60 mt-1">
                      {getModelDescription(key)}
                    </p>

                    <button
                      type="button"
                      onClick={() => toggleExpand(key)}
                      className="flex items-center gap-1 text-sm text-caramel hover:text-caramel-dark transition-colors mt-3"
                    >
                      {t('moreInfo')}
                      {isExpanded ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </button>

                    {isExpanded && (
                      <ul className="mt-3 space-y-2 animate-fadeIn">
                        {benefits.map((detail: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-chocolate/60"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-mint shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Partner Form */}
        <div className="max-w-lg mx-auto mb-14">
          <Card className="p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-espresso-dark mb-6 text-center">
              {t('leaveRequest')}
            </h3>
            <PartnerForm />
          </Card>
        </div>

        {/* Partners — trust */}
        <div>
          <h3 className="font-display text-lg font-bold text-espresso-dark mb-6 text-center">
            {t('trustedBy')}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {partnerList.map((partner) => {
                const content = (
                  <Card className="px-6 py-4" hover={!!partner.website_url}>
                    {partner.logo_url ? (
                      <div className="relative h-8 w-24">
                        <Image
                          src={partner.logo_url}
                          alt={partner.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-espresso">
                        {partner.name}
                      </span>
                    )}
                  </Card>
                )

                if (partner.website_url) {
                  return (
                    <a
                      key={partner.id}
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={partner.description ?? partner.name}
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <div key={partner.id} title={partner.description ?? undefined}>
                    {content}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
