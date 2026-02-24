# VendHub.uz -- API Documentation

> Data access layer documentation for the VendHub.uz website -- a vending machine platform in Tashkent, Uzbekistan.

## Overview

VendHub.uz uses **Supabase** as the backend. All data operations go through the Supabase client library (`@supabase/supabase-js`), not traditional REST endpoints. This document describes data access patterns using REST-like notation for clarity.

**Base configuration:**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Currency:** All prices are in UZS (Uzbek som), stored as integers (e.g., `20000` = 20,000 UZS).

---

## Table of Contents

1. [Public API (Read-only)](#public-api-read-only-no-auth-required)
   - [GET /products](#get-products)
   - [GET /machines](#get-machines)
   - [GET /promotions](#get-promotions)
   - [GET /loyalty_tiers](#get-loyalty_tiers)
   - [GET /site_content](#get-site_content)
   - [GET /partners](#get-partners)
   - [POST /cooperation_requests](#post-cooperation_requests)
2. [Admin API (Auth Required)](#admin-api-auth-required)
   - [Authentication](#authentication)
   - [CRUD Operations](#admin-crud-operations)
3. [Row Level Security (RLS)](#row-level-security-rls-policies)
4. [TypeScript Type Definitions](#typescript-type-definitions)

---

## Public API (Read-only, no auth required)

These endpoints use the Supabase `anon` key and are subject to RLS policies. No authentication is needed.

---

### GET /products

Fetch all products for the menu section.

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('products')
  .select('*')
  .order('sort_order')
```

**Response:** `Product[]`

**Available filters:**

| Filter | Type | Values | Description |
|--------|------|--------|-------------|
| `category` | text | `'coffee'` \| `'tea'` \| `'other'` \| `'snack'` | Filter by product category |
| `temperature` | text | `'hot'` \| `'cold'` \| `'both'` \| `'none'` | Filter by serving temperature |
| `popular` | boolean | `true` | Show only popular products |
| `available` | boolean | `true` | Show only available products |

**Filtered query example:**

```typescript
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'coffee')
  .eq('available', true)
  .order('sort_order')
```

**Example response:**

```json
[
  {
    "id": "uuid",
    "name": "Эспрессо",
    "price": 20000,
    "category": "coffee",
    "temperature": "hot",
    "popular": true,
    "available": true,
    "image_url": null,
    "description": "Классический эспрессо",
    "rating": 4.9,
    "options": [
      { "name": "С сахаром", "price": 20000, "temperature": "hot" },
      { "name": "Без сахара", "price": 20000, "temperature": "hot" }
    ],
    "is_new": false,
    "discount_percent": null,
    "sort_order": 1,
    "created_at": "2026-01-15T10:00:00.000Z",
    "updated_at": "2026-01-15T10:00:00.000Z"
  }
]
```

**Fields:**

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | uuid | No | Primary key |
| `name` | text | No | Product name |
| `price` | integer | No | Price in UZS |
| `category` | text | No | `coffee` \| `tea` \| `other` \| `snack` |
| `temperature` | text | No | `hot` \| `cold` \| `both` \| `none` |
| `popular` | boolean | No | Popular flag (default: `false`) |
| `available` | boolean | No | Availability flag (default: `true`) |
| `image_url` | text | Yes | Image URL |
| `description` | text | Yes | Product description |
| `rating` | decimal(2,1) | No | Rating 0.0--5.0 (default: `0`) |
| `options` | jsonb | Yes | Array of `{ name, price, temperature }` |
| `is_new` | boolean | No | New product flag (default: `false`) |
| `discount_percent` | integer | Yes | Discount percentage |
| `sort_order` | integer | No | Display order (default: `0`) |
| `created_at` | timestamptz | No | Creation timestamp |
| `updated_at` | timestamptz | No | Last update timestamp |

---

### GET /machines

Fetch all vending machines for the map section.

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('machines')
  .select('*')
  .order('name')
```

**Response:** `Machine[]`

**Available filters:**

| Filter | Type | Values | Description |
|--------|------|--------|-------------|
| `status` | text | `'online'` \| `'offline'` | Machine operational status |
| `type` | text | `'coffee'` \| `'snack'` \| `'cold'` | Machine type |
| `has_promotion` | boolean | `true` | Machines with active promotions |
| `location_type` | text | `'hospital'` \| `'university'` \| `'market'` \| `'government'` \| `'residential'` | Location category |

**Filtered query example:**

```typescript
const { data, error } = await supabase
  .from('machines')
  .select('*')
  .eq('status', 'online')
  .eq('type', 'coffee')
  .order('name')
```

**Example response:**

```json
[
  {
    "id": "uuid",
    "name": "SOLIQ OLMAZOR",
    "address": "Сагбон 12-й проезд, 2-й тупик, 1/1",
    "type": "coffee",
    "status": "online",
    "latitude": 41.3111,
    "longitude": 69.2197,
    "rating": 4.7,
    "review_count": 85,
    "floor": null,
    "hours": "24/7",
    "product_count": 12,
    "has_promotion": false,
    "location_type": "government",
    "created_at": "2026-01-10T08:00:00.000Z",
    "updated_at": "2026-02-20T12:00:00.000Z"
  }
]
```

**Fields:**

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | uuid | No | Primary key |
| `name` | text | No | Machine/location name |
| `address` | text | No | Street address |
| `type` | text | No | `coffee` \| `snack` \| `cold` |
| `status` | text | No | `online` \| `offline` (default: `online`) |
| `latitude` | decimal(10,7) | Yes | GPS latitude |
| `longitude` | decimal(10,7) | Yes | GPS longitude |
| `rating` | decimal(2,1) | No | Rating 0.0--5.0 (default: `0`) |
| `review_count` | integer | No | Number of reviews (default: `0`) |
| `floor` | text | Yes | Floor number (for indoor locations) |
| `hours` | text | No | Operating hours (default: `24/7`) |
| `product_count` | integer | No | Number of products available (default: `0`) |
| `has_promotion` | boolean | No | Active promotion flag (default: `false`) |
| `location_type` | text | Yes | `hospital` \| `university` \| `market` \| `government` \| `residential` |
| `created_at` | timestamptz | No | Creation timestamp |
| `updated_at` | timestamptz | No | Last update timestamp |

---

### GET /promotions

Fetch active promotions. RLS restricts public access to active promotions only (`is_active = true`).

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('promotions')
  .select('*')
  .eq('is_active', true)
  .order('sort_order')
```

**Response:** `Promotion[]`

**Example response:**

```json
[
  {
    "id": "uuid",
    "title": "Скидка 20% на всё меню",
    "badge": "Популярное",
    "description": "Используйте промокод COFFEE20 при заказе",
    "promo_code": "COFFEE20",
    "gradient": "from-red-500 to-rose-600",
    "conditions": [
      "Все напитки",
      "Не суммируется с другими скидками",
      "Один раз на пользователя"
    ],
    "valid_until": "2026-03-15",
    "is_active": true,
    "sort_order": 1,
    "created_at": "2026-02-01T00:00:00.000Z"
  }
]
```

**Fields:**

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | uuid | No | Primary key |
| `title` | text | No | Promotion title |
| `badge` | text | No | Display badge (e.g., "Популярное", "Выгодно") |
| `description` | text | Yes | Promotion description |
| `promo_code` | text | Yes | Promo code |
| `gradient` | text | Yes | Tailwind CSS gradient classes for card styling |
| `conditions` | jsonb | No | Array of condition strings (default: `[]`) |
| `valid_until` | date | Yes | Expiration date |
| `is_active` | boolean | No | Active flag (default: `true`) |
| `sort_order` | integer | No | Display order (default: `0`) |
| `created_at` | timestamptz | No | Creation timestamp |

---

### GET /loyalty_tiers

Fetch loyalty program tiers.

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('loyalty_tiers')
  .select('*')
  .order('sort_order')
```

**Response:** `LoyaltyTier[]`

**Example response:**

```json
[
  {
    "id": "uuid",
    "level": "Bronze",
    "emoji": "\ud83e\udd49",
    "discount_percent": 0,
    "threshold": 0,
    "cashback_percent": 1,
    "privileges": {
      "cashback": true,
      "discount": false,
      "priority_promos": false,
      "special_codes": false,
      "birthday_bonus": 0,
      "early_access": false,
      "personal_offers": false,
      "free_drink_monthly": false
    },
    "sort_order": 1
  },
  {
    "id": "uuid",
    "level": "Silver",
    "emoji": "\ud83e\udd48",
    "discount_percent": 5,
    "threshold": 200000,
    "cashback_percent": 3,
    "privileges": {
      "cashback": true,
      "discount": true,
      "priority_promos": true,
      "special_codes": false,
      "birthday_bonus": 10000,
      "early_access": false,
      "personal_offers": false,
      "free_drink_monthly": false
    },
    "sort_order": 2
  }
]
```

**Fields:**

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | uuid | No | Primary key |
| `level` | text | No | Tier name: `Bronze` \| `Silver` \| `Gold` \| `Platinum` |
| `emoji` | text | Yes | Tier emoji icon |
| `discount_percent` | integer | No | Discount percentage |
| `threshold` | integer | No | Spending threshold in UZS to reach this tier |
| `cashback_percent` | integer | No | Cashback percentage |
| `privileges` | jsonb | No | Tier privileges object (default: `{}`) |
| `sort_order` | integer | No | Display order (default: `0`) |

**Privileges object structure:**

| Key | Type | Description |
|-----|------|-------------|
| `cashback` | boolean | Cashback enabled |
| `discount` | boolean | Discount on orders |
| `priority_promos` | boolean | Early access to promotions |
| `special_codes` | boolean | Exclusive promo codes |
| `birthday_bonus` | integer | Birthday bonus in UZS |
| `early_access` | boolean | Early access to new products |
| `personal_offers` | boolean | Personalized offers |
| `free_drink_monthly` | boolean | Free drink each month |

---

### GET /site_content

Fetch CMS content for dynamic site sections.

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('site_content')
  .select('*')
```

**Response:** `SiteContent[]`

**Sections:** `hero` | `stats` | `about` | `footer`

**Filtered query example (by section):**

```typescript
const { data, error } = await supabase
  .from('site_content')
  .select('*')
  .eq('section', 'stats')
```

**Example response:**

```json
[
  { "id": "uuid", "section": "hero", "key": "title", "value": "Кофе из автоматов в пару кликов", "updated_at": "2026-02-01T00:00:00.000Z" },
  { "id": "uuid", "section": "hero", "key": "subtitle", "value": "25+ видов напитков в 16 автоматах Ташкента", "updated_at": "2026-02-01T00:00:00.000Z" },
  { "id": "uuid", "section": "stats", "key": "machines_count", "value": "16", "updated_at": "2026-02-01T00:00:00.000Z" },
  { "id": "uuid", "section": "stats", "key": "drinks_count", "value": "25+", "updated_at": "2026-02-01T00:00:00.000Z" },
  { "id": "uuid", "section": "stats", "key": "orders_count", "value": "10K+", "updated_at": "2026-02-01T00:00:00.000Z" },
  { "id": "uuid", "section": "stats", "key": "rating", "value": "4.8", "updated_at": "2026-02-01T00:00:00.000Z" }
]
```

**Fields:**

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | uuid | No | Primary key |
| `section` | text | No | Section identifier: `hero` \| `stats` \| `about` \| `footer` |
| `key` | text | No | Content key (unique per section) |
| `value` | text | No | Content value |
| `updated_at` | timestamptz | No | Last update timestamp |

---

### GET /partners

Fetch partner logos for the partners section.

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('partners')
  .select('*')
  .order('sort_order')
```

**Response:** `Partner[]`

**Example response:**

```json
[
  {
    "id": "uuid",
    "name": "Partner Company",
    "logo_url": "https://example.com/logo.png",
    "sort_order": 1
  }
]
```

**Fields:**

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | uuid | No | Primary key |
| `name` | text | No | Partner name |
| `logo_url` | text | Yes | Logo image URL |
| `sort_order` | integer | No | Display order (default: `0`) |

---

### POST /cooperation_requests

Submit a partnership application through the cooperation form. This is the only public write operation.

**Supabase query:**

```typescript
const { data, error } = await supabase
  .from('cooperation_requests')
  .insert({
    model: 'locations',
    name: 'Иван Иванов',
    phone: '+998901234567',
    comment: 'Хочу разместить автомат в офисе'
  })
```

**Request body:**

```json
{
  "model": "locations",
  "name": "Иван Иванов",
  "phone": "+998901234567",
  "comment": "Хочу разместить автомат в офисе"
}
```

**Validation rules:**

| Field | Required | Constraints |
|-------|----------|-------------|
| `model` | Yes | One of: `'locations'`, `'suppliers'`, `'investors'`, `'franchise'` |
| `name` | Yes | Minimum 2 characters |
| `phone` | Yes | Format: `+998XXXXXXXXX` (Uzbekistan phone number, 12 digits total) |
| `comment` | No | Free text |

**Cooperation models explained:**

| Model | Description |
|-------|-------------|
| `locations` | Offer a location for machine placement |
| `suppliers` | Supply products or ingredients |
| `investors` | Investment partnership |
| `franchise` | Franchise opportunity |

**Response on success:** The inserted row with auto-generated `id`, `status: 'new'`, and `created_at`.

**Error responses:**

| Status | Cause |
|--------|-------|
| `400` | Validation failed (missing fields, invalid format) |
| `403` | RLS policy violation (attempting to read or delete) |

---

## Admin API (Auth Required)

All admin operations require Supabase Auth. The admin panel uses email/password authentication.

### Authentication

**Login:**

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@vendhub.uz',
  password: 'your-password'
})

// data.session contains the access token
// data.user contains user metadata
```

**Logout:**

```typescript
const { error } = await supabase.auth.signOut()
```

**Session check:**

```typescript
const { data: { session }, error } = await supabase.auth.getSession()

if (session) {
  // User is authenticated
  // session.access_token -- JWT token
  // session.user -- user object
}
```

**Auth state listener:**

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  // event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | ...
})
```

---

### Admin CRUD Operations

All tables support full CRUD for authenticated admin users via the `service_role` key. These operations run in server-side API routes (Next.js Route Handlers) to protect the service key.

**Server-side Supabase client:**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Never expose in the browser
)
```

**Create:**

```typescript
const { data, error } = await supabaseAdmin
  .from('products')
  .insert({
    name: 'Латте',
    price: 25000,
    category: 'coffee',
    temperature: 'hot'
  })
  .select()
```

**Read (all records, bypasses RLS):**

```typescript
const { data, error } = await supabaseAdmin
  .from('products')
  .select('*')
  .order('sort_order')
```

**Update:**

```typescript
const { data, error } = await supabaseAdmin
  .from('products')
  .update({ price: 22000, available: false })
  .eq('id', 'product-uuid')
  .select()
```

**Delete:**

```typescript
const { error } = await supabaseAdmin
  .from('products')
  .delete()
  .eq('id', 'product-uuid')
```

**Supported tables:**

- `products`
- `machines`
- `promotions`
- `loyalty_tiers`
- `site_content`
- `cooperation_requests` (read and update only -- no delete)
- `partners`

---

## Row Level Security (RLS) Policies

All tables have RLS enabled. Public access uses the `anon` key; admin access uses the `service_role` key via server-side API routes.

| Table | Public SELECT | Public INSERT | Auth Read | Auth Write | Auth Delete |
|-------|:------------:|:-------------:|:---------:|:----------:|:-----------:|
| `products` | Yes | -- | Yes | Yes | Yes |
| `machines` | Yes | -- | Yes | Yes | Yes |
| `promotions` | Yes (active only) | -- | Yes | Yes | Yes |
| `loyalty_tiers` | Yes | -- | Yes | Yes | Yes |
| `site_content` | Yes | -- | Yes | Yes | Yes |
| `cooperation_requests` | -- | Yes | Yes | Yes (update) | -- |
| `partners` | Yes | -- | Yes | Yes | Yes |

**Key details:**

- `promotions` -- public reads are restricted to rows where `is_active = true`
- `cooperation_requests` -- public users can only insert; reading and updating requires admin auth; deletion is not allowed
- **Admin** = Supabase `service_role` key (used server-side only, never exposed to the browser)
- **Public** = Supabase `anon` key (used in browser, subject to RLS restrictions)

---

## TypeScript Type Definitions

```typescript
// ============================================
// Product
// ============================================

interface ProductOption {
  name: string
  price: number
  temperature: 'hot' | 'cold' | 'both' | 'none'
}

interface Product {
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
  options: ProductOption[] | null
  is_new: boolean
  discount_percent: number | null
  sort_order: number
  created_at: string
  updated_at: string
}

// ============================================
// Machine
// ============================================

type MachineType = 'coffee' | 'snack' | 'cold'
type MachineStatus = 'online' | 'offline'
type LocationType = 'hospital' | 'university' | 'market' | 'government' | 'residential'

interface Machine {
  id: string
  name: string
  address: string
  type: MachineType
  status: MachineStatus
  latitude: number | null
  longitude: number | null
  rating: number
  review_count: number
  floor: string | null
  hours: string
  product_count: number
  has_promotion: boolean
  location_type: LocationType | null
  created_at: string
  updated_at: string
}

// ============================================
// Promotion
// ============================================

interface Promotion {
  id: string
  title: string
  badge: string
  description: string | null
  promo_code: string | null
  gradient: string | null
  conditions: string[]
  valid_until: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

// ============================================
// Loyalty Tier
// ============================================

interface LoyaltyPrivileges {
  cashback: boolean
  discount: boolean
  priority_promos: boolean
  special_codes: boolean
  birthday_bonus: number
  early_access: boolean
  personal_offers: boolean
  free_drink_monthly: boolean
}

interface LoyaltyTier {
  id: string
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  emoji: string | null
  discount_percent: number
  threshold: number
  cashback_percent: number
  privileges: LoyaltyPrivileges
  sort_order: number
}

// ============================================
// Site Content
// ============================================

type SiteSection = 'hero' | 'stats' | 'about' | 'footer'

interface SiteContent {
  id: string
  section: SiteSection
  key: string
  value: string
  updated_at: string
}

// ============================================
// Cooperation Request
// ============================================

type CooperationModel = 'locations' | 'suppliers' | 'investors' | 'franchise'
type RequestStatus = 'new' | 'read' | 'processed'

interface CooperationRequest {
  id: string
  model: CooperationModel
  name: string
  phone: string
  comment: string | null
  status: RequestStatus
  created_at: string
}

// Input type for creating a new cooperation request (public)
interface CooperationRequestInsert {
  model: CooperationModel
  name: string
  phone: string
  comment?: string
}

// ============================================
// Partner
// ============================================

interface Partner {
  id: string
  name: string
  logo_url: string | null
  sort_order: number
}

// ============================================
// Supabase Database type (for createClient<Database>)
// ============================================

interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      machines: {
        Row: Machine
        Insert: Omit<Machine, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Machine, 'id' | 'created_at' | 'updated_at'>>
      }
      promotions: {
        Row: Promotion
        Insert: Omit<Promotion, 'id' | 'created_at'>
        Update: Partial<Omit<Promotion, 'id' | 'created_at'>>
      }
      loyalty_tiers: {
        Row: LoyaltyTier
        Insert: Omit<LoyaltyTier, 'id'>
        Update: Partial<Omit<LoyaltyTier, 'id'>>
      }
      site_content: {
        Row: SiteContent
        Insert: Omit<SiteContent, 'id' | 'updated_at'>
        Update: Partial<Omit<SiteContent, 'id' | 'updated_at'>>
      }
      cooperation_requests: {
        Row: CooperationRequest
        Insert: CooperationRequestInsert
        Update: Partial<Pick<CooperationRequest, 'status'>>
      }
      partners: {
        Row: Partner
        Insert: Omit<Partner, 'id'>
        Update: Partial<Omit<Partner, 'id'>>
      }
    }
  }
}
```

**Usage with typed Supabase client:**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Full type safety on queries
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'coffee') // autocompletes column names
  .returns<Product[]>()
```

---

## Error Handling

All Supabase queries return `{ data, error }`. Always check the error field:

```typescript
const { data, error } = await supabase.from('products').select('*')

if (error) {
  console.error('Supabase error:', error.message)
  // error.code -- PostgreSQL error code
  // error.message -- human-readable message
  // error.details -- additional details
  return
}

// data is guaranteed to be non-null here
```

**Common error codes:**

| Code | Meaning |
|------|---------|
| `PGRST301` | Row not found |
| `23505` | Unique constraint violation |
| `42501` | RLS policy violation (insufficient permissions) |
| `23502` | NOT NULL constraint violation |

---

*Document version: 1.0 -- February 2026. Refer to the Supabase Dashboard for the most current schema.*
