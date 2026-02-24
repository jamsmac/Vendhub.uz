// VendHub.uz TypeScript interfaces
// Matches Supabase schema in supabase/schema.sql

export interface ProductOption {
  name: string
  price: number
  temperature: 'hot' | 'cold'
}

export interface Product {
  id: string
  name: string
  price: number
  category: 'coffee' | 'tea' | 'other' | 'snack'
  temperature: 'hot' | 'cold' | 'both' | 'none'
  popular: boolean
  available: boolean
  image_url: string | null
  description: string | null
  rating: number
  options: ProductOption[]
  is_new: boolean
  discount_percent: number | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface MachineTypeSpec {
  label: string
  value: string
}

export interface MachineTypeAdvantage {
  title: string
  desc: string
}

export interface MachineTypeDetail {
  id: string
  slug: string
  name: string
  model_name: string | null
  description: string
  hero_image_url: string | null
  specs: MachineTypeSpec[]
  advantages: MachineTypeAdvantage[]
  gallery_images: string[]
  is_active: boolean
  badge: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Machine {
  id: string
  name: string
  address: string
  type: string
  status: 'online' | 'offline'
  latitude: number | null
  longitude: number | null
  rating: number
  review_count: number
  floor: string | null
  hours: string
  product_count: number
  has_promotion: boolean
  location_type: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface Promotion {
  id: string
  title: string
  badge: string
  description: string
  promo_code: string | null
  gradient: string
  conditions: string[]
  valid_until: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  visibility_type: 'visible' | 'action_required'
  action_instruction: string
  discount_type: 'percent' | 'fixed' | 'special' | null
  discount_value: string | null
  updated_at: string
}

export interface BonusAction {
  id: string
  title: string
  description: string
  icon: string
  points_amount: string
  type: 'earn' | 'spend'
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface LoyaltyPrivilege {
  id: string
  key: string
  label: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface LoyaltyTier {
  id: string
  level: string
  emoji: string
  discount_percent: number
  threshold: number
  cashback_percent: number
  privileges: Record<string, boolean | number | string>
  sort_order: number
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  section: string
  key: string
  value: string
  updated_at: string
}

export interface CooperationRequest {
  id: string
  model: 'locations' | 'suppliers' | 'investors' | 'franchise'
  name: string
  phone: string
  comment: string | null
  status: 'new' | 'read' | 'processed'
  admin_notes: string | null
  created_at: string
}

export interface Partner {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  description: string | null
  sort_order: number
}
