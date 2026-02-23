'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center">
          <AlertTriangle size={28} className="text-espresso/40" />
        </div>
        <h2 className="text-lg font-medium text-chocolate mb-2">
          Ошибка загрузки
        </h2>
        <p className="text-chocolate/50 text-sm mb-4">
          Не удалось загрузить эту страницу. Попробуйте обновить.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-espresso text-cream text-sm rounded-xl hover:bg-espresso-light transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Повторить
        </button>
      </div>
    </div>
  )
}
