-- ============================================================================
-- Migration 002: Partnership admin improvements
-- Run in Supabase SQL Editor on the live database
-- ============================================================================

-- 1. Add admin_notes to cooperation_requests
ALTER TABLE cooperation_requests ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- 2. Add website_url and description to partners
ALTER TABLE partners ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS description TEXT;

-- 3. Seed partnership CMS data into site_content
INSERT INTO site_content (id, section, key, value) VALUES
(gen_random_uuid(), 'partnership', 'locations_title', 'Локациям'),
(gen_random_uuid(), 'partnership', 'locations_description', 'У вас есть помещение с трафиком? Мы установим автомат бесплатно, вы получаете процент с продаж.'),
(gen_random_uuid(), 'partnership', 'locations_benefits', '["Бесплатная установка и обслуживание","Ежемесячные выплаты от продаж","Привлечение посетителей","Нет минимальных требований по площади"]'),
(gen_random_uuid(), 'partnership', 'suppliers_title', 'Поставщикам'),
(gen_random_uuid(), 'partnership', 'suppliers_description', 'Поставляете кофе, снеки или расходники? Станьте нашим партнёром-поставщиком.'),
(gen_random_uuid(), 'partnership', 'suppliers_benefits', '["Стабильные закупки","Долгосрочные контракты","Оплата в срок","Расширение географии поставок"]'),
(gen_random_uuid(), 'partnership', 'investors_title', 'Инвесторам'),
(gen_random_uuid(), 'partnership', 'investors_description', 'Стабильный доход от сети автоматов. Окупаемость от 12 месяцев.'),
(gen_random_uuid(), 'partnership', 'investors_benefits', '["ROI от 12 месяцев","Прозрачная отчётность","Пассивный доход","Масштабируемая модель"]'),
(gen_random_uuid(), 'partnership', 'franchise_title', 'Франшиза'),
(gen_random_uuid(), 'partnership', 'franchise_description', 'Запустите VendHub в своём городе. Полная поддержка и обучение.'),
(gen_random_uuid(), 'partnership', 'franchise_benefits', '["Готовая бизнес-модель","Обучение и поддержка","Маркетинговые материалы","Техническая инфраструктура"]')
ON CONFLICT (section, key) DO NOTHING;
