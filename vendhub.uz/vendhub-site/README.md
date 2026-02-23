# VendHub.uz

Информационный сайт сети вендинговых автоматов VendHub в Ташкенте.

## Технологии

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS** — дизайн-система "Warm Brew"
- **Supabase** — база данных, аутентификация, RLS
- **lucide-react** — иконки

## Быстрый старт

### 1. Клонирование

```bash
git clone https://github.com/jamsmac/Vendhub.uz.git
cd vendhub-site
```

### 2. Установка зависимостей

```bash
pnpm install
```

### 3. Настройка окружения

```bash
cp .env.example .env.local
```

Заполните переменные:

- `NEXT_PUBLIC_SUPABASE_URL` — URL вашего Supabase проекта
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon ключ Supabase
- `NEXT_PUBLIC_YANDEX_MAPS_API_KEY` — API ключ Яндекс.Карт

### 4. База данных

Выполните в Supabase SQL Editor:

1. `supabase/schema.sql` — создание таблиц
2. `supabase/seed.sql` — тестовые данные
3. `supabase/admin-rls.sql` — политики для админ-панели

### 5. Создание администратора

В Supabase Dashboard → Authentication → Users → Add User:

- Email: `admin@vendhub.uz`
- Password: (ваш пароль)

### 6. Запуск

```bash
pnpm dev
```

Сайт: <http://localhost:3000>
Админ-панель: <http://localhost:3000/admin/login>

## Структура проекта

```text
vendhub-site/
├── app/                    # Next.js страницы
│   ├── admin/             # Админ-панель
│   │   ├── products/      # CRUD продуктов
│   │   ├── machines/      # CRUD автоматов
│   │   ├── promotions/    # CRUD акций
│   │   ├── loyalty/       # Редактор лояльности
│   │   ├── content/       # CMS контента
│   │   ├── cooperation/   # Заявки на сотрудничество
│   │   └── partners/      # Управление партнёрами
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx           # Лендинг
├── components/
│   ├── ui/                # UI компоненты
│   ├── sections/          # Секции лендинга
│   ├── modals/            # Модальные окна
│   ├── benefits/          # Акции и лояльность
│   ├── partner/           # Форма партнёрства
│   └── admin/             # Компоненты админки
├── lib/                   # Утилиты и данные
│   ├── supabase.ts        # Supabase клиент
│   ├── types.ts           # TypeScript типы
│   ├── data.ts            # Fallback данные
│   ├── admin-auth.ts      # Авторизация админа
│   └── modal-context.tsx  # Контекст модалок
├── supabase/              # SQL миграции
│   ├── schema.sql         # Схема БД
│   ├── seed.sql           # Тестовые данные
│   └── admin-rls.sql      # RLS для админки
└── docs/                  # Документация
    ├── ER-DIAGRAM.md
    ├── COMPONENT-TREE.md
    └── API-DOCUMENTATION.md
```

## Деплой

### Railway

```bash
railway login
railway link
railway up
```

Переменные окружения добавить в Railway Dashboard.

## Лицензия

Proprietary. VendHub © 2025
