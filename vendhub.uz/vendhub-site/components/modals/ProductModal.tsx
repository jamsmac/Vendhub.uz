'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import PriceTag from '@/components/ui/PriceTag'
import Button from '@/components/ui/Button'
import { getProductPresentation } from '@/lib/productPresentation'
import { formatPrice } from '@/lib/utils'
import { CATEGORY_EMOJI, CATEGORY_GRADIENT } from '@/lib/categoryStyles'
import type { Product, ProductOption } from '@/lib/types'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const t = useTranslations('productModal')
  const tc = useTranslations('common')

  const hotOptions = useMemo(
    () => product.options.filter((o) => o.temperature === 'hot'),
    [product.options]
  )
  const coldOptions = useMemo(
    () => product.options.filter((o) => o.temperature === 'cold'),
    [product.options]
  )

  const fallbackOption: ProductOption = {
    name: product.name,
    price: product.price,
    temperature: product.temperature === 'cold' ? 'cold' : 'hot',
  }

  const [selectedOption, setSelectedOption] = useState<ProductOption>(
    product.options[0] ?? fallbackOption
  )

  const gradient =
    CATEGORY_GRADIENT[product.category] ?? 'from-gray-100 to-gray-50'
  const presentation = getProductPresentation(product)
  const emoji =
    presentation.fallbackEmoji ??
    CATEGORY_EMOJI[product.category] ??
    '\u2615'
  const caloriesText =
    presentation.caloriesKcal !== null
      ? `${presentation.caloriesKcal} ${tc('kcal')}`
      : null
  const descriptionText =
    product.description && caloriesText
      ? `${product.description} · ${caloriesText}`
      : product.description ?? caloriesText

  return (
    <Modal isOpen onClose={onClose} className="max-w-md overflow-hidden" ariaLabel={product.name}>
      {/* Image area */}
      <div
        className={`relative aspect-[4/3] bg-gradient-to-b ${gradient} flex items-center justify-center rounded-t-2xl`}
      >
        {presentation.imageSrc ? (
          <Image
            src={presentation.imageSrc}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 448px, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="text-6xl">{emoji}</span>
        )}

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-chocolate/60 hover:text-chocolate transition-colors"
        >
          <X size={20} />
        </button>

        {/* Temperature badge */}
        {(product.temperature === 'hot' || product.temperature === 'cold') && (
          <div className="absolute bottom-3 left-3">
            <Badge variant={product.temperature}>
              {product.temperature === 'hot' ? t('tempHot') : t('tempCold')}
            </Badge>
          </div>
        )}

        {/* Rating badge */}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium text-chocolate">
          {'\u2B50'} {product.rating}
        </span>
      </div>

      {/* Info section */}
      <div className="p-5">
        <h3 className="font-display text-xl uppercase font-bold text-espresso-dark">
          {product.name}
        </h3>
        {descriptionText && (
          <p className="text-sm text-chocolate/60 mt-1">
            {descriptionText}
          </p>
        )}
        <div className="mt-2">
          <PriceTag price={selectedOption.price} className="text-lg" />
        </div>
      </div>

      {/* Stats row */}
      <div className="border-y border-espresso/10 py-3 grid grid-cols-3 text-center text-xs text-chocolate/60">
        <div>{'\u2615'} {t('options', { count: product.options.length })}</div>
        <div>{'\uD83D\uDD25'} {caloriesText ?? '—'}</div>
        <div>
          {product.temperature === 'both'
            ? `\uD83D\uDD25/\uD83E\uDDCA ${t('tempBoth')}`
            : product.temperature === 'hot'
              ? `\uD83D\uDD25 ${t('tempHot')}`
              : product.temperature === 'cold'
                ? `\uD83E\uDDCA ${t('tempCold')}`
                : t('tempNone')}
        </div>
      </div>

      {/* Options section */}
      {(hotOptions.length > 0 || coldOptions.length > 0) && (
        <div className="p-5 space-y-4">
          {hotOptions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-chocolate mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2" />
                {t('hot')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {hotOptions.map((opt, i) => (
                  <button
                    key={`hot-${i}`}
                    type="button"
                    aria-pressed={selectedOption === opt}
                    onClick={() => setSelectedOption(opt)}
                    className={[
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                      selectedOption === opt
                        ? 'bg-espresso-dark text-cream shadow-md'
                        : 'bg-foam text-espresso/50 hover:bg-espresso/10',
                    ].join(' ')}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {coldOptions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-chocolate mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2" />
                {t('cold')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {coldOptions.map((opt, i) => (
                  <button
                    key={`cold-${i}`}
                    type="button"
                    aria-pressed={selectedOption === opt}
                    onClick={() => setSelectedOption(opt)}
                    className={[
                      'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200',
                      selectedOption === opt
                        ? 'bg-espresso-dark text-cream shadow-md'
                        : 'bg-foam text-espresso/50 hover:bg-espresso/10',
                    ].join(' ')}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA */}
      <div className="border-t border-espresso/10 p-5">
        <p className="text-sm text-chocolate/60 mb-3">{selectedOption.name}</p>
        <Button variant="caramel" className="w-full">
          {t('cta', { price: formatPrice(selectedOption.price) })}
        </Button>
      </div>
    </Modal>
  )
}
