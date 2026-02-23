# VendHub.uz — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the vendhub.uz informational website with admin panel using Next.js + Supabase

**Architecture:** Next.js 14 App Router single-page landing with 6 scroll sections + modals. Admin panel at /admin/* with Supabase Auth. Supabase PostgreSQL for all data. Tailwind CSS with "Warm Brew" design system. Yandex Maps for machine locations.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3.4, Supabase (PostgreSQL + Auth), Yandex Maps API, pnpm

**Working directory:** `/Users/js/Мой диск/3.VendHub/VHM24/vendhub.uz/vendhub-site/`

**Reference files:**
- Spec: `../Анализ-Сайта/СПЕЦИФИКАЦИЯ-БУДУЩИЙ-САЙТ.md`
- Products: `../memory/PRODUCTS.md`
- Machines: `../memory/MACHINES.md`
- Bonus: `../memory/BONUS-SYSTEM.md`
- Decisions: `../memory/DECISIONS.md`

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `vendhub-site/` (via create-next-app)
- Modify: `vendhub-site/tailwind.config.ts`
- Modify: `vendhub-site/app/globals.css`
- Modify: `vendhub-site/app/layout.tsx`

**Step 1: Create Next.js project**

```bash
cd "/Users/js/Мой диск/3.VendHub/VHM24/vendhub.uz"
pnpm create next-app vendhub-site --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-pnpm
```

**Step 2: Install dependencies**

```bash
cd vendhub-site
pnpm add @supabase/supabase-js @supabase/ssr lucide-react
pnpm add -D @types/node
```

**Step 3: Configure Tailwind with Warm Brew design tokens**

Replace `tailwind.config.ts` with full Warm Brew color palette:
- cream: #FDF8F3, espresso: #5D4037, espresso-light: #795548, espresso-dark: #3E2723
- caramel: #D4A574, caramel-light: #E8C9A8, caramel-dark: #B8834A
- chocolate: #2C1810, mint: #7CB69D, mint-light: #E8F5E9, foam: #F5F0EB
- Fonts: Playfair Display + DM Sans from Google Fonts

**Step 4: Set up root layout with fonts and meta**

Configure `app/layout.tsx`:
- Import Playfair Display + DM Sans from `next/font/google`
- Set metadata: title "VendHub — Кофе из автоматов в пару кликов", description, OG tags
- Set lang="ru"

**Step 5: Set up globals.css with component classes**

Add to `app/globals.css`:
- `.coffee-card` — white bg, rounded-2xl, shadow-md
- `.btn-espresso` — gradient espresso, white text, rounded-xl
- `.btn-caramel` — gradient caramel, white text, rounded-xl
- `.pill` — rounded-full, px-4 py-2, transition
- `.price-tag` — tabular-nums, font-bold, espresso color
- `.hover-lift` — transform translateY(-4px) on hover
- Animations: fadeUp, fadeIn, slideUp, expand, bounceIn + delays .d1-.d6

**Step 6: Commit**

```bash
git add vendhub-site/
git commit -m "feat: scaffold Next.js project with Warm Brew design system"
```

---

## Task 2: Set up Supabase — schema + seed data

**Files:**
- Create: `vendhub-site/lib/supabase.ts`
- Create: `vendhub-site/lib/types.ts`
- Create: `vendhub-site/supabase/schema.sql`
- Create: `vendhub-site/supabase/seed.sql`
- Create: `vendhub-site/.env.local`

**Step 1: Create Supabase project**

Go to supabase.com, create project "vendhub-site", get:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Save to `.env.local` (add to .gitignore)

**Step 2: Write schema.sql**

Create all 7 tables: products, machines, promotions, loyalty_tiers, site_content, cooperation_requests, partners.
Enable Row Level Security (RLS):
- Public read for products, machines, promotions, loyalty_tiers, site_content, partners
- Public insert for cooperation_requests
- Admin-only write for all tables (via auth.uid() check)

**Step 3: Write seed.sql**

Insert all data from specification:
- 25 products (with options as JSONB)
- 16 machines (with addresses, geocoded coordinates)
- 4 promotions (with conditions, promo codes)
- 4 loyalty tiers (with privileges as JSONB)
- Site content (hero texts, about texts, stats)
- 5 partners (Респ. кардиологии, American Hospital, KIUT, IT Park, Grand Medical)

**Step 4: Create TypeScript types**

`lib/types.ts` — interfaces for all tables (Product, Machine, Promotion, LoyaltyTier, SiteContent, CooperationRequest, Partner)

**Step 5: Create Supabase client**

`lib/supabase.ts`:
- `createClient()` for server components
- `createBrowserClient()` for client components

**Step 6: Run schema + seed on Supabase**

Execute schema.sql then seed.sql via Supabase SQL editor.

**Step 7: Commit**

```bash
git add vendhub-site/lib/ vendhub-site/supabase/
git commit -m "feat: Supabase schema, seed data, and TypeScript types"
```

---

## Task 3: Build UI components library

**Files:**
- Create: `vendhub-site/components/ui/Button.tsx`
- Create: `vendhub-site/components/ui/Card.tsx`
- Create: `vendhub-site/components/ui/Pill.tsx`
- Create: `vendhub-site/components/ui/Modal.tsx`
- Create: `vendhub-site/components/ui/Badge.tsx`
- Create: `vendhub-site/components/ui/PriceTag.tsx`
- Create: `vendhub-site/components/ui/SectionHeader.tsx`
- Create: `vendhub-site/components/ui/Toast.tsx`

**Step 1: Create Button component**

Two variants: `btn-espresso` (secondary) and `btn-caramel` (primary CTA).
Props: variant, size, icon, onClick, href, disabled, className.

**Step 2: Create Card component**

`.coffee-card` base. Props: className, hover (hover-lift), onClick, children.

**Step 3: Create Pill component**

Filter pill with active/inactive states. Props: active, onClick, icon, count, label.

**Step 4: Create Modal component**

Overlay bg-black/50, slideUp animation, close on overlay click, close on Escape.
Props: isOpen, onClose, children, className.

**Step 5: Create Badge, PriceTag, SectionHeader, Toast**

- Badge: colored label (Акция, Популярное, NEW, Нет в наличии)
- PriceTag: formatted UZS price with optional strikethrough
- SectionHeader: title (Playfair) + subtitle (DM Sans)
- Toast: bounceIn notification for copied promo code, sent form

**Step 6: Commit**

```bash
git add vendhub-site/components/ui/
git commit -m "feat: UI component library (Warm Brew design system)"
```

---

## Task 4: Header + Footer

**Files:**
- Create: `vendhub-site/components/sections/Header.tsx`
- Create: `vendhub-site/components/sections/Footer.tsx`
- Modify: `vendhub-site/app/page.tsx`

**Step 1: Build Header**

Fixed top, bg-espresso-dark. Scroll effect: transparent → bg-espresso-dark/95 + backdrop-blur.
Logo (VendHub + Coffee & Snacks), 6 nav items with smooth scroll, active state tracking.
"Войти" button (btn-caramel) → placeholder toast "Скоро".
Mobile burger menu (lg breakpoint), fadeIn dropdown, auto-close on nav click.

**Step 2: Build Footer**

bg-espresso-dark, 3-column layout (brand + nav + contacts+socials).
All contacts clickable (tel:, mailto:, t.me/).
Bottom bar: © VendHub 2026. Политика конфиденциальности | Условия использования.

**Step 3: Wire up in page.tsx**

Import Header + Footer, render skeleton page with section IDs.

**Step 4: Commit**

```bash
git add vendhub-site/components/sections/Header.tsx vendhub-site/components/sections/Footer.tsx vendhub-site/app/page.tsx
git commit -m "feat: Header with mobile menu + Footer"
```

---

## Task 5: Home section (Hero + Stats + Quick Actions + Popular + Promo + Why)

**Files:**
- Create: `vendhub-site/components/sections/HeroSection.tsx`
- Create: `vendhub-site/components/sections/StatsSection.tsx`
- Create: `vendhub-site/components/sections/QuickActions.tsx`
- Create: `vendhub-site/components/sections/PopularProducts.tsx`
- Create: `vendhub-site/components/sections/PromoBanner.tsx`
- Create: `vendhub-site/components/sections/WhyVendHub.tsx`
- Modify: `vendhub-site/app/page.tsx`

**Step 1: Build HeroSection**

Gradient bg (espresso-dark → espresso → espresso-light), SVG pattern overlay.
Dynamic greeting by time of day (06-11: Доброе утро, 12-17: Добрый день, 18-05: Добрый вечер).
Title: "Кофе из автоматов в пару кликов" (Playfair Display).
Subtitle with dynamic numbers from Supabase site_content.
2 CTA buttons: "Найти автомат" → #map, "Смотреть меню" → #menu.
Machine photo on desktop (hidden lg:block).

**Step 2: Build StatsSection**

4 cards (-mt-8 overlapping hero): 16 автоматов, 25+ напитков, 10K+ заказов, 4.8 рейтинг.
Data from Supabase site_content. fadeUp animation with delays.

**Step 3: Build QuickActions**

2-column grid: "Каталог" → #menu, "Автоматы" → #map. Icon in circle + title + description.

**Step 4: Build PopularProducts**

Fetch top 4 popular products from Supabase. 4-column grid.
Card: photo/emoji + rating + name + price. Click → open ProductModal.

**Step 5: Build PromoBanner**

Gradient caramel → caramel-dark. Badge "Акция". First active promotion from Supabase.
CTA "Подробнее" → #benefits.

**Step 6: Build WhyVendHub**

4-column grid: 25+ напитков, 16 автоматов, Программа лояльности, Быстрый заказ.
Each with emoji, title, description.

**Step 7: Wire all into page.tsx**

**Step 8: Commit**

```bash
git add vendhub-site/components/sections/ vendhub-site/app/page.tsx
git commit -m "feat: Home section (hero, stats, popular products, promo)"
```

---

## Task 6: Machines section (Map + Search + Filters + Cards + Types)

**Files:**
- Create: `vendhub-site/components/sections/MachinesSection.tsx`
- Create: `vendhub-site/components/machines/YandexMap.tsx`
- Create: `vendhub-site/components/machines/MachineCard.tsx`
- Create: `vendhub-site/components/machines/MachineTypes.tsx`
- Create: `vendhub-site/components/machines/MachineFilters.tsx`

**Step 1: Build MachinesSection shell**

Title "Наши автоматы" + dynamic count "X из Y работают".
Tab switcher: Карта | Типы автоматов (pill style).

**Step 2: Build YandexMap component**

Load Yandex Maps API via script tag. Render map centered on Tashkent (41.311, 69.280).
16 markers from Supabase machines table. Online markers: dark, offline: transparent.
Clusterer for close points (KIUT 4, Кардиология 3, Parus 2).
Click marker → tooltip with name + status.

**Step 3: Build MachineFilters**

Search input with debounce. Status pills: Все (16) | Работают (14) | С акцией (4).
Type pills: Кофе Автомат (16) | Снэк Автомат (0) | Холодные (0).

**Step 4: Build MachineCard**

Name + badge "Акция" + address + rating + reviews + distance (optional) + product count + status + hours. Click "Подробнее" → MachineModal.

**Step 5: Build MachineTypes accordion**

3 types: Кофе Автомат (active, specs from spec), Снэк Автомат (скоро), Холодные (скоро).
Expand animation.

**Step 6: Wire into page.tsx + Commit**

```bash
git commit -m "feat: Machines section with Yandex Maps and filters"
```

---

## Task 7: Menu section (Filters + Product Grid)

**Files:**
- Create: `vendhub-site/components/sections/MenuSection.tsx`
- Create: `vendhub-site/components/menu/ProductCard.tsx`
- Create: `vendhub-site/components/menu/MenuFilters.tsx`

**Step 1: Build MenuSection**

Title "Наше меню" + dynamic count with filter info.
Fetch all 25 products from Supabase.

**Step 2: Build MenuFilters**

Category pills (5): Все, Кофе, Чай, Другое, Снэки — with counts.
Temperature pills (3): Все, Горячие, Холодные — with gradient styles.
Combined filtering logic.

**Step 3: Build ProductCard**

Photo (or gradient+emoji fallback), temperature badge, rating, name, description (truncate), price (with discount if any), "Подробнее" button. Grayscale if unavailable.
Badges: discount %, "Нет в наличии", "NEW".

**Step 4: Empty state**

"Ничего не найдено" + "Сбросить фильтры" button.

**Step 5: Wire + Commit**

```bash
git commit -m "feat: Menu section with category and temperature filters"
```

---

## Task 8: Modals (ProductModal + MachineModal)

**Files:**
- Create: `vendhub-site/components/modals/ProductModal.tsx`
- Create: `vendhub-site/components/modals/MachineModal.tsx`
- Create: `vendhub-site/lib/modal-context.tsx`

**Step 1: Create modal context**

React context for managing which modal is open and with what data.
`useModal()` hook returning openProductModal(product), openMachineModal(machine), closeModal.

**Step 2: Build ProductModal**

Photo (aspect 4:3) + close button. Name (Playfair, uppercase) + description + price + rating.
Stats row: volume, calories, caffeine. Options grid: hot (orange) / cold (blue) columns.
Ingredient pills. CTA: "Подробнее в приложении · {price}".

**Step 3: Build MachineModal**

Name + address + floor. Status + hours + rating. Product grid for this machine.
"Показать на карте" (external Yandex Maps link) + "Заказать в приложении" CTA.

**Step 4: Commit**

```bash
git commit -m "feat: Product and Machine modals with options"
```

---

## Task 9: Benefits section (Promotions + Loyalty tabs)

**Files:**
- Create: `vendhub-site/components/sections/BenefitsSection.tsx`
- Create: `vendhub-site/components/benefits/PromotionsTab.tsx`
- Create: `vendhub-site/components/benefits/LoyaltyTab.tsx`

**Step 1: Build BenefitsSection shell**

Title "Выгода" + subtitle. Tab switcher: Акции | Бонусы.

**Step 2: Build PromotionsTab**

4 promo cards (2-col grid) from Supabase. Each: gradient top + badge + title + description + promo code (copy to clipboard) + valid_until + expandable conditions.
Promo code system info block at bottom.
Toast on copy: "Скопировано!"

**Step 3: Build LoyaltyTab**

Overview: "1 балл = 1 UZS • 7 механик • 10 способов".
Tier cards (4): Bronze/Silver/Gold/Platinum with emoji, discount, threshold.
Visual progress bar.
Privileges table (8 rows × 4 columns).
"Как заработать баллы" grid (9 ways, 3-col).
"Как тратить баллы" info block.
CTA: "Зарегистрируйтесь и получите 15 000 бонусов!"

**Step 4: Commit**

```bash
git commit -m "feat: Benefits section (promotions with promo codes + loyalty program)"
```

---

## Task 10: Partnership section (Models + Form + Partners)

**Files:**
- Create: `vendhub-site/components/sections/PartnerSection.tsx`
- Create: `vendhub-site/components/partner/PartnerForm.tsx`

**Step 1: Build PartnerSection**

Title + 4 model cards (2-col grid) with expandable descriptions.
4 models: Локациям, Поставщикам, Инвесторам, Франшиза — each with color accent.

**Step 2: Build PartnerForm**

Form fields: model (select), name (required), phone (+998 mask, required), comment (optional).
Submit → insert to Supabase cooperation_requests.
Success toast: "Заявка отправлена!"
Validation: name required, phone format.

**Step 3: Partners logos section**

"Нам доверяют" + flex-wrap list of partner names from Supabase.

**Step 4: Commit**

```bash
git commit -m "feat: Partnership section with form submission to Supabase"
```

---

## Task 11: About section + Contacts

**Files:**
- Create: `vendhub-site/components/sections/AboutSection.tsx`

**Step 1: Build AboutSection**

Company description from Supabase site_content.
Contacts: address, phone (tel:), email (mailto:), Telegram (t.me/), support 24/7.
All contacts clickable.

**Step 2: Commit**

```bash
git commit -m "feat: About section with contacts"
```

---

## Task 12: Admin Panel — Layout + Auth + Dashboard

**Files:**
- Create: `vendhub-site/app/admin/layout.tsx`
- Create: `vendhub-site/app/admin/page.tsx`
- Create: `vendhub-site/app/admin/login/page.tsx`
- Create: `vendhub-site/components/admin/AdminSidebar.tsx`
- Create: `vendhub-site/components/admin/AdminHeader.tsx`
- Create: `vendhub-site/lib/admin-auth.ts`

**Step 1: Set up Supabase Auth**

Create admin user in Supabase Auth (email/password).
`lib/admin-auth.ts`: middleware to check auth on all /admin/* routes (except /admin/login).

**Step 2: Build admin login page**

Email + password form. Submit → Supabase signInWithPassword.
Redirect to /admin on success.

**Step 3: Build admin layout**

Sidebar navigation (8 items) + header (user email + logout button).
Responsive: sidebar collapses on mobile.

**Step 4: Build dashboard**

4 stat cards: products count, machines count, cooperation requests count, active promotions.
Quick links to each section.

**Step 5: Commit**

```bash
git commit -m "feat: Admin panel layout, auth, and dashboard"
```

---

## Task 13: Admin — Products CRUD

**Files:**
- Create: `vendhub-site/app/admin/products/page.tsx`
- Create: `vendhub-site/components/admin/ProductForm.tsx`
- Create: `vendhub-site/components/admin/ProductTable.tsx`

**Step 1: Build product list page**

Table with all 25 products: name, category, price, popular, available, actions.
Sort, search, filter by category.

**Step 2: Build product form**

Modal or inline form: name, price, category (select), temperature, popular (toggle), available (toggle), image_url, description, rating, is_new, discount_percent.
Options editor: add/remove hot/cold options with name and price.

**Step 3: CRUD operations**

Create, read, update, delete via Supabase client.
Optimistic UI updates.

**Step 4: Commit**

```bash
git commit -m "feat: Admin products CRUD with options editor"
```

---

## Task 14: Admin — Machines CRUD

**Files:**
- Create: `vendhub-site/app/admin/machines/page.tsx`
- Create: `vendhub-site/components/admin/MachineForm.tsx`

**Step 1: Build machine list + form**

Table: name, address, status, type, rating, actions.
Form: name, address, type, status (toggle), latitude, longitude, rating, review_count, floor, hours, product_count.

**Step 2: Commit**

```bash
git commit -m "feat: Admin machines CRUD"
```

---

## Task 15: Admin — Promotions + Loyalty + Content + Cooperation + Partners

**Files:**
- Create: `vendhub-site/app/admin/promotions/page.tsx`
- Create: `vendhub-site/app/admin/loyalty/page.tsx`
- Create: `vendhub-site/app/admin/content/page.tsx`
- Create: `vendhub-site/app/admin/cooperation/page.tsx`
- Create: `vendhub-site/app/admin/partners/page.tsx`

**Step 1: Promotions CRUD**

Table + form: title, badge, description, promo_code, gradient, conditions (JSON editor), valid_until, is_active.

**Step 2: Loyalty tiers editor**

4-row editor: level, emoji, discount_percent, threshold, cashback_percent, privileges (JSON).

**Step 3: Content CMS**

Key-value editor for site_content table. Sections: hero, stats, about, footer.

**Step 4: Cooperation requests**

Read-only list of partnership requests. Filter by model, date. Mark as read/processed.

**Step 5: Partners management**

Simple CRUD: name, logo_url, sort_order.

**Step 6: Commit**

```bash
git commit -m "feat: Admin promotions, loyalty, content CMS, cooperation, partners"
```

---

## Task 16: Polish + Responsive + Animations + SEO

**Files:**
- Modify: various components
- Create: `vendhub-site/app/sitemap.ts`
- Create: `vendhub-site/app/robots.ts`

**Step 1: Responsive testing**

Verify all sections render correctly on: mobile (375px), tablet (768px), desktop (1280px+).
Fix any layout issues.

**Step 2: Animations**

Add Intersection Observer for fadeUp animations on sections.
Verify all hover-lift, expand, slideUp animations work smoothly.

**Step 3: SEO**

sitemap.ts, robots.ts, proper meta tags, OG image.
Structured data (JSON-LD) for local business.

**Step 4: Performance**

Optimize images (next/image), lazy load below-fold sections.
Verify Lighthouse score > 90.

**Step 5: Final commit**

```bash
git commit -m "feat: Polish, responsive design, animations, SEO"
```

---

## Task 17: Environment setup + Deploy instructions

**Files:**
- Create: `vendhub-site/README.md`
- Create: `vendhub-site/.env.example`

**Step 1: Create .env.example**

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=your-yandex-maps-key
```

**Step 2: README with setup instructions**

1. Clone repo
2. `pnpm install`
3. Copy .env.example → .env.local, fill values
4. Run Supabase schema.sql + seed.sql
5. `pnpm dev`
6. Create admin user in Supabase Auth
7. Login at /admin/login

**Step 3: Commit**

```bash
git commit -m "docs: setup instructions and environment configuration"
```
