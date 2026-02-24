-- ============================================================================
-- VendHub.uz — Supabase database schema
-- ============================================================================
-- 8 tables: products, machines, machine_types, promotions, loyalty_tiers,
--           site_content, cooperation_requests, partners
-- ============================================================================

-- Enable UUID extension (available by default on Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ────────────────────────────────────────────────────────────────────────────
-- 1. PRODUCTS
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  price         INTEGER NOT NULL CHECK (price >= 0),
  category      TEXT NOT NULL CHECK (category IN ('coffee', 'tea', 'other', 'snack')),
  temperature   TEXT NOT NULL CHECK (temperature IN ('hot', 'cold', 'both', 'none')),
  popular       BOOLEAN NOT NULL DEFAULT false,
  available     BOOLEAN NOT NULL DEFAULT true,
  image_url     TEXT,
  description   TEXT,
  rating        NUMERIC(2,1) NOT NULL DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
  options       JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_new        BOOLEAN NOT NULL DEFAULT false,
  discount_percent INTEGER CHECK (discount_percent IS NULL OR (discount_percent >= 0 AND discount_percent <= 100)),
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 2. MACHINES
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS machines (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  address       TEXT NOT NULL,
  type          TEXT NOT NULL DEFAULT 'coffee',
  status        TEXT NOT NULL DEFAULT 'online' CHECK (status IN ('online', 'offline')),
  latitude      NUMERIC(8,4),
  longitude     NUMERIC(8,4),
  rating        NUMERIC(2,1) NOT NULL DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
  review_count  INTEGER NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  floor         TEXT,
  hours         TEXT NOT NULL DEFAULT '24/7',
  product_count INTEGER NOT NULL DEFAULT 0 CHECK (product_count >= 0),
  has_promotion BOOLEAN NOT NULL DEFAULT false,
  location_type TEXT,
  image_url     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 2b. MACHINE TYPES (dynamic, managed via admin panel)
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS machine_types (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  model_name      TEXT,
  description     TEXT DEFAULT '',
  hero_image_url  TEXT,
  specs           JSONB DEFAULT '[]'::jsonb,
  advantages      JSONB DEFAULT '[]'::jsonb,
  gallery_images  JSONB DEFAULT '[]'::jsonb,
  is_active       BOOLEAN DEFAULT true,
  badge           TEXT,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 3. PROMOTIONS
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS promotions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  badge         TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  promo_code    TEXT,
  gradient      TEXT NOT NULL DEFAULT 'from-gray-500 to-gray-600',
  conditions    JSONB NOT NULL DEFAULT '[]'::jsonb,
  valid_until   DATE,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 4. LOYALTY TIERS
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS loyalty_tiers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level            TEXT NOT NULL UNIQUE,
  emoji            TEXT NOT NULL DEFAULT '',
  discount_percent INTEGER NOT NULL DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
  threshold        INTEGER NOT NULL DEFAULT 0 CHECK (threshold >= 0),
  cashback_percent INTEGER NOT NULL DEFAULT 0 CHECK (cashback_percent >= 0 AND cashback_percent <= 100),
  privileges       JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order       INTEGER NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────────────────────
-- 5. SITE CONTENT (key-value store for CMS-like content)
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_content (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section       TEXT NOT NULL,
  key           TEXT NOT NULL,
  value         TEXT NOT NULL DEFAULT '',
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(section, key)
);

-- ────────────────────────────────────────────────────────────────────────────
-- 6. COOPERATION REQUESTS
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cooperation_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model         TEXT NOT NULL CHECK (model IN ('locations', 'suppliers', 'investors', 'franchise')),
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  comment       TEXT,
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'processed')),
  admin_notes   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- 7. PARTNERS
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS partners (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  logo_url      TEXT,
  website_url   TEXT,
  description   TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0
);

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_machines_updated_at
  BEFORE UPDATE ON machines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_machine_types_updated_at
  BEFORE UPDATE ON machine_types
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE products              ENABLE ROW LEVEL SECURITY;
ALTER TABLE machines              ENABLE ROW LEVEL SECURITY;
ALTER TABLE machine_types         ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions            ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_tiers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content          ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperation_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners              ENABLE ROW LEVEL SECURITY;

-- ── Public READ policies ───────────────────────────────────────────────────

-- Anyone can read products
CREATE POLICY "products_public_read"
  ON products FOR SELECT
  USING (true);

-- Anyone can read machines
CREATE POLICY "machines_public_read"
  ON machines FOR SELECT
  USING (true);

-- Anyone can read machine types
CREATE POLICY "machine_types_public_read"
  ON machine_types FOR SELECT
  USING (true);

-- Anyone can read active promotions only
CREATE POLICY "promotions_public_read"
  ON promotions FOR SELECT
  USING (is_active = true);

-- Anyone can read loyalty tiers
CREATE POLICY "loyalty_tiers_public_read"
  ON loyalty_tiers FOR SELECT
  USING (true);

-- Anyone can read site content
CREATE POLICY "site_content_public_read"
  ON site_content FOR SELECT
  USING (true);

-- Anyone can read partners
CREATE POLICY "partners_public_read"
  ON partners FOR SELECT
  USING (true);

-- ── Public INSERT policy for cooperation requests ──────────────────────────

-- Anyone can submit a cooperation request
CREATE POLICY "cooperation_requests_public_insert"
  ON cooperation_requests FOR INSERT
  WITH CHECK (true);

-- ── Authenticated WRITE policies (admin) ───────────────────────────────────

CREATE POLICY "products_auth_write"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "machines_auth_write"
  ON machines FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "promotions_auth_write"
  ON promotions FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "loyalty_tiers_auth_write"
  ON loyalty_tiers FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "site_content_auth_write"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "cooperation_requests_auth_write"
  ON cooperation_requests FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "partners_auth_write"
  ON partners FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "machine_types_auth_write"
  ON machine_types FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_products_category    ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_popular     ON products (popular) WHERE popular = true;
CREATE INDEX IF NOT EXISTS idx_products_available   ON products (available) WHERE available = true;
CREATE INDEX IF NOT EXISTS idx_products_sort_order  ON products (sort_order);

CREATE INDEX IF NOT EXISTS idx_machines_status      ON machines (status);
CREATE INDEX IF NOT EXISTS idx_machines_type        ON machines (type);
CREATE INDEX IF NOT EXISTS idx_machines_location    ON machines (location_type);

CREATE INDEX IF NOT EXISTS idx_machine_types_slug   ON machine_types (slug);
CREATE INDEX IF NOT EXISTS idx_machine_types_active ON machine_types (is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_promotions_active    ON promotions (is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content (section, key);

CREATE INDEX IF NOT EXISTS idx_cooperation_status   ON cooperation_requests (status);
