'use client'

import { useTranslations } from 'next-intl'

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('common')

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-6">{'\u2615'}</div>
        <h1 className="text-2xl font-display font-bold text-espresso-dark mb-2">
          {t('errorOccurred')}
        </h1>
        <button
          onClick={reset}
          className="btn-caramel mt-4 px-6 py-3"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  )
}
