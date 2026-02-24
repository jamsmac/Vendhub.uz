'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Modal from '@/components/ui/Modal'

type MachineType = 'coffee' | 'cold'

interface MachineTypeDetailModalProps {
  type: MachineType
  onClose: () => void
}

const HERO_IMAGES: Record<MachineType, { src: string; alt: string }> = {
  cold: {
    src: '/images/machines/js-001-a01-hero.jpg',
    alt: 'JS-001-A01 Slushy Ice Drink Vending Machine',
  },
  coffee: {
    src: '/images/machines/jq-002-a-hero.png',
    alt: 'JQ-002-A Coffee Vending Machine',
  },
}

const SPEC_KEYS: Record<MachineType, string[]> = {
  cold: [
    'Model',
    'Dimensions',
    'Weight',
    'Display',
    'Slots',
    'Temperature',
    'Payment',
    'Connectivity',
    'Lighting',
    'Software',
    'Power',
  ],
  coffee: [
    'Model',
    'Dimensions',
    'Weight',
    'Display',
    'Slots',
    'Payment',
    'Connectivity',
    'Lighting',
    'Software',
    'Power',
  ],
}

const ADV_COUNT = 5

export default function MachineTypeDetailModal({
  type,
  onClose,
}: MachineTypeDetailModalProps) {
  const t = useTranslations('machines.detail')
  const td = useTranslations(`machines.detail.${type}`)
  const hero = HERO_IMAGES[type]
  const specKeys = SPEC_KEYS[type]

  return (
    <Modal isOpen onClose={onClose} className="max-w-2xl max-h-[90vh] overflow-y-auto">
      {/* Hero image */}
      <div className="relative h-56 sm:h-72 bg-foam">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="(max-width: 640px) 100vw, 672px"
          className="object-cover"
          priority
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-espresso/60 hover:text-espresso transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Title + Description */}
      <div className="p-5 sm:p-6">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-espresso-dark">
          {td('title')}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-chocolate/70 leading-relaxed">
          {td('description')}
        </p>
      </div>

      {/* Specs table */}
      <div className="px-5 sm:px-6 pb-5">
        <h3 className="text-base font-bold text-espresso mb-3">
          {t('specs')}
        </h3>
        <div className="rounded-xl border border-espresso/10 overflow-hidden">
          {specKeys.map((key, i) => (
            <div
              key={key}
              className={[
                'flex text-sm',
                i % 2 === 0 ? 'bg-foam/50' : 'bg-white',
                i < specKeys.length - 1 ? 'border-b border-espresso/5' : '',
              ].join(' ')}
            >
              <div className="w-2/5 sm:w-1/3 px-3 sm:px-4 py-2.5 font-medium text-espresso/80 shrink-0">
                {td(`spec${key}`)}
              </div>
              <div className="flex-1 px-3 sm:px-4 py-2.5 text-chocolate/70">
                {td(`spec${key}Value`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages */}
      <div className="px-5 sm:px-6 pb-6">
        <h3 className="text-base font-bold text-espresso mb-3">
          {t('advantages')}
        </h3>
        <div className="space-y-3">
          {Array.from({ length: ADV_COUNT }, (_, i) => i + 1).map((n) => (
            <div key={n} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-caramel to-caramel-dark text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {n}
              </div>
              <div>
                <div className="text-sm font-medium text-espresso">
                  {td(`adv${n}Title`)}
                </div>
                <div className="text-sm text-chocolate/60 mt-0.5">
                  {td(`adv${n}Desc`)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
