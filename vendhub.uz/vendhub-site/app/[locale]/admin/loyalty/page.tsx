'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/ui/Toast'
import type { LoyaltyTier } from '@/lib/types'

export default function AdminLoyaltyPage() {
  const { showToast } = useToast()
  const t = useTranslations('admin.loyalty')
  const tc = useTranslations('common')
  const [tiers, setTiers] = useState<LoyaltyTier[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)

  // Editable state keyed by tier id
  const [edits, setEdits] = useState<Record<string, Partial<LoyaltyTier>>>({})
  const [privilegeEdits, setPrivilegeEdits] = useState<
    Record<string, string>
  >({})

  const fetchTiers = async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_tiers')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) {
        showToast(t('loadError'), 'error')
      } else {
        const tierData = data as LoyaltyTier[]
        setTiers(tierData)
        const privEdits: Record<string, string> = {}
        for (const tier of tierData) {
          privEdits[tier.id] = JSON.stringify(tier.privileges, null, 2)
        }
        setPrivilegeEdits(privEdits)
      }
    } catch (err) {
      console.error('Loyalty tiers fetch failed:', err)
      showToast(t('loadError'), 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTiers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getEdit = (tier: LoyaltyTier, field: keyof LoyaltyTier) => {
    return edits[tier.id]?.[field] ?? tier[field]
  }

  const setEdit = (
    tierId: string,
    field: keyof LoyaltyTier,
    value: string | number | boolean
  ) => {
    setEdits((prev) => ({
      ...prev,
      [tierId]: { ...prev[tierId], [field]: value },
    }))
  }

  const handleSave = async (tier: LoyaltyTier) => {
    setSavingId(tier.id)

    // Parse privileges JSON
    let privileges = tier.privileges
    try {
      if (privilegeEdits[tier.id]) {
        privileges = JSON.parse(privilegeEdits[tier.id])
      }
    } catch {
      showToast(tc('errorOccurred'), 'error')
      setSavingId(null)
      return
    }

    const payload = {
      level: (getEdit(tier, 'level') as string) || tier.level,
      emoji: (getEdit(tier, 'emoji') as string) || tier.emoji,
      discount_percent: Number(getEdit(tier, 'discount_percent')),
      threshold: Number(getEdit(tier, 'threshold')),
      cashback_percent: Number(getEdit(tier, 'cashback_percent')),
      privileges,
      sort_order: Number(getEdit(tier, 'sort_order')),
    }

    const { error } = await supabase
      .from('loyalty_tiers')
      .update(payload)
      .eq('id', tier.id)

    if (error) {
      showToast(t('saveError'), 'error')
    } else {
      showToast(t('updated'), 'success')
      fetchTiers()
    }
    setSavingId(null)
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-espresso/40">{tc('loading')}</div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-espresso/50">
        Редактируйте уровни лояльности. Изменения сохраняются по отдельности.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="bg-white rounded-2xl border border-espresso/5 p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={getEdit(tier, 'emoji') as string}
                  onChange={(e) => setEdit(tier.id, 'emoji', e.target.value)}
                  className="w-12 text-center text-2xl bg-transparent border-none outline-none"
                />
                <input
                  type="text"
                  value={getEdit(tier, 'level') as string}
                  onChange={(e) => setEdit(tier.id, 'level', e.target.value)}
                  className="admin-input !py-1.5 font-bold text-espresso"
                />
              </div>
              <button
                type="button"
                onClick={() => handleSave(tier)}
                disabled={savingId === tier.id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-espresso to-espresso-light rounded-lg hover:shadow-md transition-all disabled:opacity-50"
              >
                <Save size={12} />
                {savingId === tier.id ? '...' : tc('save')}
              </button>
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-espresso/40 mb-1">
                  {t('table.discount')}
                </label>
                <input
                  type="number"
                  value={getEdit(tier, 'discount_percent') as number}
                  onChange={(e) =>
                    setEdit(tier.id, 'discount_percent', Number(e.target.value))
                  }
                  className="admin-input !py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-espresso/40 mb-1">
                  {t('table.threshold')}
                </label>
                <input
                  type="number"
                  value={getEdit(tier, 'threshold') as number}
                  onChange={(e) =>
                    setEdit(tier.id, 'threshold', Number(e.target.value))
                  }
                  className="admin-input !py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-espresso/40 mb-1">
                  {t('table.cashback')}
                </label>
                <input
                  type="number"
                  value={getEdit(tier, 'cashback_percent') as number}
                  onChange={(e) =>
                    setEdit(
                      tier.id,
                      'cashback_percent',
                      Number(e.target.value)
                    )
                  }
                  className="admin-input !py-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-espresso/40 mb-1">
                  Сортировка
                </label>
                <input
                  type="number"
                  value={getEdit(tier, 'sort_order') as number}
                  onChange={(e) =>
                    setEdit(tier.id, 'sort_order', Number(e.target.value))
                  }
                  className="admin-input !py-1.5 text-sm"
                />
              </div>
            </div>

            {/* Privileges JSON */}
            <div>
              <label className="block text-xs text-espresso/40 mb-1">
                Привилегии (JSON)
              </label>
              <textarea
                value={privilegeEdits[tier.id] ?? '{}'}
                onChange={(e) =>
                  setPrivilegeEdits((prev) => ({
                    ...prev,
                    [tier.id]: e.target.value,
                  }))
                }
                rows={4}
                className="admin-input resize-y font-mono text-xs"
              />
            </div>
          </div>
        ))}
      </div>

      {tiers.length === 0 && (
        <div className="text-center py-12 text-espresso/40">
          {t('empty')}
        </div>
      )}
    </div>
  )
}
