'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, ChevronDown, LocateFixed, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { machines } from '@/lib/data'
import { useModal } from '@/lib/modal-context'
import { useGeolocation } from '@/lib/useGeolocation'
import { sortByDistance, formatDistance } from '@/lib/geo'
import type { MachineWithDistance } from '@/lib/geo'
import SectionHeader from '@/components/ui/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Pill from '@/components/ui/Pill'
import LeafletMap from '@/components/map/DynamicMap'

type Tab = 'map' | 'types'
type StatusFilter = 'all' | 'online' | 'promo'
type TypeFilter = 'all' | 'coffee' | 'snack' | 'cold'
type MachineType = Exclude<TypeFilter, 'all'>

const MACHINE_TYPE_META: Record<
  MachineType,
  { emoji: string; imageSrc?: string; imageAlt?: string }
> = {
  coffee: {
    emoji: '\u2615',
    imageSrc: '/images/machines/coffee-machine.png',
    imageAlt: 'Coffee machine',
  },
  snack: {
    emoji: '\uD83C\uDF6A',
    imageSrc: '/images/machines/snack-machine.png',
    imageAlt: 'Snack machine',
  },
  cold: {
    emoji: '\uD83E\uDDCA',
  },
}

export default function MachinesSection() {
  const { openMachineModal } = useModal()
  const t = useTranslations('machines')
  const geo = useGeolocation()
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [sortNearest, setSortNearest] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState<number>(0)

  const hasLocation = geo.latitude != null && geo.longitude != null
  const userLocation = useMemo(
    () => hasLocation ? { lat: geo.latitude!, lng: geo.longitude! } : null,
    [hasLocation, geo.latitude, geo.longitude]
  )

  const totalCount = machines.length
  const onlineCount = machines.filter((m) => m.status === 'online').length
  const promoCount = machines.filter((m) => m.has_promotion).length
  const coffeeCount = machines.filter((m) => m.type === 'coffee').length

  const filteredMachines: MachineWithDistance[] = useMemo(() => {
    const result = machines.filter((m) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !m.name.toLowerCase().includes(q) &&
          !m.address.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      // Status filter
      if (statusFilter === 'online' && m.status !== 'online') return false
      if (statusFilter === 'promo' && !m.has_promotion) return false
      // Type filter
      if (typeFilter !== 'all' && m.type !== typeFilter) return false
      return true
    })

    // Attach distance + sort if user location is available and sort is active
    if (userLocation) {
      const withDist = sortByDistance(result, userLocation.lat, userLocation.lng)
      if (sortNearest) return withDist
      // Even if not sorting, still attach distance for display
      return withDist
    }

    return result
  }, [searchQuery, statusFilter, typeFilter, userLocation, sortNearest])

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(expandedAccordion === index ? -1 : index)
  }

  return (
    <section id="map" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t('title')}
          subtitle={t('onlineCount', { online: onlineCount, total: totalCount })}
        />

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={[
              'px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              activeTab === 'map'
                ? 'bg-espresso-dark text-cream shadow-md'
                : 'bg-foam text-espresso/50 hover:bg-espresso/10',
            ].join(' ')}
          >
            {t('tabs.map')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('types')}
            className={[
              'px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              activeTab === 'types'
                ? 'bg-espresso-dark text-cream shadow-md'
                : 'bg-foam text-espresso/50 hover:bg-espresso/10',
            ].join(' ')}
          >
            {t('tabs.types')}
          </button>
        </div>

        {activeTab === 'map' && (
          <>
            {/* Search + geolocation */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/30"
                />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-foam border border-espresso/10 pl-11 pr-10 py-3 text-sm text-chocolate placeholder:text-espresso/30 focus:outline-none focus:border-espresso/30 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-espresso/30 hover:text-espresso/60 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  geo.requestLocation()
                  setSortNearest(true)
                }}
                disabled={geo.loading}
                className={[
                  'shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                  hasLocation
                    ? 'bg-espresso-dark text-cream border-espresso-dark'
                    : 'bg-foam text-espresso/70 border-espresso/10 hover:border-espresso/30',
                ].join(' ')}
                title={t('myLocation')}
              >
                {geo.loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <LocateFixed size={18} />
                )}
                <span className="hidden sm:inline">{t('myLocation')}</span>
              </button>
            </div>
            {geo.error && (
              <p className="text-sm text-red-500 mb-4">{t('locationError')}</p>
            )}

            {/* Status filter pills */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              <Pill
                label={t('filters.all')}
                count={totalCount}
                active={statusFilter === 'all' && !sortNearest}
                onClick={() => { setStatusFilter('all'); setSortNearest(false) }}
              />
              {hasLocation && (
                <Pill
                  icon={<LocateFixed size={14} />}
                  label={t('nearest')}
                  active={sortNearest}
                  onClick={() => setSortNearest(!sortNearest)}
                />
              )}
              <Pill
                label={t('filters.online')}
                count={onlineCount}
                active={statusFilter === 'online'}
                onClick={() => setStatusFilter('online')}
              />
              <Pill
                label={t('filters.promotion')}
                count={promoCount}
                active={statusFilter === 'promo'}
                onClick={() => setStatusFilter('promo')}
              />
            </div>

            {/* Type filter pills */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <Pill
                icon={'\u2615'}
                label={t('filters.coffee')}
                count={coffeeCount}
                active={typeFilter === 'coffee' || typeFilter === 'all'}
                onClick={() =>
                  setTypeFilter(typeFilter === 'coffee' ? 'all' : 'coffee')
                }
              />
              <Pill
                icon={'\uD83C\uDF6A'}
                label={t('filters.snack')}
                count={0}
                active={typeFilter === 'snack'}
                onClick={() =>
                  setTypeFilter(typeFilter === 'snack' ? 'all' : 'snack')
                }
              />
              <Pill
                icon={'\uD83E\uDDCA'}
                label={t('filters.cold')}
                count={0}
                active={typeFilter === 'cold'}
                onClick={() =>
                  setTypeFilter(typeFilter === 'cold' ? 'all' : 'cold')
                }
              />
            </div>

            {/* Map */}
            <LeafletMap
              machines={filteredMachines}
              onMachineClick={(machine) => {
                const m = machine as MachineWithDistance
                const dist = m.distance != null ? formatDistance(m.distance) : null
                openMachineModal(machine, dist)
              }}
              userLocation={userLocation}
            />

            {/* Machine cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMachines.map((machine) => {
                const typeMeta = MACHINE_TYPE_META[machine.type]
                const dist = (machine as MachineWithDistance).distance
                const distFormatted = dist != null ? formatDistance(dist) : null

                return (
                  <Card
                    key={machine.id}
                    hover
                    onClick={() => openMachineModal(machine, distFormatted)}
                  >
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2 gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-11 h-11 rounded-xl bg-foam border border-espresso/10 overflow-hidden shrink-0">
                            {machine.image_url ? (
                              <Image
                                src={machine.image_url}
                                alt={machine.name}
                                fill
                                sizes="44px"
                                className="object-cover"
                              />
                            ) : typeMeta.imageSrc ? (
                              <Image
                                src={typeMeta.imageSrc}
                                alt={typeMeta.imageAlt ?? machine.name}
                                fill
                                sizes="44px"
                                className="object-contain p-1"
                              />
                            ) : (
                              <span className="w-full h-full flex items-center justify-center text-lg">
                                {typeMeta.emoji}
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-chocolate truncate">
                            {machine.name}
                          </h3>
                        </div>
                        <Badge
                          variant={
                            machine.status === 'online'
                              ? 'status-online'
                              : 'status-offline'
                          }
                          className="shrink-0 ml-2"
                        >
                          {machine.status === 'online'
                            ? t('card.online')
                            : t('card.offline')}
                        </Badge>
                      </div>

                      {machine.has_promotion && (
                        <div className="mb-2">
                          <Badge variant="promo">{t('card.promotion')}</Badge>
                        </div>
                      )}

                      <p className="text-sm text-chocolate/60 mb-3">
                        {machine.address}
                      </p>

                      {/* Stats row */}
                      <div className="text-xs text-chocolate/50 mb-4">
                        {'\u2B50'} {machine.rating} ({machine.review_count}){' '}
                        {'\u00B7'} {machine.product_count} {t('card.items')} {'\u00B7'}{' '}
                        {machine.hours}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-espresso font-medium">
                          {t('card.openLocation')}
                        </div>
                        {distFormatted && (
                          <span className="text-xs text-chocolate/40 bg-foam px-2 py-0.5 rounded-full">
                            {t('card.distance', { distance: distFormatted })}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {filteredMachines.length === 0 && (
              <div className="text-center py-12">
                <Search
                  size={48}
                  className="mx-auto opacity-30 text-chocolate mb-3"
                />
                <p className="text-chocolate/60 font-medium">
                  {t('empty.title')}
                </p>
                <p className="text-chocolate/40 text-sm mt-1">
                  {t('empty.subtitle')}
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'types' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Coffee Automat */}
            <div className="bg-white rounded-2xl border border-espresso/5 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion(0)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-foam border border-espresso/10 overflow-hidden shrink-0">
                    <Image
                      src={MACHINE_TYPE_META.coffee.imageSrc!}
                      alt={MACHINE_TYPE_META.coffee.imageAlt!}
                      fill
                      sizes="48px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-chocolate">
                      {t('types.coffeeMachine')}
                    </h3>
                    <p className="text-sm text-chocolate/50">
                      {t('types.coffeeModel')} · {t('types.count', { count: 16 })}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={20}
                  className={[
                    'text-chocolate/30 transition-transform duration-300',
                    expandedAccordion === 0 ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>
              {expandedAccordion === 0 && (
                <div className="px-5 pb-5 animate-expand overflow-hidden">
                  <div className="border-t border-espresso/5 pt-4 space-y-3 text-sm text-chocolate/70">
                    <div>
                      <span className="font-medium text-chocolate">
                        {t('types.dimensions')}
                      </span>{' '}
                      {t('types.dimensionsValue')}
                    </div>
                    <div>
                      <span className="font-medium text-chocolate">
                        {t('types.display')}
                      </span>{' '}
                      {t('types.displayValue')}
                    </div>
                    <div>
                      <span className="font-medium text-chocolate">
                        {t('types.payment')}
                      </span>{' '}
                      {t('types.paymentValue')}
                    </div>
                    <div>
                      <span className="font-medium text-chocolate">
                        {t('types.features')}
                      </span>{' '}
                      {t('types.featuresValue')}
                    </div>
                    <div className="pt-2">
                      <Link
                        href="/machines/jq-002-a"
                        className="inline-block text-sm font-medium text-espresso hover:text-espresso-dark transition-colors"
                      >
                        {t('types.viewDetails')}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Snack Automat */}
            <div className="bg-white rounded-2xl border border-espresso/5 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion(1)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-foam border border-espresso/10 overflow-hidden shrink-0">
                    <Image
                      src={MACHINE_TYPE_META.snack.imageSrc!}
                      alt={MACHINE_TYPE_META.snack.imageAlt!}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-chocolate">
                      {t('types.snackMachine')}
                    </h3>
                    <p className="text-sm text-chocolate/50">{t('types.snackModel')}</p>
                  </div>
                  <Badge variant="new" className="ml-2">
                    {t('types.comingSoon')}
                  </Badge>
                </div>
                <ChevronDown
                  size={20}
                  className={[
                    'text-chocolate/30 transition-transform duration-300',
                    expandedAccordion === 1 ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>
              {expandedAccordion === 1 && (
                <div className="px-5 pb-5 animate-expand overflow-hidden">
                  <div className="border-t border-espresso/5 pt-4 text-sm text-chocolate/50">
                    {t('types.infoSoon')}
                  </div>
                </div>
              )}
            </div>

            {/* Cold Drinks */}
            <div className="bg-white rounded-2xl border border-espresso/5 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion(2)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{'\uD83E\uDDCA'}</span>
                  <div>
                    <h3 className="font-medium text-chocolate">
                      {t('types.coldDrinks')}
                    </h3>
                  </div>
                  <Badge variant="new" className="ml-2">
                    {t('types.comingSoon')}
                  </Badge>
                </div>
                <ChevronDown
                  size={20}
                  className={[
                    'text-chocolate/30 transition-transform duration-300',
                    expandedAccordion === 2 ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>
              {expandedAccordion === 2 && (
                <div className="px-5 pb-5 animate-expand overflow-hidden">
                  <div className="border-t border-espresso/5 pt-4 text-sm text-chocolate/50">
                    {t('types.infoSoon')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
