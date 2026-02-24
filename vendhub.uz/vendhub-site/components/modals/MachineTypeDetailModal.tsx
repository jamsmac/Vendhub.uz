'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  X,
  FileText,
  Ruler,
  Scale,
  Monitor,
  LayoutGrid,
  Thermometer,
  CreditCard,
  Wifi,
  Lightbulb,
  Cpu,
  Zap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

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

const GALLERY_IMAGES: Record<MachineType, { src: string; alt: string }[]> = {
  cold: [
    { src: '/images/machines/js-001-a01-features.jpg', alt: 'Features' },
    { src: '/images/machines/js-001-a01-size.jpg', alt: 'Dimensions' },
  ],
  coffee: [],
}

interface SpecConfig {
  key: string
  icon: ReactNode
}

const SPEC_CONFIGS: Record<MachineType, SpecConfig[]> = {
  cold: [
    { key: 'Model', icon: <FileText size={18} /> },
    { key: 'Dimensions', icon: <Ruler size={18} /> },
    { key: 'Weight', icon: <Scale size={18} /> },
    { key: 'Display', icon: <Monitor size={18} /> },
    { key: 'Slots', icon: <LayoutGrid size={18} /> },
    { key: 'Temperature', icon: <Thermometer size={18} /> },
    { key: 'Payment', icon: <CreditCard size={18} /> },
    { key: 'Connectivity', icon: <Wifi size={18} /> },
    { key: 'Lighting', icon: <Lightbulb size={18} /> },
    { key: 'Software', icon: <Cpu size={18} /> },
    { key: 'Power', icon: <Zap size={18} /> },
  ],
  coffee: [
    { key: 'Model', icon: <FileText size={18} /> },
    { key: 'Dimensions', icon: <Ruler size={18} /> },
    { key: 'Weight', icon: <Scale size={18} /> },
    { key: 'Display', icon: <Monitor size={18} /> },
    { key: 'Slots', icon: <LayoutGrid size={18} /> },
    { key: 'Payment', icon: <CreditCard size={18} /> },
    { key: 'Connectivity', icon: <Wifi size={18} /> },
    { key: 'Lighting', icon: <Lightbulb size={18} /> },
    { key: 'Software', icon: <Cpu size={18} /> },
    { key: 'Power', icon: <Zap size={18} /> },
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
  const specs = SPEC_CONFIGS[type]
  const gallery = GALLERY_IMAGES[type]

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [handleEscape])

  return (
    <div className="fixed inset-0 z-50 flex flex-col" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-espresso-dark/60 backdrop-blur-md" />

      {/* Scrollable content */}
      <div
        className="relative flex-1 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="fixed top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-espresso/60 hover:text-espresso hover:bg-white transition-all"
        >
          <X size={20} />
        </button>

        {/* Hero section */}
        <div className="relative w-full max-w-4xl mx-auto mt-6 sm:mt-10 px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-foam">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/3] max-h-[70vh]">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                className="object-contain bg-white"
                priority
              />
            </div>
            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso-dark/90 via-espresso-dark/60 to-transparent px-5 sm:px-8 pt-16 pb-5 sm:pb-6">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {td('title')}
              </h2>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full max-w-4xl mx-auto px-4 pb-10">
          {/* Description card */}
          <div className="mt-5 bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg border border-white/20">
            <p className="text-sm sm:text-base text-chocolate/80 leading-relaxed">
              {td('description')}
            </p>
          </div>

          {/* Specs grid */}
          <div className="mt-5">
            <h3 className="text-lg font-bold text-white mb-3 px-1 drop-shadow">
              {t('specs')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {specs.map(({ key, icon }) => (
                <div
                  key={key}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-3.5 shadow-md border border-white/20 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-caramel-dark">{icon}</span>
                    <span className="text-xs font-medium text-espresso/60 uppercase tracking-wide">
                      {td(`spec${key}`)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-espresso leading-snug">
                    {td(`spec${key}Value`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advantages */}
          <div className="mt-5">
            <h3 className="text-lg font-bold text-white mb-3 px-1 drop-shadow">
              {t('advantages')}
            </h3>
            <div className="space-y-3">
              {Array.from({ length: ADV_COUNT }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20 flex gap-4 items-start"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-caramel to-caramel-dark text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {n}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-espresso">
                      {td(`adv${n}Title`)}
                    </div>
                    <div className="text-sm text-chocolate/60 mt-0.5 leading-relaxed">
                      {td(`adv${n}Desc`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold text-white mb-3 px-1 drop-shadow">
                {t('gallery')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gallery.map((img) => (
                  <div
                    key={img.src}
                    className="relative rounded-2xl overflow-hidden shadow-lg bg-white"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 448px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Close button at bottom */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 text-sm font-medium text-white bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/25 transition-all"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
