'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/components/ui/Toast'
import TableSkeleton from '@/components/admin/TableSkeleton'
import Pagination from '@/components/admin/Pagination'
import type { CooperationRequest } from '@/lib/types'

const statusColors: Record<string, string> = {
  new: 'bg-caramel/10 text-caramel-dark',
  read: 'bg-blue-50 text-blue-600',
  processed: 'bg-mint/10 text-mint',
}

export default function AdminCooperationPage() {
  const { showToast } = useToast()
  const t = useTranslations('admin.cooperation')
  const tc = useTranslations('common')
  const [requests, setRequests] = useState<CooperationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [modelFilter, setModelFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Detail modal state
  const [selectedRequest, setSelectedRequest] = useState<CooperationRequest | null>(null)
  const [notesValue, setNotesValue] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  const modelFilters = [
    { value: '', label: t('modelFilters.all') },
    { value: 'locations', label: t('modelFilters.locations') },
    { value: 'suppliers', label: t('modelFilters.suppliers') },
    { value: 'investors', label: t('modelFilters.investors') },
    { value: 'franchise', label: t('modelFilters.franchise') },
  ]

  const statusFilters = [
    { value: '', label: t('statusFilters.all') },
    { value: 'new', label: t('statusFilters.new') },
    { value: 'read', label: t('statusFilters.read') },
    { value: 'processed', label: t('statusFilters.processed') },
  ]

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('cooperation_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      showToast(t('loadError'), 'error')
    } else {
      setRequests(data as CooperationRequest[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStatusChange = async (
    id: string,
    newStatus: CooperationRequest['status']
  ) => {
    const { error } = await supabase
      .from('cooperation_requests')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      showToast(t('statusError'), 'error')
    } else {
      showToast(t('statusUpdated'), 'success')
      fetchRequests()
      window.dispatchEvent(new Event('cooperation-updated'))
    }
  }

  const openDetail = (req: CooperationRequest) => {
    setSelectedRequest(req)
    setNotesValue(req.admin_notes ?? '')
  }

  const handleSaveNotes = async () => {
    if (!selectedRequest) return
    setSavingNotes(true)
    const { error } = await supabase
      .from('cooperation_requests')
      .update({ admin_notes: notesValue || null })
      .eq('id', selectedRequest.id)

    if (error) {
      showToast(t('saveError'), 'error')
    } else {
      showToast(t('notesSaved'), 'success')
      setSelectedRequest({ ...selectedRequest, admin_notes: notesValue || null })
      fetchRequests()
    }
    setSavingNotes(false)
  }

  const handleDetailStatusChange = async (newStatus: CooperationRequest['status']) => {
    if (!selectedRequest) return
    await handleStatusChange(selectedRequest.id, newStatus)
    setSelectedRequest({ ...selectedRequest, status: newStatus })
  }

  const filtered = requests.filter((r) => {
    const matchesModel = !modelFilter || r.model === modelFilter
    const matchesStatus = !statusFilter || r.status === statusFilter
    return matchesModel && matchesStatus
  })

  const totalPages = Math.ceil(filtered.length / pageSize)
  const safePage = Math.min(currentPage, Math.max(totalPages, 1))
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={modelFilter}
          onChange={(e) => { setModelFilter(e.target.value); setCurrentPage(1) }}
          className="admin-input !py-2 text-sm"
        >
          {modelFilters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
          className="admin-input !py-2 text-sm"
        >
          {statusFilters.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <span className="text-sm text-espresso/40 self-center">
          {t('count', { count: filtered.length })}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-espresso/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-espresso/10 bg-foam/50">
                <th className="text-left px-4 py-3 font-medium text-espresso/50">
                  {t('table.model')}
                </th>
                <th className="text-left px-4 py-3 font-medium text-espresso/50">
                  {t('table.name')}
                </th>
                <th className="text-left px-4 py-3 font-medium text-espresso/50">
                  {t('table.phone')}
                </th>
                <th className="text-left px-4 py-3 font-medium text-espresso/50">
                  {t('table.comment')}
                </th>
                <th className="text-center px-4 py-3 font-medium text-espresso/50">
                  {t('table.status')}
                </th>
                <th className="text-left px-4 py-3 font-medium text-espresso/50">
                  {t('table.date')}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={4} columns={6} />
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-espresso/40"
                  >
                    {t('empty')}
                  </td>
                </tr>
              ) : (
                paginated.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => openDetail(req)}
                    className="border-b border-espresso/5 hover:bg-foam/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-espresso/5 text-espresso/60">
                        {t(`modelFilters.${req.model}`)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-espresso">
                      {req.name}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`tel:${req.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-espresso/60 hover:text-espresso underline decoration-dotted transition-colors"
                      >
                        {req.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-espresso/50 max-w-xs truncate">
                      {req.comment ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <select
                        value={req.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          handleStatusChange(
                            req.id,
                            e.target.value as CooperationRequest['status']
                          )
                        }
                        className={[
                          'text-xs font-medium rounded-full px-3 py-1 border-none outline-none cursor-pointer',
                          statusColors[req.status] ?? '',
                        ].join(' ')}
                      >
                        {(['new', 'read', 'processed'] as const).map((val) => (
                          <option key={val} value={val}>
                            {t(`statusLabels.${val}`)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-espresso/40 text-xs whitespace-nowrap">
                      {formatDate(req.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={safePage}
        totalItems={filtered.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />

      {/* Detail Modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-espresso/10">
              <h2 className="text-lg font-bold text-espresso">
                {t('details')}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-espresso/40 hover:text-espresso transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Model */}
              <div>
                <span className="text-xs font-medium text-espresso/40 uppercase tracking-wider">
                  {t('table.model')}
                </span>
                <p className="mt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-espresso/5 text-espresso/60">
                    {t(`modelFilters.${selectedRequest.model}`)}
                  </span>
                </p>
              </div>

              {/* Name */}
              <div>
                <span className="text-xs font-medium text-espresso/40 uppercase tracking-wider">
                  {t('table.name')}
                </span>
                <p className="mt-1 font-medium text-espresso">{selectedRequest.name}</p>
              </div>

              {/* Phone */}
              <div>
                <span className="text-xs font-medium text-espresso/40 uppercase tracking-wider">
                  {t('table.phone')}
                </span>
                <p className="mt-1">
                  <a
                    href={`tel:${selectedRequest.phone}`}
                    className="text-espresso/70 hover:text-espresso underline decoration-dotted transition-colors"
                  >
                    {selectedRequest.phone}
                  </a>
                </p>
              </div>

              {/* Comment */}
              <div>
                <span className="text-xs font-medium text-espresso/40 uppercase tracking-wider">
                  {t('table.comment')}
                </span>
                <p className="mt-1 text-espresso/60">
                  {selectedRequest.comment || '—'}
                </p>
              </div>

              {/* Date */}
              <div>
                <span className="text-xs font-medium text-espresso/40 uppercase tracking-wider">
                  {t('table.date')}
                </span>
                <p className="mt-1 text-sm text-espresso/60">
                  {formatDate(selectedRequest.created_at)}
                </p>
              </div>

              {/* Status dropdown */}
              <div>
                <span className="text-xs font-medium text-espresso/40 uppercase tracking-wider">
                  {t('table.status')}
                </span>
                <div className="mt-1">
                  <select
                    value={selectedRequest.status}
                    onChange={(e) =>
                      handleDetailStatusChange(
                        e.target.value as CooperationRequest['status']
                      )
                    }
                    className={[
                      'text-sm font-medium rounded-full px-4 py-1.5 border-none outline-none cursor-pointer',
                      statusColors[selectedRequest.status] ?? '',
                    ].join(' ')}
                  >
                    {(['new', 'read', 'processed'] as const).map((val) => (
                      <option key={val} value={val}>
                        {t(`statusLabels.${val}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Admin notes */}
              <div className="pt-2 border-t border-espresso/10">
                <label className="block text-xs font-medium text-espresso/40 uppercase tracking-wider mb-1.5">
                  {t('adminNotes')}
                </label>
                <textarea
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                  placeholder={t('notesPlaceholder')}
                  rows={3}
                  className="admin-input w-full text-sm resize-y"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={savingNotes || notesValue === (selectedRequest.admin_notes ?? '')}
                    className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-espresso to-espresso-light rounded-xl hover:shadow-md transition-all disabled:opacity-30"
                  >
                    {savingNotes ? tc('saving') : tc('save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
