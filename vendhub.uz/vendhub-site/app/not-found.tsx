import { Coffee, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-foam flex items-center justify-center">
          <Coffee size={32} className="text-espresso/40" />
        </div>
        <h1 className="font-display text-5xl text-espresso font-bold mb-2">404</h1>
        <h2 className="font-display text-xl text-chocolate font-bold mb-2">
          Sahifa topilmadi / Страница не найдена
        </h2>
        <p className="text-chocolate/50 text-sm mb-6">
          Bu ichimlik tugagan ko&apos;rinadi / Кажется, этот напиток закончился
        </p>
        <Link
          href="/"
          className="btn-espresso inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Bosh sahifa / На главную
        </Link>
      </div>
    </div>
  )
}
