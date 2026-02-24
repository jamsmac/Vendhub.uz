import { validateImage } from '@/lib/imageUpload'

// Mock supabase module so the import doesn't fail in test env
vi.mock('@/lib/supabase', () => ({
  supabase: {},
}))

function createMockFile(name: string, size: number, type: string): File {
  const buffer = new ArrayBuffer(size)
  return new File([buffer], name, { type })
}

describe('validateImage', () => {
  it('accepts JPEG', () => {
    const file = createMockFile('photo.jpg', 1024, 'image/jpeg')
    expect(validateImage(file)).toEqual({ valid: true })
  })

  it('accepts PNG', () => {
    const file = createMockFile('photo.png', 1024, 'image/png')
    expect(validateImage(file)).toEqual({ valid: true })
  })

  it('accepts WebP', () => {
    const file = createMockFile('photo.webp', 1024, 'image/webp')
    expect(validateImage(file)).toEqual({ valid: true })
  })

  it('rejects unsupported type (GIF)', () => {
    const file = createMockFile('anim.gif', 1024, 'image/gif')
    const result = validateImage(file)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('JPEG')
  })

  it('rejects unsupported type (SVG)', () => {
    const file = createMockFile('icon.svg', 512, 'image/svg+xml')
    const result = validateImage(file)
    expect(result.valid).toBe(false)
  })

  it('rejects file over 5 MB', () => {
    const file = createMockFile('huge.jpg', 6 * 1024 * 1024, 'image/jpeg')
    const result = validateImage(file)
    expect(result.valid).toBe(false)
    expect(result.error).toContain('5')
  })

  it('accepts file exactly at 5 MB limit', () => {
    const file = createMockFile('max.jpg', 5 * 1024 * 1024, 'image/jpeg')
    expect(validateImage(file)).toEqual({ valid: true })
  })
})
