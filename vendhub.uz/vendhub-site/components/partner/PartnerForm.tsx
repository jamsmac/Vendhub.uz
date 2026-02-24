'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { supabase } from '@/lib/supabase'

type Model = 'locations' | 'suppliers' | 'investors' | 'franchise'

const MODEL_KEYS: Model[] = ['locations', 'suppliers', 'investors', 'franchise']

export default function PartnerForm() {
  const { showToast } = useToast()
  const t = useTranslations('partner.form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    model: 'locations' as Model,
    name: '',
    phone: '',
    comment: '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.name.trim()) {
      showToast(t('nameRequired'), 'error')
      return
    }

    const cleanPhone = form.phone.trim().replace(/[\s\-()]/g, '')
    if (!cleanPhone.match(/^\+998\d{9}$/)) {
      showToast(t('phoneInvalid'), 'error')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('cooperation_requests')
        .insert({
          model: form.model,
          name: form.name.trim(),
          phone: cleanPhone,
          comment: form.comment.trim() || null,
          status: 'new',
        })

      if (error) throw error

      showToast(t('success'), 'success')
      setForm({ model: 'locations', name: '', phone: '', comment: '' })
    } catch {
      showToast(t('error'), 'error')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-espresso/10 bg-white px-4 py-3 text-sm text-chocolate placeholder:text-chocolate/30 focus:border-caramel focus:ring-2 focus:ring-caramel/20 outline-none transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="pf-model" className="block text-sm font-medium text-chocolate/70 mb-1.5">
          {t('model')}
        </label>
        <select
          id="pf-model"
          name="model"
          value={form.model}
          onChange={handleChange}
          className={inputClass}
        >
          {MODEL_KEYS.map((key) => (
            <option key={key} value={key}>
              {t(`modelOptions.${key}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="pf-name" className="block text-sm font-medium text-chocolate/70 mb-1.5">
          {t('name')}
        </label>
        <input
          id="pf-name"
          name="name"
          type="text"
          required
          placeholder={t('namePlaceholder')}
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="pf-phone" className="block text-sm font-medium text-chocolate/70 mb-1.5">
          {t('phone')}
        </label>
        <input
          id="pf-phone"
          name="phone"
          type="tel"
          required
          placeholder={t('phonePlaceholder')}
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="pf-comment" className="block text-sm font-medium text-chocolate/70 mb-1.5">
          {t('comment')}
        </label>
        <textarea
          id="pf-comment"
          name="comment"
          rows={3}
          placeholder={t('commentPlaceholder')}
          value={form.comment}
          onChange={handleChange}
          className={inputClass + ' resize-none'}
        />
      </div>

      <Button
        type="submit"
        variant="caramel"
        disabled={loading}
        className="w-full"
      >
        {loading ? t('sending') : t('submit')}
      </Button>
    </form>
  )
}
