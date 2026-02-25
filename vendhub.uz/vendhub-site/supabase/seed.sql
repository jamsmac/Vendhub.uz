-- ============================================================================
-- VendHub.uz — Seed data
-- Matches lib/data.ts exactly.
-- Run AFTER schema.sql.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- PRODUCTS (20)
-- ────────────────────────────────────────────────────────────────────────────

INSERT INTO products (id, name, name_uz, price, category, temperature, popular, available, image_url, description, description_uz, detail_description, detail_description_uz, calories, rating, options, is_new, discount_percent, sort_order) VALUES

-- Coffee (8)
(gen_random_uuid(), 'Espresso', 'Espresso', 20000, 'coffee', 'hot', true, true, NULL,
 'Классический крепкий эспрессо', 'Klassik kuchli espresso',
 '100% арабика. Концентрированный кофе, приготовленный под высоким давлением. Насыщенный вкус с плотной крема-пенкой.',
 '100% arabika. Yuqori bosim ostida tayyorlangan konsentrlangan qahva. Boy ta''m va qalin krema ko''pik bilan.', 5, 4.8,
 '[{"name":"С сахаром","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"hot"}]'::jsonb,
 false, NULL, 1),

(gen_random_uuid(), 'Americano', 'Americano', 20000, 'coffee', 'both', true, true, NULL,
 'Эспрессо с горячей водой', 'Espresso issiq suv bilan',
 'Эспрессо, разбавленный горячей водой. Мягкий вкус с лёгкой кислинкой. Доступен с сахаром, ванильным и карамельным сиропом.',
 'Issiq suv bilan suyultirilgan espresso. Engil nordonlik bilan yumshoq ta''m. Shakar, vanil va karamel siropi bilan mavjud.', 15, 4.7,
 '[{"name":"С сахаром","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"hot"},{"name":"Ванильный","price":0,"temperature":"hot"},{"name":"Карамельный","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"cold"},{"name":"Ванильный","price":0,"temperature":"cold"},{"name":"Карамельный","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 2),

(gen_random_uuid(), 'Cappuccino', 'Cappuccino', 20000, 'coffee', 'both', true, true, NULL,
 'Эспрессо с молочной пенкой', 'Espresso sutli ko''pik bilan',
 'Эспрессо с пышной молочной пенкой в пропорции 1:1:1. Нежный, сливочный вкус. Выбирайте классический, ванильный, карамельный или кокосовый.',
 '1:1:1 nisbatda sut ko''pigi bilan espresso. Nozik, kremli ta''m. Klassik, vanil, karamel yoki kokos turini tanlang.', 120, 4.9,
 '[{"name":"С сахаром","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"hot"},{"name":"Ванильный","price":0,"temperature":"hot"},{"name":"Карамельный","price":0,"temperature":"hot"},{"name":"Кокосовый","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"cold"},{"name":"Ванильный","price":0,"temperature":"cold"},{"name":"Карамельный","price":0,"temperature":"cold"},{"name":"Кокосовый","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 3),

(gen_random_uuid(), 'Latte', 'Latte', 20000, 'coffee', 'both', true, true, NULL,
 'Эспрессо с большим количеством молока', 'Espresso ko''p miqdorda sut bilan',
 'Эспрессо с большим количеством вспененного молока. Мягкий, молочный вкус идеален для тех, кто любит кофе не слишком крепким.',
 'Ko''p miqdorda ko''pikli sut bilan espresso. Yumshoq, sutli ta''m — kuchli bo''lmagan qahvani yaxshi ko''ruvchilar uchun ideal.', 150, 4.8,
 '[{"name":"С сахаром","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"hot"},{"name":"Ванильный","price":0,"temperature":"hot"},{"name":"Карамельный","price":0,"temperature":"hot"},{"name":"Кокосовый","price":0,"temperature":"hot"},{"name":"Без сахара","price":0,"temperature":"cold"},{"name":"Ванильный","price":0,"temperature":"cold"},{"name":"Карамельный","price":0,"temperature":"cold"},{"name":"Кокосовый","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 4),

(gen_random_uuid(), 'Flat White', 'Flat White', 25000, 'coffee', 'hot', false, true, NULL,
 'Двойной эспрессо с бархатистым молоком', 'Ikki espresso baxmal sut bilan',
 'Двойной эспрессо с тонким слоем бархатистого молока. Более крепкий и кофейный, чем латте.',
 'Yupqa baxmal sut qatlami bilan ikki espresso. Lattega qaraganda kuchliroq va qahvali.', 120, 4.7,
 '[{"name":"Flat White","price":0,"temperature":"hot"}]'::jsonb,
 false, NULL, 5),

(gen_random_uuid(), 'MacCoffee 3-in-1', 'MacCoffee 3-in-1', 10000, 'coffee', 'hot', false, true, NULL,
 'Растворимый кофе 3-в-1', 'Tezkor qahva 3-in-1',
 'Растворимый кофе с сухим молоком и сахаром. Быстро и удобно — готов за 30 секунд.',
 'Quruq sut va shakar bilan tezkor qahva. Tez va qulay — 30 soniyada tayyor.', 90, 4.2,
 '[{"name":"MacCoffee 3-in-1","price":0,"temperature":"hot"}]'::jsonb,
 false, NULL, 6),

(gen_random_uuid(), 'Ice Latte', 'Ice Latte', 20000, 'coffee', 'cold', true, true, NULL,
 'Холодный латте со льдом', 'Muzli sovuq latte',
 'Холодный латте со льдом. Освежающий кофейный напиток с молоком. Доступен без сахара, ванильный, карамельный и кокосовый.',
 'Muzli sovuq latte. Sut bilan tetiklantiruvchi qahva ichimligi. Shakarsiz, vanil, karamel va kokos turlarida mavjud.', 140, 4.8,
 '[{"name":"Без сахара","price":0,"temperature":"cold"},{"name":"Ванильный","price":0,"temperature":"cold"},{"name":"Карамельный","price":0,"temperature":"cold"},{"name":"Кокосовый","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 7),

(gen_random_uuid(), 'Ice Americano', 'Ice Americano', 20000, 'coffee', 'cold', false, true, NULL,
 'Холодный американо со льдом', 'Muzli sovuq americano',
 'Холодный американо со льдом. Чистый кофейный вкус без молока. Доступен без сахара, ванильный и карамельный.',
 'Muzli sovuq americano. Sutsiz sof qahva ta''mi. Shakarsiz, vanil va karamel turlarida mavjud.', 10, 4.6,
 '[{"name":"Без сахара","price":0,"temperature":"cold"},{"name":"Ванильный","price":0,"temperature":"cold"},{"name":"Карамельный","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 8),

-- Tea (3)
(gen_random_uuid(), 'Чай с лимоном', 'Limonli choy', 10000, 'tea', 'hot', false, true, NULL,
 'Чёрный чай с лимоном', 'Limonli qora choy',
 'Чёрный чай с натуральным лимоном. Классический согревающий напиток с приятной цитрусовой кислинкой.',
 'Tabiiy limon bilan qora choy. Yoqimli sitrus nordonligi bilan klassik isituvchi ichimlik.', 25, 4.5,
 '[{"name":"Чай с лимоном","price":0,"temperature":"hot"}]'::jsonb,
 false, NULL, 9),

(gen_random_uuid(), 'Чай фруктовый', 'Mevali choy', 15000, 'tea', 'hot', false, true, NULL,
 'Ароматный фруктовый чай', 'Xushbo''y mevali choy',
 'Ароматный фруктовый чай из натуральных ингредиентов. Яркий вкус ягод и фруктов без кофеина.',
 'Tabiiy ingrediyentlardan xushbo''y mevali choy. Kofeinsiz mevalar va rezavorlarning yorqin ta''mi.', 35, 4.4,
 '[{"name":"Чай фруктовый","price":0,"temperature":"hot"}]'::jsonb,
 false, NULL, 10),

(gen_random_uuid(), 'Matcha Latte', 'Matcha Latte', 30000, 'tea', 'both', false, true, NULL,
 'Японский чай матча с молоком', 'Yaponiya matcha choyi sut bilan',
 'Японский зелёный чай матча, взбитый с молоком. Кремовый вкус с лёгкой горчинкой и высоким содержанием антиоксидантов.',
 'Sut bilan ko''pirilgan yapon yashil matcha choyi. Engil achchiqlik va yuqori antioksidant tarkibi bilan kremli ta''m.', 160, 4.6,
 '[{"name":"Matcha Latte","price":0,"temperature":"hot"}]'::jsonb,
 true, NULL, 11),

-- Other (2)
(gen_random_uuid(), 'Какао', 'Kakao', 15000, 'other', 'hot', false, true, NULL,
 'Горячее какао с молоком', 'Sutli issiq kakao',
 'Горячее какао с молоком. Насыщенный шоколадный вкус, идеален в холодную погоду.',
 'Sutli issiq kakao. Boy shokolad ta''mi, sovuq ob-havoda ideal.', 190, 4.5,
 '[{"name":"Какао","price":0,"temperature":"hot"}]'::jsonb,
 false, NULL, 12),

(gen_random_uuid(), 'Лёд', 'Muz', 10000, 'other', 'cold', false, true, NULL,
 'Порция льда', 'Bir porsiya muz',
 'Порция кубиков льда для любого напитка. Добавьте в кофе, чай или воду.',
 'Har qanday ichimlik uchun muz bo''laklari porsiyasi. Qahva, choy yoki suvga qo''shing.', 0, 4.0,
 '[{"name":"Лёд","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 13),

-- Snacks (6)
(gen_random_uuid(), 'Вода', 'Suv', 5000, 'snack', 'cold', false, false, NULL,
 'Питьевая вода', 'Ichimlik suvi',
 'Чистая питьевая вода. Освежает и утоляет жажду.',
 'Toza ichimlik suvi. Tetiklantiradi va chanqoqni qondiradi.', 0, 4.3,
 '[{"name":"Вода","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 14),

(gen_random_uuid(), 'Кола', 'Kola', 8000, 'snack', 'cold', false, false, NULL,
 'Газированный напиток', 'Gazlangan ichimlik',
 'Классический газированный напиток. Охлаждённый, с насыщенным вкусом.',
 'Klassik gazlangan ichimlik. Sovutilgan, boy ta''m bilan.', 139, 4.4,
 '[{"name":"Кола","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 15),

(gen_random_uuid(), 'Сок апельсин', 'Apelsin sharbati', 10000, 'snack', 'cold', false, false, NULL,
 'Апельсиновый сок', 'Tabiiy apelsin sharbati',
 'Натуральный апельсиновый сок. Богат витамином C, освежающий цитрусовый вкус.',
 'Tabiiy apelsin sharbati. C vitamini bilan boy, tetiklantiruvchi sitrus ta''mi.', 112, 4.5,
 '[{"name":"Сок апельсин","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 16),

(gen_random_uuid(), 'Шоколадный батончик', 'Shokolad batoncik', 7000, 'snack', 'none', false, false, NULL,
 'Шоколадный батончик', 'Sutli shokolad batoncik',
 'Шоколадный батончик — сладкий перекус к кофе. Молочный шоколад с начинкой.',
 'Shokolad batoncik — qahvaga shirin gazak. Ichki bilan sutli shokolad.', 230, 4.3,
 '[{"name":"Шоколадный батончик","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 17),

(gen_random_uuid(), 'Чипсы', 'Chipslar', 8000, 'snack', 'none', false, false, NULL,
 'Картофельные чипсы', 'Kartoshka chipslari',
 'Хрустящие картофельные чипсы. Солёная закуска к любому напитку.',
 'Qarsildoq kartoshka chipslari. Har qanday ichimlikka tuzli gazak.', 270, 4.2,
 '[{"name":"Чипсы","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 18),

(gen_random_uuid(), 'Круассан', 'Kruassan', 12000, 'snack', 'none', true, false, NULL,
 'Свежий круассан', 'Yangi kruassan',
 'Свежий слоёный круассан с маслом. Идеальное дополнение к утреннему кофе.',
 'Sariyog''li yangi qatlamali kruassan. Ertalabki qahvaga ideal qo''shimcha.', 310, 4.6,
 '[{"name":"Круассан","price":0,"temperature":"cold"}]'::jsonb,
 false, NULL, 19),

-- Unavailable (1)
(gen_random_uuid(), 'Frappe', 'Frappe', 26000, 'coffee', 'cold', false, false, NULL,
 'Холодный кофейный напиток с пенкой', 'Ko''pikli sovuq qahva ichimligi',
 'Холодный кофейный напиток с ледяной пенкой. Освежающий и сладкий — идеален в жаркий день.',
 'Muzli ko''pikli sovuq qahva ichimligi. Tetiklantiruvchi va shirin — issiq kunda ideal.', 220, 4.5,
 '[{"name":"Frappe","price":0,"temperature":"cold"}]'::jsonb,
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
