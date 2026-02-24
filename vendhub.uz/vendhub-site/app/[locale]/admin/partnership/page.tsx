'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { supabase } from '@/lib/supabase'
import PartnershipModelsTab from '@/components/admin/PartnershipModelsTab'
import RequestsTab from '@/components/admin/RequestsTab'
import PartnersTab from '@/components/admin/PartnersTab'
import type { PartnershipModel } from '@/lib/types'

type Tab = 'models' | 'requests' | 'partners'

export default function AdminPartnershipPage() {
  const t = useTranslations('admin.partnership.tabs')
  const [activeTab, setActiveTab] = useState<Tab>('models')
  const [partnershipModels, setPartnershipModels] = useState<PartnershipModel[]>([])

  const fetchModels = useCallback(async () => {
    const { data } = await supabase
      .from('partnership_models')
      .select('*')
      .order('sort_order', { ascending: true })
    if (data) setPartnershipModels(data as PartnershipModel[])
  }, [])

  useEffect(() => { fetchModels() }, [fetchModels])

  // Re-fetch models when switching to requests tab (for dynamic filters)
  useEffect(() => {
    if (activeTab === 'requests') fetchModels()
  }, [activeTab, fetchModels])

  const tabs: { key: Tab; label: string }[] = [
    { key: 'models', label: t('models') },
    { key: 'requests', label: t('requests') },
    { key: 'partners', label: t('partners') },
  ]

  return (
    <div className="space-y-4">
      {/* Tab navigation */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={[
              'px-4 py-2 text-sm font-medium rounded-xl transition-all',
              activeTab === tab.key
                ? 'bg-espresso text-white shadow-md'
                : 'bg-foam text-espresso/60 hover:text-espresso hover:bg-espresso/10',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'models' && <PartnershipModelsTab />}
      {activeTab === 'requests' && <RequestsTab partnershipModels={partnershipModels} />}
      {activeTab === 'partners' && <PartnersTab />}
    </div>
  )
}
