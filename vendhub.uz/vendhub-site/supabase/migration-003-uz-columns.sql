-- ============================================================================
-- Migration 003: Add _uz columns for Uzbek translations
-- Run against Supabase SQL Editor
-- ============================================================================

-- ─── PRODUCTS ────────────────────────────────────────────────────────────────

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS name_uz TEXT,
  ADD COLUMN IF NOT EXISTS description_uz TEXT;

-- Populate Uzbek translations for existing products
-- International names (Espresso, Americano, etc.) stay the same
-- Russian names get Uzbek translations

UPDATE products SET name_uz = 'Espresso', description_uz = 'Klassik kuchli espresso' WHERE name = 'Espresso';
UPDATE products SET name_uz = 'Americano', description_uz = 'Issiq suv bilan espresso' WHERE name = 'Americano';
UPDATE products SET name_uz = 'Cappuccino', description_uz = 'Sutli ko''pik bilan espresso' WHERE name = 'Cappuccino';
UPDATE products SET name_uz = 'Latte', description_uz = 'Ko''p sut bilan espresso' WHERE name = 'Latte';
UPDATE products SET name_uz = 'Flat White', description_uz = 'Ikki espresso baxmal sut bilan' WHERE name = 'Flat White';
UPDATE products SET name_uz = 'MacCoffee 3-in-1', description_uz = 'Tez tayyorlanadigan kofe 3-in-1' WHERE name = 'MacCoffee 3-in-1';
UPDATE products SET name_uz = 'Ice Latte', description_uz = 'Muzli sovuq latte' WHERE name = 'Ice Latte';
UPDATE products SET name_uz = 'Ice Americano', description_uz = 'Muzli sovuq amerikano' WHERE name = 'Ice Americano';
UPDATE products SET name_uz = 'Limonli choy', description_uz = 'Limonli qora choy' WHERE name = 'Чай с лимоном';
UPDATE products SET name_uz = 'Mevali choy', description_uz = 'Xushbo''y mevali choy' WHERE name = 'Чай фруктовый';
UPDATE products SET name_uz = 'Matcha Latte', description_uz = 'Sutli yapon matcha choyi' WHERE name = 'Matcha Latte';
UPDATE products SET name_uz = 'Kakao', description_uz = 'Sutli issiq kakao' WHERE name = 'Какао';
UPDATE products SET name_uz = 'Muz', description_uz = 'Bir porsiya muz' WHERE name = 'Лёд';
UPDATE products SET name_uz = 'Suv', description_uz = 'Ichimlik suvi' WHERE name = 'Вода';
UPDATE products SET name_uz = 'Kola', description_uz = 'Gazlangan ichimlik' WHERE name = 'Кола';
UPDATE products SET name_uz = 'Apelsin sharbati', description_uz = 'Apelsin sharbati' WHERE name = 'Сок апельсин';
UPDATE products SET name_uz = 'Shokolad batoncik', description_uz = 'Shokolad batoncik' WHERE name = 'Шоколадный батончик';
UPDATE products SET name_uz = 'Chips', description_uz = 'Kartoshka chipslari' WHERE name = 'Чипсы';
UPDATE products SET name_uz = 'Kruassan', description_uz = 'Yangi kruassan' WHERE name = 'Круассан';
UPDATE products SET name_uz = 'Frappe', description_uz = 'Sovuq ko''pikli kofe ichimligi' WHERE name = 'Frappe';


-- ─── PROMOTIONS ──────────────────────────────────────────────────────────────

ALTER TABLE promotions
  ADD COLUMN IF NOT EXISTS title_uz TEXT,
  ADD COLUMN IF NOT EXISTS badge_uz TEXT,
  ADD COLUMN IF NOT EXISTS description_uz TEXT,
  ADD COLUMN IF NOT EXISTS conditions_uz JSONB,
  ADD COLUMN IF NOT EXISTS action_instruction_uz TEXT;

-- Populate Uzbek translations for promotions
UPDATE promotions SET
  title_uz = 'Butun menyuga 20% chegirma',
  badge_uz = 'Mashhur',
  description_uz = 'COFFEE20 promokodidan foydalaning va istalgan ichimlikka 20% chegirma oling',
  conditions_uz = '["Barcha ichimliklar","Boshqa chegirmalar bilan qo''shilmaydi","Har bir foydalanuvchi uchun bir marta"]'::jsonb
WHERE title = 'Скидка 20% на всё меню';

UPDATE promotions SET
  title_uz = 'Kombo: Kapuchino + Kruassan',
  badge_uz = 'Foydali',
  description_uz = '45 000 → 30 000 UZS',
  conditions_uz = '["Kapuchino 300ml + Kruassan","Barcha avtomatlarda"]'::jsonb
WHERE title = 'Комбо: Капучино + Круассан';

UPDATE promotions SET
  title_uz = 'Happy Hour: -30%',
  badge_uz = 'Har kuni',
  description_uz = 'Har kuni soat 14:00 dan 16:00 gacha sovuq ichimliklarga 30% chegirma',
  conditions_uz = '["Faqat sovuq ichimliklar","14:00–16:00","Barcha avtomatlarda"]'::jsonb
WHERE title = 'Happy Hour: -30%';

UPDATE promotions SET
  title_uz = 'Birinchi buyurtma uchun x2 bonus',
  badge_uz = 'Yangilar uchun',
  description_uz = 'WELCOME promokodi bilan birinchi 3 ta buyurtma uchun ikki baravar bonus oling',
  conditions_uz = '["Yangi foydalanuvchilar","Birinchi 3 ta buyurtma"]'::jsonb
WHERE title = 'x2 бонусов за первый заказ';


-- ─── MACHINES ────────────────────────────────────────────────────────────────

ALTER TABLE machines
  ADD COLUMN IF NOT EXISTS address_uz TEXT;

-- Populate Uzbek translations for machine addresses
UPDATE machines SET address_uz = 'Sagbon 12-chi o''tish 2-chi ko''cha, 1/1' WHERE name = 'SOLIQ OLMAZOR';
UPDATE machines SET address_uz = 'Shahrisabz ko''chasi, 85' WHERE name = 'Soliq Yashnobod';
UPDATE machines SET address_uz = 'Yunusobod 19-kvartal' WHERE name = 'ZIYO market';
UPDATE machines SET address_uz = 'Osiyo ko''chasi' WHERE name = 'КПП Кардиология';
UPDATE machines SET address_uz = 'Osiyo ko''chasi, 4-bino 2-korpus' WHERE name = '2 корпус Кардиология';
UPDATE machines SET address_uz = 'Osiyo ko''chasi, 4-bino 4-korpus' WHERE name = '4 корпус Кардиология';
UPDATE machines SET address_uz = 'Iqbol, 14' WHERE name = 'American Hospital';
UPDATE machines SET address_uz = 'Asalobod-2 turar-joy majmuasi, 19' WHERE name = 'DUNYO Supermarket';
UPDATE machines SET address_uz = 'Tiklanish, 1a' WHERE name = 'Grand Clinic';
UPDATE machines SET address_uz = 'Shota Rustaveli ko''chasi, 156' WHERE name = 'KIMYO';
UPDATE machines SET address_uz = 'Bunyodkor prospekti, 19' WHERE name = 'KIUT CLINIC';
UPDATE machines SET address_uz = 'Bunyodkor prospekti, 19' WHERE name = 'KIUT M corp';
UPDATE machines SET address_uz = 'Yakkabog mahallasi' WHERE name = 'KIUT Библиотека';
UPDATE machines SET address_uz = 'Yakkabog mahallasi' WHERE name = 'KIUT Общежитие';
UPDATE machines SET address_uz = 'Qatartal, 60a/1' WHERE name = 'Parus F1';
UPDATE machines SET address_uz = 'Qatartal, 60a/1' WHERE name = 'Parus F4';


-- ─── SITE_CONTENT ────────────────────────────────────────────────────────────

ALTER TABLE site_content
  ADD COLUMN IF NOT EXISTS value_uz TEXT;

-- Populate Uzbek translations for site content
UPDATE site_content SET value_uz = 'Avtomatlardan kofe bir necha bosishda' WHERE section = 'hero' AND key = 'title';
UPDATE site_content SET value_uz = '25+ turdagi ichimliklar. Toshkentdagi kasalxonalar, universitetlar va jamoat joylarida 16 ta avtomat.' WHERE section = 'hero' AND key = 'subtitle';
UPDATE site_content SET value_uz = '☀️ Xayrli tong!' WHERE section = 'hero' AND key = 'greeting_morning';
UPDATE site_content SET value_uz = '🌤️ Xayrli kun!' WHERE section = 'hero' AND key = 'greeting_afternoon';
UPDATE site_content SET value_uz = '🌙 Xayrli kech!' WHERE section = 'hero' AND key = 'greeting_evening';
-- Stats values are numbers — no translation needed
UPDATE site_content SET value_uz = '16' WHERE section = 'stats' AND key = 'machines_count';
UPDATE site_content SET value_uz = '25+' WHERE section = 'stats' AND key = 'drinks_count';
UPDATE site_content SET value_uz = '10K+' WHERE section = 'stats' AND key = 'orders_count';
UPDATE site_content SET value_uz = '4.8' WHERE section = 'stats' AND key = 'rating';
