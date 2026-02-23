-- Admin RLS Policies for VendHub.uz
-- Run this in Supabase SQL Editor to enable authenticated users to manage data.
-- These policies allow any authenticated user full CRUD access to admin-managed tables.

-- Products
CREATE POLICY "Authenticated users can manage products"
    ON products FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Machines
CREATE POLICY "Authenticated users can manage machines"
    ON machines FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Promotions
CREATE POLICY "Authenticated users can manage promotions"
    ON promotions FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Loyalty Tiers
CREATE POLICY "Authenticated users can manage loyalty_tiers"
    ON loyalty_tiers FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Site Content
CREATE POLICY "Authenticated users can manage site_content"
    ON site_content FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Cooperation Requests
CREATE POLICY "Authenticated users can manage cooperation_requests"
    ON cooperation_requests FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Partners
CREATE POLICY "Authenticated users can manage partners"
    ON partners FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
