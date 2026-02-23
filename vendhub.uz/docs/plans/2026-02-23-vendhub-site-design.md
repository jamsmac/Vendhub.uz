# VendHub.uz — Design Document

> Date: 2026-02-23
> Author: Claude + Jamshid
> Status: Approved

---

## Summary

Informational website for VendHub (vending machine operator in Tashkent) with admin panel.
Single-page landing with 6 sections + modals. Admin panel for content management.
Standalone backend (Supabase), future integration with VHM24.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14+ (App Router) |
| Styling | Tailwind CSS 3.4 + "Warm Brew" design tokens |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Map | Yandex Maps JavaScript API |
| Database | Supabase (PostgreSQL) |
| Auth (admin) | Supabase Auth (email/password) |
| Deploy | Vercel (frontend) + Supabase (DB) |

## Project Structure

```
vendhub-site/
├── app/
│   ├── layout.tsx              # Root layout + fonts + meta
│   ├── page.tsx                # Landing (6 sections)
│   ├── globals.css             # Tailwind + Warm Brew
│   └── admin/
│       ├── layout.tsx          # Admin layout + auth
│       ├── page.tsx            # Dashboard
│       ├── products/page.tsx   # CRUD products
│       ├── machines/page.tsx   # CRUD machines
│       ├── promotions/page.tsx # CRUD promotions
│       ├── loyalty/page.tsx    # Loyalty tiers
│       ├── content/page.tsx    # CMS (hero, about, stats)
│       ├── cooperation/page.tsx # Partnership requests
│       ├── partners/page.tsx   # Partner logos
│       └── login/page.tsx      # Admin login
├── components/
│   ├── sections/               # Landing sections
│   ├── modals/                 # ProductModal, MachineModal
│   └── ui/                     # Buttons, cards, pills
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── types.ts                # TypeScript types
│   └── data.ts                 # Seed/fallback data
├── public/                     # Images
└── tailwind.config.ts          # Warm Brew tokens
```

## Database Schema

### products
- id (uuid, PK), name, price (int), category (enum: coffee/tea/other/snack)
- temperature (enum: hot/cold/both/none), popular (bool), available (bool)
- image_url, description, rating (decimal), options (jsonb), is_new (bool)
- discount_percent (int, nullable), sort_order (int)

### machines
- id (uuid, PK), name, address, type (enum: coffee/snack/cold)
- status (enum: online/offline), latitude (decimal), longitude (decimal)
- rating (decimal), review_count (int), floor (text, nullable)
- hours (text, default "24/7"), product_count (int)

### promotions
- id (uuid, PK), title, badge, description, promo_code (nullable)
- gradient (text), conditions (jsonb), valid_until (date, nullable)
- is_active (bool), sort_order (int)

### loyalty_tiers
- id (uuid, PK), level (text), emoji (text), discount_percent (int)
- threshold (int), cashback_percent (int), privileges (jsonb), sort_order (int)

### site_content
- id (uuid, PK), section (text), key (text), value (text), updated_at

### cooperation_requests
- id (uuid, PK), model (text), name (text), phone (text)
- comment (text, nullable), created_at (timestamptz)

### partners
- id (uuid, PK), name (text), logo_url (text, nullable), sort_order (int)

## Landing Sections (6)

1. **Home** — Hero + stats + quick actions + popular products + promo banner + why VendHub
2. **Machines** — Yandex Maps + search + filters + machine cards + machine types accordion
3. **Menu** — Category/temperature filters + product grid (25 items)
4. **Benefits** — Tabs: Promotions (4 cards) | Loyalty (tiers, privileges, earn/spend)
5. **Partnership** — 4 models + application form + partner logos
6. **About** — Company description + contacts

## Modals
- **ProductModal** — Photo + name + description + price + rating + options (hot/cold) + ingredients
- **MachineModal** — Name + address + status + rating + product grid + map link

## Admin Panel (8 pages)
1. Dashboard — summary stats
2. Products — CRUD with options editor
3. Machines — CRUD with map coordinates
4. Promotions — CRUD with promo codes
5. Loyalty — 4 tier editor
6. Content — CMS for hero/about/stats texts
7. Cooperation — view/manage partnership requests
8. Partners — manage partner logos

## Design System "Warm Brew"

Colors: cream #FDF8F3, espresso #5D4037, caramel #D4A574, chocolate #2C1810, mint #7CB69D
Typography: Playfair Display (headings), DM Sans (body)
Components: coffee-card, btn-espresso, btn-caramel, pill, price-tag, hover-lift

## Key Business Rules
- No cart (informational site only)
- 25 products (NO Raf Lavanda, NO Spicy Latte)
- 16 real machines from VHM24
- 4 promotions
- Loyalty: Bronze 0%, Silver 3%/100K, Gold 5%/500K, Platinum 10%/1M
- Currency: UZS (format: "20 000 UZS")
- Language: Russian
- All data managed via admin panel

## Seed Data
All 25 products, 16 machines, 4 promotions, 4 loyalty tiers, and site content
will be pre-loaded from the specification.
