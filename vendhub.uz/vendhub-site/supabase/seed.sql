-- ============================================================================
-- VendHub.uz — Seed data
-- Matches lib/data.ts exactly.
-- Run AFTER schema.sql.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- PRODUCTS (20)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO products (id, name, price, category, temperature, popular, available, image_url, description, rating, options, is_new, discount_percent, sort_order) VALUES

-- Coffee (8)
(gen_random_uuid(), 'Espresso', 20000, 'coffee', 'hot', true, true, NULL, 'Классический крепкий эспрессо', 4.8,
 '[{"name":"С сахаром","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"hot"}]'::jsonb,
 false, NULL, 1),

(gen_random_uuid(), 'Americano', 20000, 'coffee', 'both', true, true, NULL, 'Эспрессо с горячей водой', 4.7,
 '[{"name":"С сахаром","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"hot"},{"name":"Ванильный","price":20000,"temperature":"hot"},{"name":"Карамельный","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"cold"},{"name":"Ванильный","price":20000,"temperature":"cold"},{"name":"Карамельный","price":20000,"temperature":"cold"}]'::jsonb,
 false, NULL, 2),

(gen_random_uuid(), 'Cappuccino', 20000, 'coffee', 'both', true, true, NULL, 'Эспрессо с молочной пенкой', 4.9,
 '[{"name":"С сахаром","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"hot"},{"name":"Ванильный","price":20000,"temperature":"hot"},{"name":"Карамельный","price":20000,"temperature":"hot"},{"name":"Кокосовый","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"cold"},{"name":"Ванильный","price":20000,"temperature":"cold"},{"name":"Карамельный","price":20000,"temperature":"cold"},{"name":"Кокосовый","price":20000,"temperature":"cold"}]'::jsonb,
 false, NULL, 3),

(gen_random_uuid(), 'Latte', 20000, 'coffee', 'both', true, true, NULL, 'Эспрессо с большим количеством молока', 4.8,
 '[{"name":"С сахаром","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"hot"},{"name":"Ванильный","price":20000,"temperature":"hot"},{"name":"Карамельный","price":20000,"temperature":"hot"},{"name":"Кокосовый","price":20000,"temperature":"hot"},{"name":"Без сахара","price":20000,"temperature":"cold"},{"name":"Ванильный","price":20000,"temperature":"cold"},{"name":"Карамельный","price":20000,"temperature":"cold"},{"name":"Кокосовый","price":20000,"temperature":"cold"}]'::jsonb,
 false, NULL, 4),

(gen_random_uuid(), 'Flat White', 25000, 'coffee', 'hot', false, true, NULL, 'Двойной эспрессо с бархатистым молоком', 4.7,
 '[{"name":"Flat White","price":25000,"temperature":"hot"}]'::jsonb,
 false, NULL, 5),

(gen_random_uuid(), 'MacCoffee 3-in-1', 10000, 'coffee', 'hot', false, true, NULL, 'Растворимый кофе 3-в-1', 4.2,
 '[{"name":"MacCoffee 3-in-1","price":10000,"temperature":"hot"}]'::jsonb,
 false, NULL, 6),

(gen_random_uuid(), 'Ice Latte', 20000, 'coffee', 'cold', true, true, NULL, 'Холодный латте со льдом', 4.8,
 '[{"name":"Без сахара","price":20000,"temperature":"cold"},{"name":"Ванильный","price":20000,"temperature":"cold"},{"name":"Карамельный","price":20000,"temperature":"cold"},{"name":"Кокосовый","price":20000,"temperature":"cold"}]'::jsonb,
 false, NULL, 7),

(gen_random_uuid(), 'Ice Americano', 20000, 'coffee', 'cold', false, true, NULL, 'Холодный американо со льдом', 4.6,
 '[{"name":"Без сахара","price":20000,"temperature":"cold"},{"name":"Ванильный","price":20000,"temperature":"cold"},{"name":"Карамельный","price":20000,"temperature":"cold"}]'::jsonb,
 false, NULL, 8),

-- Tea (3)
(gen_random_uuid(), 'Чай с лимоном', 10000, 'tea', 'hot', false, true, NULL, 'Чёрный чай с лимоном', 4.5,
 '[{"name":"Чай с лимоном","price":10000,"temperature":"hot"}]'::jsonb,
 false, NULL, 9),

(gen_random_uuid(), 'Чай фруктовый', 15000, 'tea', 'hot', false, true, NULL, 'Ароматный фруктовый чай', 4.4,
 '[{"name":"Чай фруктовый","price":15000,"temperature":"hot"}]'::jsonb,
 false, NULL, 10),

(gen_random_uuid(), 'Matcha Latte', 30000, 'tea', 'both', false, true, NULL, 'Японский чай матча с молоком', 4.6,
 '[{"name":"Matcha Latte","price":30000,"temperature":"hot"}]'::jsonb,
 true, NULL, 11),

-- Other (2)
(gen_random_uuid(), 'Какао', 15000, 'other', 'hot', false, true, NULL, 'Горячее какао с молоком', 4.5,
 '[{"name":"Какао","price":15000,"temperature":"hot"}]'::jsonb,
 false, NULL, 12),

(gen_random_uuid(), 'Лёд', 10000, 'other', 'cold', false, true, NULL, 'Порция льда', 4.0,
 '[{"name":"Лёд","price":10000,"temperature":"cold"}]'::jsonb,
 false, NULL, 13),

-- Snacks (6)
(gen_random_uuid(), 'Вода', 5000, 'snack', 'cold', false, false, NULL, 'Питьевая вода', 4.3,
 '[{"name":"Вода","price":5000,"temperature":"cold"}]'::jsonb,
 false, NULL, 14),

(gen_random_uuid(), 'Кола', 8000, 'snack', 'cold', false, false, NULL, 'Газированный напиток', 4.4,
 '[{"name":"Кола","price":8000,"temperature":"cold"}]'::jsonb,
 false, NULL, 15),

(gen_random_uuid(), 'Сок апельсин', 10000, 'snack', 'cold', false, false, NULL, 'Апельсиновый сок', 4.5,
 '[{"name":"Сок апельсин","price":10000,"temperature":"cold"}]'::jsonb,
 false, NULL, 16),

(gen_random_uuid(), 'Шоколадный батончик', 7000, 'snack', 'none', false, false, NULL, 'Шоколадный батончик', 4.3,
 '[{"name":"Шоколадный батончик","price":7000,"temperature":"cold"}]'::jsonb,
 false, NULL, 17),

(gen_random_uuid(), 'Чипсы', 8000, 'snack', 'none', false, false, NULL, 'Картофельные чипсы', 4.2,
 '[{"name":"Чипсы","price":8000,"temperature":"cold"}]'::jsonb,
 false, NULL, 18),

(gen_random_uuid(), 'Круассан', 12000, 'snack', 'none', true, false, NULL, 'Свежий круассан', 4.6,
 '[{"name":"Круассан","price":12000,"temperature":"cold"}]'::jsonb,
 false, NULL, 19),

-- Unavailable (1)
(gen_random_uuid(), 'Frappe', 26000, 'coffee', 'cold', false, false, NULL, 'Холодный кофейный напиток с пенкой', 4.5,
 '[{"name":"Frappe","price":26000,"temperature":"cold"}]'::jsonb,
 false, NULL, 20);


-- ────────────────────────────────────────────────────────────────────────────
-- MACHINES (16)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO machines (id, name, address, type, status, latitude, longitude, rating, review_count, floor, hours, product_count, has_promotion, location_type, image_url) VALUES

(gen_random_uuid(), 'SOLIQ OLMAZOR', 'Сагбон 12-й проезд 2-й тупик, 1/1', 'coffee', 'online', 41.3289, 69.2197, 4.8, 42, NULL, '24/7', 14, true, 'government', NULL),
(gen_random_uuid(), 'Soliq Yashnobod', 'Шахрисабзская улица, 85', 'coffee', 'online', 41.2966, 69.2658, 4.7, 38, NULL, '24/7', 14, true, 'government', NULL),
(gen_random_uuid(), 'ZIYO market', 'Юнусабад 19-й квартал', 'coffee', 'online', 41.3547, 69.2856, 4.6, 55, NULL, '24/7', 15, false, 'market', NULL),
(gen_random_uuid(), 'КПП Кардиология', 'Осиё улица', 'coffee', 'online', 41.3367, 69.3345, 4.9, 67, NULL, '24/7', 14, true, 'hospital', NULL),
(gen_random_uuid(), '2 корпус Кардиология', 'Осиё улица, 4к2', 'coffee', 'online', 41.3370, 69.3348, 4.8, 45, NULL, '24/7', 13, false, 'hospital', NULL),
(gen_random_uuid(), '4 корпус Кардиология', 'Осиё улица, 4к4', 'coffee', 'offline', 41.3373, 69.3351, 4.7, 31, NULL, '24/7', 13, false, 'hospital', NULL),
(gen_random_uuid(), 'American Hospital', 'Икбол, 14', 'coffee', 'online', 41.3135, 69.2791, 4.9, 78, NULL, '24/7', 15, true, 'hospital', NULL),
(gen_random_uuid(), 'DUNYO Supermarket', 'Асалабад-2 жилмассив, 19', 'coffee', 'online', 41.2700, 69.2106, 4.5, 29, NULL, '24/7', 12, false, 'market', NULL),
(gen_random_uuid(), 'Grand Clinic', 'Тикланиш, 1а', 'coffee', 'online', 41.3250, 69.2300, 4.8, 52, NULL, '24/7', 14, false, 'hospital', NULL),
(gen_random_uuid(), 'KIMYO', 'Улица Шота Руставели, 156', 'coffee', 'online', 41.3115, 69.2494, 4.6, 63, NULL, '24/7', 14, false, 'university', NULL),
(gen_random_uuid(), 'KIUT CLINIC', 'Бунёдкор проспект, 19', 'coffee', 'online', 41.2979, 69.2188, 4.7, 41, NULL, '24/7', 13, false, 'hospital', NULL),
(gen_random_uuid(), 'KIUT M corp', 'Бунёдкор проспект, 19', 'coffee', 'online', 41.2982, 69.2190, 4.6, 47, NULL, '24/7', 14, true, 'university', NULL),
(gen_random_uuid(), 'KIUT Библиотека', 'Махалля Яккабог', 'coffee', 'online', 41.2975, 69.2185, 4.8, 56, NULL, '24/7', 13, false, 'university', NULL),
(gen_random_uuid(), 'KIUT Общежитие', 'Махалля Яккабог', 'coffee', 'offline', 41.2970, 69.2180, 4.5, 34, NULL, '24/7', 12, false, 'university', NULL),
(gen_random_uuid(), 'Parus F1', 'Катартал, 60а/1', 'coffee', 'online', 41.3440, 69.3520, 4.7, 39, NULL, '24/7', 14, false, 'residential', NULL),
(gen_random_uuid(), 'Parus F4', 'Катартал, 60а/1', 'coffee', 'online', 41.3442, 69.3522, 4.6, 27, NULL, '24/7', 13, false, 'residential', NULL);


-- ────────────────────────────────────────────────────────────────────────────
-- PROMOTIONS (4)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO promotions (id, title, badge, description, promo_code, gradient, conditions, valid_until, is_active, sort_order) VALUES

(gen_random_uuid(), 'Скидка 20% на всё меню', 'Популярное',
 'Используйте промокод COFFEE20 и получите скидку 20% на любой напиток',
 'COFFEE20', 'from-red-500 to-rose-600',
 '["Все напитки","Не суммируется с другими скидками","Один раз на пользователя"]'::jsonb,
 '2026-03-15', true, 1),

(gen_random_uuid(), 'Комбо: Капучино + Круассан', 'Выгодно',
 '45 000 → 30 000 UZS',
 NULL, 'from-purple-500 to-violet-600',
 '["Капучино 300мл + Круассан","Все автоматы"]'::jsonb,
 '2026-03-31', true, 2),

(gen_random_uuid(), 'Happy Hour: -30%', 'Ежедневно',
 'Скидка 30% на холодные напитки каждый день с 14:00 до 16:00',
 NULL, 'from-blue-500 to-indigo-600',
 '["Только холодные напитки","14:00–16:00","Все автоматы"]'::jsonb,
 NULL, true, 3),

(gen_random_uuid(), 'x2 бонусов за первый заказ', 'Новичкам',
 'Получите двойные бонусы за первые 3 заказа с промокодом WELCOME',
 'WELCOME', 'from-amber-500 to-orange-600',
 '["Новые пользователи","Первые 3 заказа"]'::jsonb,
 NULL, true, 4);


-- ────────────────────────────────────────────────────────────────────────────
-- LOYALTY TIERS (4)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO loyalty_tiers (id, level, emoji, discount_percent, threshold, cashback_percent, privileges, sort_order) VALUES

(gen_random_uuid(), 'Bronze', E'\U0001F949', 0, 0, 1,
 '{"cashback":true,"discount":false,"priority_promos":false,"special_codes":false,"birthday_bonus":0,"early_access":false,"personal_offers":false,"free_drink_monthly":false}'::jsonb,
 1),

(gen_random_uuid(), 'Silver', E'\U0001F948', 3, 100000, 1,
 '{"cashback":true,"discount":true,"priority_promos":true,"special_codes":true,"birthday_bonus":0,"early_access":false,"personal_offers":false,"free_drink_monthly":false}'::jsonb,
 2),

(gen_random_uuid(), 'Gold', E'\U0001F947', 5, 500000, 1,
 '{"cashback":true,"discount":true,"priority_promos":true,"special_codes":true,"birthday_bonus":20000,"early_access":true,"personal_offers":false,"free_drink_monthly":false}'::jsonb,
 3),

(gen_random_uuid(), 'Platinum', E'\U0001F48E', 10, 1000000, 1,
 '{"cashback":true,"discount":true,"priority_promos":true,"special_codes":true,"birthday_bonus":20000,"early_access":true,"personal_offers":true,"free_drink_monthly":true}'::jsonb,
 4);


-- ────────────────────────────────────────────────────────────────────────────
-- SITE CONTENT (14 entries)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO site_content (id, section, key, value) VALUES

(gen_random_uuid(), 'hero', 'title', 'Кофе из автоматов в пару кликов'),
(gen_random_uuid(), 'hero', 'subtitle', '25+ видов напитков. 16 автоматов в больницах, университетах и общественных местах Ташкента.'),
(gen_random_uuid(), 'hero', 'greeting_morning', E'\u2600\uFE0F Доброе утро!'),
(gen_random_uuid(), 'hero', 'greeting_afternoon', E'\U0001F324\uFE0F Добрый день!'),
(gen_random_uuid(), 'hero', 'greeting_evening', E'\U0001F319 Добрый вечер!'),
(gen_random_uuid(), 'stats', 'machines_count', '16'),
(gen_random_uuid(), 'stats', 'drinks_count', '25+'),
(gen_random_uuid(), 'stats', 'orders_count', '10K+'),
(gen_random_uuid(), 'stats', 'rating', '4.8'),
(gen_random_uuid(), 'about', 'description', 'VendHub — оператор сети современных кофейных и снэк-автоматов в Ташкенте. Автоматы в больницах, университетах, госучреждениях и жилых комплексах. Круглосуточный доступ к качественным горячим и холодным напиткам.'),
(gen_random_uuid(), 'about', 'phone', '+998 71 200 39 99'),
(gen_random_uuid(), 'about', 'email', 'info@vendhub.uz'),
(gen_random_uuid(), 'about', 'telegram', '@vendhub_support'),
(gen_random_uuid(), 'about', 'address', 'Ташкент, Узбекистан'),

-- Partnership models (12 entries)
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
(gen_random_uuid(), 'partnership', 'franchise_benefits', '["Готовая бизнес-модель","Обучение и поддержка","Маркетинговые материалы","Техническая инфраструктура"]');


-- ────────────────────────────────────────────────────────────────────────────
-- PARTNERS (4)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO partners (id, name, logo_url, website_url, description, sort_order) VALUES

(gen_random_uuid(), 'Респ. центр кардиологии', NULL, NULL, NULL, 1),
(gen_random_uuid(), 'American Hospital', NULL, NULL, NULL, 2),
(gen_random_uuid(), 'KIUT', NULL, NULL, NULL, 3),
(gen_random_uuid(), 'Grand Medical', NULL, NULL, NULL, 4);
