import ru from '@/messages/ru.json'
import uz from '@/messages/uz.json'

/** Recursively collect all leaf key paths from a nested object */
function getKeyPaths(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...getKeyPaths(value as Record<string, unknown>, path))
    } else {
      keys.push(path)
    }
  }
  return keys.sort()
}

describe('i18n key sync', () => {
  const ruKeys = getKeyPaths(ru)
  const uzKeys = getKeyPaths(uz)

  it('ru.json and uz.json have the same number of keys', () => {
    expect(ruKeys.length).toBe(uzKeys.length)
  })

  it('every ru.json key exists in uz.json', () => {
    const missing = ruKeys.filter((k) => !uzKeys.includes(k))
    expect(missing).toEqual([])
  })

  it('every uz.json key exists in ru.json', () => {
    const extra = uzKeys.filter((k) => !ruKeys.includes(k))
    expect(extra).toEqual([])
  })

  it('no translation value is empty string', () => {
    const emptyRu = ruKeys.filter((k) => {
      const val = k.split('.').reduce((o: any, p) => o?.[p], ru)
      return val === ''
    })
    const emptyUz = uzKeys.filter((k) => {
      const val = k.split('.').reduce((o: any, p) => o?.[p], uz)
      return val === ''
    })
    expect(emptyRu).toEqual([])
    expect(emptyUz).toEqual([])
  })
})
