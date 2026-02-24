import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats zero', () => {
    expect(formatPrice(0)).toBe('0')
  })

  it('formats small number without separator', () => {
    expect(formatPrice(500)).toBe('500')
  })

  it('formats thousands with space separator', () => {
    expect(formatPrice(1000)).toBe('1 000')
  })

  it('formats typical UZS price', () => {
    expect(formatPrice(20000)).toBe('20 000')
  })

  it('formats large numbers with multiple separators', () => {
    expect(formatPrice(1000000)).toBe('1 000 000')
  })

  it('handles negative numbers', () => {
    expect(formatPrice(-5000)).toBe('-5 000')
  })
})
