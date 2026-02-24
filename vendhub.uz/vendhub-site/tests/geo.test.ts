import { calculateDistance, formatDistance, sortByDistance } from '@/lib/geo'
import type { Machine } from '@/lib/types'

describe('calculateDistance', () => {
  it('returns 0 for identical points', () => {
    expect(calculateDistance(41.3111, 69.2797, 41.3111, 69.2797)).toBe(0)
  })

  it('calculates known distance (Tashkent → Samarkand ≈ 270 km)', () => {
    const d = calculateDistance(41.3111, 69.2797, 39.6542, 66.9597)
    expect(d).toBeGreaterThan(260)
    expect(d).toBeLessThan(280)
  })

  it('calculates short distance (<1 km)', () => {
    // ~300m apart in central Tashkent
    const d = calculateDistance(41.311, 69.279, 41.314, 69.279)
    expect(d).toBeGreaterThan(0.2)
    expect(d).toBeLessThan(0.5)
  })
})

describe('formatDistance', () => {
  it('formats < 1 km as meters (ru)', () => {
    expect(formatDistance(0.35)).toBe('350 м')
  })

  it('formats < 1 km as meters (uz)', () => {
    expect(formatDistance(0.35, 'uz')).toBe('350 m')
  })

  it('formats ≥ 1 km as km (ru)', () => {
    expect(formatDistance(2.1)).toBe('2.1 км')
  })

  it('formats ≥ 1 km as km (uz)', () => {
    expect(formatDistance(2.1, 'uz')).toBe('2.1 km')
  })

  it('rounds meters to nearest integer', () => {
    expect(formatDistance(0.4567)).toBe('457 м')
  })

  it('formats exactly 1 km', () => {
    expect(formatDistance(1.0)).toBe('1.0 км')
  })
})

describe('sortByDistance', () => {
  const baseMachine: Machine = {
    id: '1',
    name: 'Test',
    address: 'Test',
    type: 'coffee',
    status: 'online',
    latitude: null,
    longitude: null,
    rating: 4.5,
    review_count: 10,
    floor: null,
    hours: '24/7',
    product_count: 10,
    has_promotion: false,
    location_type: null,
    image_url: null,
    created_at: '',
    updated_at: '',
  }

  it('sorts machines by distance ascending', () => {
    const machines: Machine[] = [
      { ...baseMachine, id: 'far', latitude: 39.65, longitude: 66.96 }, // Samarkand
      { ...baseMachine, id: 'near', latitude: 41.32, longitude: 69.28 }, // near Tashkent
    ]

    const sorted = sortByDistance(machines, 41.31, 69.28)
    expect(sorted[0].id).toBe('near')
    expect(sorted[1].id).toBe('far')
  })

  it('pushes machines without coordinates to the end', () => {
    const machines: Machine[] = [
      { ...baseMachine, id: 'no-coords', latitude: null, longitude: null },
      { ...baseMachine, id: 'with-coords', latitude: 41.32, longitude: 69.28 },
    ]

    const sorted = sortByDistance(machines, 41.31, 69.28)
    expect(sorted[0].id).toBe('with-coords')
    expect(sorted[1].id).toBe('no-coords')
    expect(sorted[1].distance).toBeUndefined()
  })

  it('returns empty array for empty input', () => {
    expect(sortByDistance([], 41.31, 69.28)).toEqual([])
  })
})
