'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import SectionHeader from '@/components/ui/SectionHeader'
import Pill from '@/components/ui/Pill'
import PromotionsTab from '@/components/benefits/PromotionsTab'
import LoyaltyTab from '@/components/benefits/LoyaltyTab'

type Tab = 'promos' | 'loyalty'

export default function BenefitsSection() {
  const t = useTranslations('benefits')
  const [activeTab, setActiveTab] = useState<Tab>('promos')

  return (
    <section id="benefits" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* Tab switcher */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Pill
            label={t('tabs.promotions')}
            active={activeTab === 'promos'}
            onClick={() => setActiveTab('promos')}
          />
          <Pill
            label={t('tabs.bonuses')}
            active={activeTab === 'loyalty'}
            onClick={() => setActiveTab('loyalty')}
          />
        </div>

        {activeTab === 'promos' ? <PromotionsTab /> : <LoyaltyTab />}
      </div>
    </section>
  )
}
