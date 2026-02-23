# CLAUDE.md — VendHub Client Site (vendhub.uz)

> **Обновлено:** 2026-02-24
> **Владелец:** Jamshid (jamshidsmac@gmail.com)
> **Проект:** Клиентский сайт VendHub — vendhub.uz
> **Язык общения:** Русский

---

## ЧТО ЭТО ЗА ПРОЕКТ

**VendHub** — оператор сети кофейных и снэк-автоматов в Ташкенте, Узбекистан.

Этот подпроект — **клиентский сайт vendhub.uz** (информационный, НЕ личный кабинет).
Задача: показать продукты, автоматы, акции и бонусную программу. Привлечь клиентов в мобильное приложение (Telegram Mini App).

**Бэкенд (VHM24)** — NestJS 10/11 + TypeORM + PostgreSQL.
Живёт в соседней папке `/VHM24/VHM24-repo/` и `/VHM24/VendHub OS/`.
Клиентские API: `/client/public/*` и `/client/*` (с авторизацией).

**Основная кодовая база** — папка `vendhub-site/` (Next.js 16 + React 19 + TypeScript + Supabase).

---

## СТРУКТУРА ФАЙЛОВ

```
vendhub.uz/
├── CLAUDE.md                    ← ТЫ ЧИТАЕШЬ ЭТОТ ФАЙЛ
├── memory/                      ← Справочные данные
│   ├── PRODUCTS.md              ← 22 реальных продукта (+маркетинговое «25+»)
│   ├── MACHINES.md              ← 16 реальных автоматов
│   ├── BONUS-SYSTEM.md          ← Бонусная система v2.0
│   ├── DECISIONS.md             ← Принятые решения (10 штук)
│   └── ADMIN-GAPS.md            ← Что нужно доработать в админке
├── Анализ-Сайта/                ← 26 файлов детального анализа + спецификация
│   ├── 00-ПОЛНЫЙ-АНАЛИЗ.md      ← Мастер-документ
│   ├── 01..26-*.md              ← Блоки анализа (header, hero, меню, и т.д.)
│   ├── СПЕЦИФИКАЦИЯ-БУДУЩИЙ-САЙТ.md  ← ★ ГЛАВНЫЙ ДОКУМЕНТ — полная спецификация
│   └── vendhub-client-site.html ← УСТАРЕВШИЙ исходник (только для справки, НЕ трогать)
├── vendhub-site/                ← ★ ОСНОВНОЙ КОД — Next.js приложение
│   ├── app/                     ← Next.js App Router (страницы)
│   │   ├── layout.tsx           ← Root layout (минимальный pass-through)
│   │   ├── globals.css          ← Глобальные стили
│   │   ├── robots.ts            ← SEO robots.txt
│   │   ├── sitemap.ts           ← SEO sitemap.xml (с hreflang alternates)
│   │   └── [locale]/            ← Динамический сегмент i18n (ru/uz)
│   │       ├── layout.tsx       ← Locale layout (шрифты, metadata, providers, <html lang>)
│   │       ├── page.tsx         ← Лендинг (все 6 секций)
│   │       └── admin/           ← Админ-панель (8 страниц)
│   │           ├── layout.tsx   ← Admin layout (sidebar, auth guard)
│   │           ├── page.tsx     ← Дашборд
│   │           ├── login/       ← Авторизация админа
│   │           ├── products/    ← CRUD продуктов
│   │           ├── machines/    ← CRUD автоматов
│   │           ├── promotions/  ← CRUD акций
│   │           ├── loyalty/     ← Редактор уровней лояльности
│   │           ├── content/     ← CMS контента сайта
│   │           ├── cooperation/ ← Просмотр заявок
│   │           └── partners/    ← CRUD партнёров
│   ├── i18n/                    ← Конфигурация next-intl
│   │   ├── routing.ts           ← locales: ['ru', 'uz'], defaultLocale: 'ru'
│   │   ├── request.ts           ← Серверная конфигурация (getRequestConfig)
│   │   └── navigation.ts        ← Link, usePathname, useRouter с locale
│   ├── messages/                ← Файлы переводов (447 ключей)
│   │   ├── ru.json              ← Русский (основной)
│   │   └── uz.json              ← Узбекский
│   ├── components/              ← 34 React-компонента
│   │   ├── ui/                  ← 10 переиспользуемых (Button, Card, Modal, Badge, LanguageSwitcher...)
│   │   ├── sections/            ← 13 секций лендинга (Header, Hero, Stats, Menu...)
│   │   ├── modals/              ← 3 модалки (ModalRoot, Product, Machine)
│   │   ├── benefits/            ← 2 вкладки (Promotions, Loyalty)
│   │   ├── partner/             ← 1 форма партнёрства
│   │   └── admin/               ← 5 админ-компонентов (+ ImageUpload)
│   ├── lib/                     ← Утилиты и данные
│   │   ├── types.ts             ← TypeScript интерфейсы (Product, Machine, Promotion...)
│   │   ├── data.ts              ← Seed/fallback данные (22 продукта, 16 автоматов...)
│   │   ├── supabase.ts          ← Supabase клиент
│   │   ├── admin-auth.ts        ← Хелперы авторизации админа
│   │   ├── imageUpload.ts       ← Supabase Storage: upload, delete, validate
│   │   ├── modal-context.tsx    ← React Context для модалок
│   │   └── useInView.ts         ← Хук анимаций при скролле
│   ├── supabase/                ← Схема и данные БД
│   │   ├── schema.sql           ← 7 таблиц + RLS политики + индексы
│   │   ├── seed.sql             ← Seed данные (все продукты, автоматы, акции...)
│   │   └── admin-rls.sql        ← RLS для админ-ролей
│   ├── docs/                    ← Техническая документация
│   │   ├── API-DOCUMENTATION.md ← Полная документация API
│   │   ├── COMPONENT-TREE.md    ← Дерево компонентов
│   │   ├── ER-DIAGRAM.md        ← ER-диаграмма БД
│   │   └── plans/               ← Планы реализации
│   ├── Dockerfile               ← 3-stage Docker build (standalone)
│   ├── .dockerignore            ← Исключения для Docker
│   ├── railway.toml             ← Railway конфигурация
│   ├── .github/workflows/ci.yml ← GitHub Actions CI (lint + build)
│   ├── middleware.ts             ← next-intl + domain routing (admin.vendhub.uz)
│   ├── package.json             ← Зависимости (pnpm)
│   ├── tailwind.config.ts       ← Дизайн-система "Warm Brew"
│   ├── next.config.ts           ← Next.js + React Compiler + next-intl + standalone
│   ├── tsconfig.json            ← TypeScript strict
│   ├── .env.local               ← Supabase ключи (НЕ коммитить)
│   └── README.md                ← Инструкция по запуску
├── docs/                        ← Копия документации (верхний уровень)
└── .claude/
    └── settings.local.json
```

---

## ТЕКУЩИЙ СТАТУС

### Фаза 1 — Анализ и спецификация (100%):
- ✅ Полный анализ текущего сайта (26 файлов)
- ✅ Сверка с реальными данными VHM24 (16 автоматов, 22 реальных продукта)
- ✅ Бонусная система v2.0 детально проработана
- ✅ Полная спецификация будущего сайта (1000+ строк, ASCII wireframes, все тексты)
- ✅ Тройная верификация данных
- ✅ Анализ покрытия админ-панели VHM24

### Фаза 2 — Разработка Next.js сайта (99%):
- ✅ Next.js 16 + React 19 + TypeScript strict + Tailwind 4
- ✅ Supabase PostgreSQL (7 таблиц, RLS, seed data)
- ✅ Лендинг — все 6 секций по спецификации
- ✅ Админ-панель — 8 страниц CRUD + CMS
- ✅ Дизайн-система "Warm Brew" — полностью перенесена
- ✅ SEO — metadata, OpenGraph, robots.ts, sitemap.ts, JSON-LD, hreflang alternates
- ✅ Модалки — ProductModal + MachineModal
- ✅ 34 React-компонента, 7 lib-файлов
- ✅ Карта — Leaflet + OpenStreetMap (бесплатно, без API-ключа)
- ✅ Изображения — machines (`image_url`), partners (`logo_url`), products — все с fallback
- ✅ CSP — очищен от Yandex, добавлены OpenStreetMap тайлы
- ⏳ Telegram Mini App — кнопка «Войти» показывает toast «Скоро»

### Фаза 3 — Image Upload (100%):
- ✅ `lib/imageUpload.ts` — утилиты Supabase Storage (upload, delete, validate, 5MB)
- ✅ `components/admin/ImageUpload.tsx` — drag-and-drop + превью + удаление
- ✅ ProductForm — image_url через ImageUpload
- ✅ MachineForm — image_url через ImageUpload (folder: `machines`)
- ✅ Partners — logo_url через ImageUpload + миниатюры в таблице
- ✅ `next.config.ts` — remotePatterns для `*.supabase.co`
- ✅ Supabase Storage bucket `product-images` (PUBLIC, 5MB, jpeg/png/webp)
- ✅ Client site: machine cards/modal показывают `image_url` с fallback на тип
- ✅ Client site: partner logos отображаются как `<Image>` с текстовым fallback

### Фаза 4 — CI/CD Pipeline (100%):
- ✅ `Dockerfile` — 3-stage build (deps → builder → runner), node:22-alpine
- ✅ `.dockerignore` — исключения для Docker
- ✅ `railway.toml` — конфигурация Railway (dockerfile builder, healthcheck)
- ✅ `.github/workflows/ci.yml` — lint + build на push/PR в main
- ✅ `next.config.ts` — `output: 'standalone'`

### Фаза 5 — i18n (100%):
- ✅ next-intl v4.8.3 — установлен и настроен
- ✅ `i18n/` — routing.ts, request.ts, navigation.ts
- ✅ `messages/ru.json` — 447 ключей (все строки сайта и админки)
- ✅ `messages/uz.json` — 447 ключей (узбекские переводы, нужен ревью)
- ✅ `app/[locale]/` — все страницы перенесены под динамический сегмент
- ✅ `middleware.ts` — next-intl + domain routing (admin.vendhub.uz)
- ✅ 27+ компонентов — hardcoded строки → `useTranslations()`
- ✅ `LanguageSwitcher` — в Header (desktop + mobile) и AdminHeader
- ✅ `<html lang={locale}>` — динамический на основе locale
- ✅ SEO — hreflang alternates в metadata + sitemap
- ✅ `localePrefix: 'as-needed'` — `/` для русского (default), `/uz/` для узбекского

### Что НУЖНО ДЕЛАТЬ дальше:
1. **Railway деплой** — подключить репо, задать env vars, запустить
2. **Загрузить фото автоматов** — через админку (ImageUpload уже готов)
3. **Загрузить логотипы партнёров** — через админку (ImageUpload уже готов)
4. **Доработать админ-панель VHM24** — добавить недостающие API (products, stats, promotions)
5. **Миграция Supabase → VHM24 API** — когда бэкенд будет готов

---

## КЛЮЧЕВЫЕ РЕШЕНИЯ (утверждены Jamshid)

| # | Решение | Детали |
|---|---------|--------|
| 1 | Навигация 6 пунктов | Акции+Бонусы → одна секция «Выгода» с вкладками |
| 2 | Корзина УБРАНА | Информационный сайт, не ЛК. Покупки через Telegram Mini App |
| 3 | Кнопка «Войти» | Добавлена в header → переход в Telegram Mini App |
| 4 | 2 напитка удалены | Раф Лаванда и Пряный Латте НЕ СУЩЕСТВУЮТ — убраны |
| 5 | 22 реальных продукта | Было 27, убраны 2 несуществующих. Реально 22, маркетинг «25+» |
| 6 | 4 акции | Было 6, убраны 2 с несуществующими напитками |
| 7 | 16 реальных автоматов | Данные из VHM24, вместо 8 захардкоженных фейковых |
| 8 | Лояльность v2.0 | Bronze 0%, Silver 3%/100K, Gold 5%/500K, Platinum 10%/1M |
| 9 | Leaflet + OSM | Бесплатная карта OpenStreetMap вместо Yandex Maps (без API-ключа) |
| 10 | Данные из API | Все динамические, управление через админку VHM24 |

---

## ТЕХСТЕК

### Новый сайт (vendhub-site/) — ОСНОВНОЙ:
- **Next.js 16.1.6** + **React 19.2.3** + **TypeScript 5** (strict)
- **Tailwind CSS 4** + PostCSS + дизайн-система "Warm Brew"
- **Supabase** — PostgreSQL + RLS + Auth + Storage (7 таблиц)
- **next-intl 4.8.3** — i18n (русский + узбекский), `localePrefix: 'as-needed'`
- **lucide-react** — иконки
- **React Compiler** — включён для оптимизации
- **pnpm** — пакетный менеджер
- SEO: metadata, OpenGraph, JSON-LD, robots.ts, sitemap.ts, hreflang alternates
- CI/CD: Docker (3-stage) + GitHub Actions (lint + build) + Railway
- Деплой: Railway (настроен Dockerfile + railway.toml, нужно подключить репо)

### Устаревший сайт (НЕ использовать):
- `Анализ-Сайта/vendhub-client-site.html` — React 18 + Babel CDN, Single HTML SPA
- Содержит ошибки: 28 продуктов (вкл. несуществующие), корзина, 8 фейковых автоматов
- **Только для справки** — НЕ редактировать, НЕ деплоить

### Бэкенд VHM24:
- NestJS 10/11 + TypeORM 0.3 + PostgreSQL 16
- Redis 7 + BullMQ + Socket.IO
- JWT auth (staff) + Telegram auth (clients)
- 38+ admin модулей, 5 клиентских API контроллеров

### Supabase (текущая БД сайта):
```
Таблицы (7):
  products             ← 22 продукта с опциями (JSONB)
  machines             ← 16 автоматов с GPS-координатами
  promotions           ← 4 активные акции
  loyalty_tiers        ← 4 уровня (Bronze/Silver/Gold/Platinum)
  site_content         ← CMS контент (hero, about, stats)
  cooperation_requests ← Заявки на партнёрство
  partners             ← 5 партнёров-логотипов

RLS:  публичный READ на все таблицы, публичный INSERT на cooperation_requests
URL:  https://cuaxgniyrffrzqmelfbw.supabase.co
```

### VHM24 Client API endpoints (для будущей интеграции):
```
GET  /client/public/locations      ← список автоматов (уже есть)
GET  /client/public/menu           ← меню автомата (уже есть)
GET  /client/public/cities         ← города (уже есть)
POST /client/public/cooperation    ← заявка на партнёрство (уже есть)
POST /client/promo-codes/validate  ← валидация промокода (нужна авторизация)
```

### Недостающие API в VHM24 (нужно создать для миграции с Supabase):
```
GET  /client/public/products       ← продукты без привязки к автомату
GET  /client/public/loyalty-tiers  ← уровни лояльности
GET  /client/public/promotions     ← активные акции
GET  /client/public/stats          ← статистика (кол-во автоматов, напитков и т.д.)
CMS  endpoints                     ← управление текстами hero, about, промо-баннерами
```

### Дизайн-система "Warm Brew"

> Конфигурация: `vendhub-site/tailwind.config.ts`

```
Цвета:
  cream:         #FDF8F3  ← основной фон
  espresso:      #5D4037  ← основной акцент
  espresso-light:#795548
  espresso-dark: #3E2723  ← header, footer
  caramel:       #D4A574  ← вторичный акцент
  caramel-light: #E8C9A8
  caramel-dark:  #B8834A  ← CTA кнопки
  chocolate:     #2C1810  ← текст
  mint:          #7CB69D  ← online/успех
  foam:          #F5F0EB  ← вторичный фон

Типография:
  Display: Playfair Display (serif) — заголовки
  Body: DM Sans (sans-serif) — всё остальное

Компоненты: coffee-card, btn-espresso, btn-caramel, pill, price-tag, hover-lift
Анимации: fadeUp, fadeIn, slideUp, expand, bounceIn + задержки .d1-.d6
```

---

## СТРУКТУРА БУДУЩЕГО САЙТА (6 разделов)

```
HEADER: [Logo VendHub] Главная Автоматы Меню Выгода Партнёрство О нас [RU|UZ] [Войти →]

1. ГЛАВНАЯ (home)
   ├── Hero-баннер (динамическое приветствие, 2 CTA)
   ├── Статистика (4 карточки: 16 автоматов, 25+ напитков, 10K+ заказов, ⭐4.8)
   ├── Быстрые действия (Каталог / Автоматы)
   ├── Популярные товары (4 из 6 популярных)
   ├── Промо-баннер
   └── «Почему VendHub?» (4 пункта)

2. АВТОМАТЫ (map)
   ├── Leaflet + OpenStreetMap с 16 маркерами + кластеризация
   ├── Поиск + фильтры (статус, тип)
   ├── Карточки автоматов (grid)
   └── Типы автоматов (аккордеон)

3. МЕНЮ (menu)
   ├── Фильтры: категория (5) + температура (3)
   └── Каталог 25 товаров (grid карточек)

4. ВЫГОДА (benefits) — 2 вкладки
   ├── [Акции] — 4 промо-карточки + инфо промокоды
   └── [Бонусы] — уровни, привилегии, способы заработка, трата

5. ПАРТНЁРСТВО (partner)
   ├── 4 модели (Локациям, Поставщикам, Инвесторам, Франшиза)
   ├── Форма заявки → POST /client/public/cooperation
   └── Партнёры (логотипы)

6. О НАС (about)
   ├── Описание компании
   └── Контакты (телефон, email, telegram)

FOOTER: бренд + навигация + контакты + соцсети + © копирайт

МОДАЛКИ: ProductModal (детали + опции) | MachineModal (детали + меню автомата)
```

---

## КРИТИЧЕСКИ ВАЖНЫЕ ФАЙЛЫ

| Приоритет | Файл | Что содержит |
|-----------|------|-------------|
| ★★★ | `vendhub-site/app/[locale]/page.tsx` | Главная страница лендинга (все 6 секций) |
| ★★★ | `vendhub-site/app/[locale]/layout.tsx` | Locale layout (шрифты, metadata, providers, html lang) |
| ★★★ | `vendhub-site/messages/ru.json` | 447 ключей переводов (русский) |
| ★★★ | `vendhub-site/messages/uz.json` | 447 ключей переводов (узбекский) |
| ★★★ | `vendhub-site/lib/data.ts` | Seed/fallback данные (продукты, автоматы, акции, уровни) |
| ★★★ | `vendhub-site/lib/types.ts` | TypeScript интерфейсы всех сущностей |
| ★★★ | `vendhub-site/lib/imageUpload.ts` | Supabase Storage: upload, delete, validate |
| ★★★ | `vendhub-site/supabase/schema.sql` | Схема БД (7 таблиц + RLS) |
| ★★★ | `Анализ-Сайта/СПЕЦИФИКАЦИЯ-БУДУЩИЙ-САЙТ.md` | Полная спецификация — wireframes, тексты, данные |
| ★★★ | `memory/PRODUCTS.md` | 22 продукта с ценами, опциями, категориями |
| ★★★ | `memory/MACHINES.md` | 16 автоматов с адресами |
| ★★★ | `memory/BONUS-SYSTEM.md` | Бонусная система v2.0 целиком |
| ★★☆ | `vendhub-site/docs/API-DOCUMENTATION.md` | Документация Supabase API |
| ★★☆ | `vendhub-site/docs/COMPONENT-TREE.md` | Дерево компонентов |
| ★★☆ | `memory/DECISIONS.md` | 10 утверждённых решений |
| ★★☆ | `memory/ADMIN-GAPS.md` | Что нужно доработать в админке VHM24 |
| ★☆☆ | `Анализ-Сайта/00-ПОЛНЫЙ-АНАЛИЗ.md` | Мастер-анализ текущего сайта |
| ★☆☆ | `Анализ-Сайта/vendhub-client-site.html` | УСТАРЕВШИЙ исходник (только справка) |

---

## ПРАВИЛА РАБОТЫ

1. **Работай в `vendhub-site/`** — это основная кодовая база. НЕ трогай `vendhub-client-site.html`
2. **ВСЕГДА** сверяйся со спецификацией и `memory/` для точных данных
3. **НЕ ДОБАВЛЯЙ** Раф Лаванда и Пряный Латте — их НЕ СУЩЕСТВУЕТ
4. **НЕ ДОБАВЛЯЙ** корзину — это информационный сайт
5. Лояльность: Bronze **0%**, Silver **3%**/100K, Gold **5%**/500K, Platinum **10%**/1M
6. Автоматов ровно **16**, реальных продуктов **22** (маркетинг: «25+»), акций **4**
7. Данные из **Supabase** (сейчас), в будущем — миграция на VHM24 API
8. Дизайн-система **"Warm Brew"** — настроена в `tailwind.config.ts`
9. TypeScript **strict**, все типы в `lib/types.ts`
10. Язык интерфейса: **русский** (основной) + **узбекский** через next-intl
11. Запуск: `cd vendhub-site && pnpm dev`

---

## КОНТЕКСТ VHM24 БЭКЕНДА

Полное описание бэкенда — в `/VHM24/VHM24-repo/CLAUDE.md` и `/VHM24/VendHub OS/CLAUDE.md`.

Ключевое:
- Backend: NestJS, `/api/v1/` prefix
- Client controllers: `client-public.controller.ts`, `client-auth.controller.ts`, `client-loyalty.controller.ts`, `client-orders.controller.ts`, `client-promo.controller.ts`
- Entities: `ClientUser`, `ClientOrder`, `ClientOrderItem`, `ClientFavorite`
- Auth: Telegram initData → header `x-telegram-init-data`
- Roles: 7 (owner, admin, manager, operator, warehouse, accountant, viewer)
- DB: PostgreSQL 16, TypeORM, UUID everywhere, snake_case columns, BaseEntity required

---

## БИЗНЕС-КОНТЕКСТ

- **Рынок:** Узбекистан, Ташкент
- **Валюта:** UZS (сумы), формат: `20 000 UZS`
- **Язык:** Русский (основной) + Узбекский (реализовано через next-intl)
- **Часовой пояс:** Asia/Tashkent (UTC+5)
- **Платежи:** PAYME, CLICK, UZUM, наличные, VIP-карта
- **Контакты:** +998 71 200 39 99, info@vendhub.uz, @vendhub_support (Telegram)
- **Автоматы:** 730×730×1960 мм, ~240 кг, 43" тачскрин, льдогенератор
