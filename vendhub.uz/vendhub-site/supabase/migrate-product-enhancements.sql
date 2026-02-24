-- ============================================================================
-- VendHub.uz — Product Enhancement Migration
-- Run in Supabase SQL Editor (one-time)
-- ============================================================================
--
-- A1: detail_description (RU + UZ) + calories
-- A2: Миграция опций (абсолютная цена → дельта 0)
-- A3: name_uz + description_uz
--
-- ВАЖНО: WHERE name = '...' вместо WHERE id = 'prod-*'
-- т.к. ID — это UUID (gen_random_uuid()), а не текстовые prod-* строки.
-- Если продукт не найден — UPDATE просто пропустит строку (0 rows affected).
-- ============================================================================

BEGIN;

-- ═══════════════════════════════════════════════════════════════════════════
-- A1: detail_description + detail_description_uz + calories
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Coffee ────────────────────────────────────────────────────────────────

UPDATE products SET
  detail_description = '100% арабика. Концентрированный кофе, приготовленный под высоким давлением. Насыщенный вкус с плотной крема-пенкой.',
  detail_description_uz = '100% arabika. Yuqori bosim ostida tayyorlangan konsentrlangan qahva. Boy ta''m va qalin krema ko''pik bilan.',
  calories = 5
WHERE name = 'Espresso';

UPDATE products SET
  detail_description = 'Эспрессо, разбавленный горячей водой. Мягкий вкус с лёгкой кислинкой. Доступен с сахаром, ванильным и карамельным сиропом.',
  detail_description_uz = 'Issiq suv bilan suyultirilgan espresso. Engil nordonlik bilan yumshoq ta''m. Shakar, vanil va karamel siropi bilan mavjud.',
  calories = 15
WHERE name = 'Americano';

UPDATE products SET
  detail_description = 'Эспрессо с пышной молочной пенкой в пропорции 1:1:1. Нежный, сливочный вкус. Выбирайте классический, ванильный, карамельный или кокосовый.',
  detail_description_uz = '1:1:1 nisbatda sut ko''pigi bilan espresso. Nozik, kremli ta''m. Klassik, vanil, karamel yoki kokos turini tanlang.',
  calories = 120
WHERE name = 'Cappuccino';

UPDATE products SET
  detail_description = 'Эспрессо с большим количеством вспененного молока. Мягкий, молочный вкус идеален для тех, кто любит кофе не слишком крепким.',
  detail_description_uz = 'Ko''p miqdorda ko''pikli sut bilan espresso. Yumshoq, sutli ta''m — kuchli bo''lmagan qahvani yaxshi ko''ruvchilar uchun ideal.',
  calories = 150
WHERE name = 'Latte';

UPDATE products SET
  detail_description = 'Двойной эспрессо с тонким слоем бархатистого молока. Более крепкий и кофейный, чем латте.',
  detail_description_uz = 'Yupqa baxmal sut qatlami bilan ikki espresso. Lattega qaraganda kuchliroq va qahvali.',
  calories = 120
WHERE name = 'Flat White';

UPDATE products SET
  detail_description = 'Растворимый кофе с сухим молоком и сахаром. Быстро и удобно — готов за 30 секунд.',
  detail_description_uz = 'Quruq sut va shakar bilan tezkor qahva. Tez va qulay — 30 soniyada tayyor.',
  calories = 90
WHERE name = 'MacCoffee 3-in-1';

UPDATE products SET
  detail_description = 'Холодный латте со льдом. Освежающий кофейный напиток с молоком. Доступен без сахара, ванильный, карамельный и кокосовый.',
  detail_description_uz = 'Muzli sovuq latte. Sut bilan tetiklantiruvchi qahva ichimligi. Shakarsiz, vanil, karamel va kokos turlarida mavjud.',
  calories = 140
WHERE name = 'Ice Latte';

UPDATE products SET
  detail_description = 'Холодный американо со льдом. Чистый кофейный вкус без молока. Доступен без сахара, ванильный и карамельный.',
  detail_description_uz = 'Muzli sovuq americano. Sutsiz sof qahva ta''mi. Shakarsiz, vanil va karamel turlarida mavjud.',
  calories = 10
WHERE name = 'Ice Americano';

UPDATE products SET
  detail_description = 'Холодный кофейный напиток с ледяной пенкой. Освежающий и сладкий — идеален в жаркий день.',
  detail_description_uz = 'Muzli ko''pikli sovuq qahva ichimligi. Tetiklantiruvchi va shirin — issiq kunda ideal.',
  calories = 220
WHERE name = 'Frappe';

-- ── Tea ───────────────────────────────────────────────────────────────────

UPDATE products SET
  detail_description = 'Чёрный чай с натуральным лимоном. Классический согревающий напиток с приятной цитрусовой кислинкой.',
  detail_description_uz = 'Tabiiy limon bilan qora choy. Yoqimli sitrus nordonligi bilan klassik isituvchi ichimlik.',
  calories = 25
WHERE name = 'Чай с лимоном';

UPDATE products SET
  detail_description = 'Ароматный фруктовый чай из натуральных ингредиентов. Яркий вкус ягод и фруктов без кофеина.',
  detail_description_uz = 'Tabiiy ingrediyentlardan xushbo''y mevali choy. Kofeinsiz mevalar va rezavorlarning yorqin ta''mi.',
  calories = 35
WHERE name = 'Чай фруктовый';

UPDATE products SET
  detail_description = 'Японский зелёный чай матча, взбитый с молоком. Кремовый вкус с лёгкой горчинкой и высоким содержанием антиоксидантов.',
  detail_description_uz = 'Sut bilan ko''pirilgan yapon yashil matcha choyi. Engil achchiqlik va yuqori antioksidant tarkibi bilan kremli ta''m.',
  calories = 160
WHERE name = 'Matcha Latte';

-- ── Other ─────────────────────────────────────────────────────────────────

UPDATE products SET
  detail_description = 'Горячее какао с молоком. Насыщенный шоколадный вкус, идеален в холодную погоду.',
  detail_description_uz = 'Sutli issiq kakao. Boy shokolad ta''mi, sovuq ob-havoda ideal.',
  calories = 190
WHERE name = 'Какао';

UPDATE products SET
  detail_description = 'Порция кубиков льда для любого напитка. Добавьте в кофе, чай или воду.',
  detail_description_uz = 'Har qanday ichimlik uchun muz bo''laklari porsiyasi. Qahva, choy yoki suvga qo''shing.',
  calories = 0
WHERE name = 'Лёд';

-- ── Snacks & Drinks ──────────────────────────────────────────────────────

UPDATE products SET
  detail_description = 'Чистая питьевая вода. Освежает и утоляет жажду.',
  detail_description_uz = 'Toza ichimlik suvi. Tetiklantiradi va chanqoqni qondiradi.',
  calories = 0
WHERE name = 'Вода';

UPDATE products SET
  detail_description = 'Классический газированный напиток. Охлаждённый, с насыщенным вкусом.',
  detail_description_uz = 'Klassik gazlangan ichimlik. Sovutilgan, boy ta''m bilan.',
  calories = 139
WHERE name = 'Кола';

UPDATE products SET
  detail_description = 'Натуральный апельсиновый сок. Богат витамином C, освежающий цитрусовый вкус.',
  detail_description_uz = 'Tabiiy apelsin sharbati. C vitamini bilan boy, tetiklantiruvchi sitrus ta''mi.',
  calories = 112
WHERE name = 'Сок апельсин';

UPDATE products SET
  detail_description = 'Шоколадный батончик — сладкий перекус к кофе. Молочный шоколад с начинкой.',
  detail_description_uz = 'Shokolad batoncik — qahvaga shirin gazak. Ichki bilan sutli shokolad.',
  calories = 230
WHERE name = 'Шоколадный батончик';

UPDATE products SET
  detail_description = 'Хрустящие картофельные чипсы. Солёная закуска к любому напитку.',
  detail_description_uz = 'Qarsildoq kartoshka chipslari. Har qanday ichimlikka tuzli gazak.',
  calories = 270
WHERE name = 'Чипсы';

UPDATE products SET
  detail_description = 'Свежий слоёный круассан с маслом. Идеальное дополнение к утреннему кофе.',
  detail_description_uz = 'Sariyog''li yangi qatlamali kruassan. Ertalabki qahvaga ideal qo''shimcha.',
  calories = 310
WHERE name = 'Круассан';

-- ── Доп. продукты (если есть в БД, добавлены через админку) ──────────────

UPDATE products SET
  detail_description = 'Эспрессо с горячим шоколадом и молоком. Сочетание кофейного и шоколадного вкуса с нежной пенкой.',
  detail_description_uz = 'Issiq shokolad va sut bilan espresso. Nozik ko''pik bilan qahva va shokolad ta''mlarining uyg''unligi.',
  calories = 180
WHERE name = 'MOCCO';

UPDATE products SET
  detail_description = 'Насыщенный горячий шоколад из настоящего какао с молоком. Густой, ароматный и согревающий.',
  detail_description_uz = 'Haqiqiy kakaodan sut bilan boy issiq shokolad. Qalin, xushbo''y va isituvchi.',
  calories = 200
WHERE name = 'Горячий шоколад';

UPDATE products SET
  detail_description = 'Кофе холодной экстракции (12+ часов). Мягкий, менее кислый вкус без горечи. Подаётся со льдом.',
  detail_description_uz = 'Sovuq ekstraksiya qahvasi (12+ soat). Yumshoq, kamroq nordon va achchiqliksiz ta''m. Muz bilan beriladi.',
  calories = 5
WHERE name = 'Колд Брю';


-- ═══════════════════════════════════════════════════════════════════════════
-- A2: Миграция опций — абсолютная цена → дельта 0
-- ═══════════════════════════════════════════════════════════════════════════
-- Сейчас в JSONB options: [{"name":"С сахаром","price":20000,"temperature":"hot"}, ...]
-- Нужно:                  [{"name":"С сахаром","price":0,    "temperature":"hot"}, ...]
--
-- Логика: ВСЕ текущие опции имеют ту же цену, что и базовый product.price,
-- значит дельта (надбавка) = 0. Одним запросом обнуляем price во всех элементах.
-- ═══════════════════════════════════════════════════════════════════════════

UPDATE products
SET options = (
  SELECT COALESCE(
    jsonb_agg(
      jsonb_set(elem, '{price}', '0'::jsonb)
    ),
    '[]'::jsonb
  )
  FROM jsonb_array_elements(options) AS elem
)
WHERE jsonb_array_length(options) > 0;


-- ═══════════════════════════════════════════════════════════════════════════
-- A3: name_uz + description_uz — узбекские переводы
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Coffee ────────────────────────────────────────────────────────────────

UPDATE products SET
  name_uz = 'Espresso',
  description_uz = 'Klassik kuchli espresso'
WHERE name = 'Espresso';

UPDATE products SET
  name_uz = 'Americano',
  description_uz = 'Espresso issiq suv bilan'
WHERE name = 'Americano';

UPDATE products SET
  name_uz = 'Cappuccino',
  description_uz = 'Espresso sutli ko''pik bilan'
WHERE name = 'Cappuccino';

UPDATE products SET
  name_uz = 'Latte',
  description_uz = 'Espresso ko''p miqdorda sut bilan'
WHERE name = 'Latte';

UPDATE products SET
  name_uz = 'Flat White',
  description_uz = 'Ikki espresso baxmal sut bilan'
WHERE name = 'Flat White';

UPDATE products SET
  name_uz = 'MacCoffee 3-in-1',
  description_uz = 'Tezkor qahva 3-in-1'
WHERE name = 'MacCoffee 3-in-1';

UPDATE products SET
  name_uz = 'Ice Latte',
  description_uz = 'Muzli sovuq latte'
WHERE name = 'Ice Latte';

UPDATE products SET
  name_uz = 'Ice Americano',
  description_uz = 'Muzli sovuq americano'
WHERE name = 'Ice Americano';

UPDATE products SET
  name_uz = 'Frappe',
  description_uz = 'Ko''pikli sovuq qahva ichimligi'
WHERE name = 'Frappe';

-- ── Tea ───────────────────────────────────────────────────────────────────

UPDATE products SET
  name_uz = 'Limonli choy',
  description_uz = 'Limonli qora choy'
WHERE name = 'Чай с лимоном';

UPDATE products SET
  name_uz = 'Mevali choy',
  description_uz = 'Xushbo''y mevali choy'
WHERE name = 'Чай фруктовый';

UPDATE products SET
  name_uz = 'Matcha Latte',
  description_uz = 'Yaponiya matcha choyi sut bilan'
WHERE name = 'Matcha Latte';

-- ── Other ─────────────────────────────────────────────────────────────────

UPDATE products SET
  name_uz = 'Kakao',
  description_uz = 'Sutli issiq kakao'
WHERE name = 'Какао';

UPDATE products SET
  name_uz = 'Muz',
  description_uz = 'Bir porsiya muz'
WHERE name = 'Лёд';

-- ── Snacks & Drinks ──────────────────────────────────────────────────────

UPDATE products SET
  name_uz = 'Suv',
  description_uz = 'Ichimlik suvi'
WHERE name = 'Вода';

UPDATE products SET
  name_uz = 'Kola',
  description_uz = 'Gazlangan ichimlik'
WHERE name = 'Кола';

UPDATE products SET
  name_uz = 'Apelsin sharbati',
  description_uz = 'Tabiiy apelsin sharbati'
WHERE name = 'Сок апельсин';

UPDATE products SET
  name_uz = 'Shokolad batoncik',
  description_uz = 'Sutli shokolad batoncik'
WHERE name = 'Шоколадный батончик';

UPDATE products SET
  name_uz = 'Chipslar',
  description_uz = 'Kartoshka chipslari'
WHERE name = 'Чипсы';

UPDATE products SET
  name_uz = 'Kruassan',
  description_uz = 'Yangi kruassan'
WHERE name = 'Круассан';

-- ── Доп. продукты (если есть в БД) ──────────────────────────────────────

UPDATE products SET
  name_uz = 'MOCCO',
  description_uz = 'Espresso shokolad va sut bilan'
WHERE name = 'MOCCO';

UPDATE products SET
  name_uz = 'Issiq shokolad',
  description_uz = 'Sutli issiq shokolad'
WHERE name = 'Горячий шоколад';

UPDATE products SET
  name_uz = 'Kold Bryu',
  description_uz = 'Sovuq ekstraksiya qahvasi'
WHERE name = 'Колд Брю';


-- ═══════════════════════════════════════════════════════════════════════════
-- ПРОВЕРКА
-- ═══════════════════════════════════════════════════════════════════════════

-- Раскомментируйте для проверки после выполнения:

-- SELECT name, name_uz, description, description_uz,
--        detail_description, detail_description_uz,
--        calories,
--        options->0->>'price' AS first_option_price
-- FROM products
-- ORDER BY sort_order;

COMMIT;
