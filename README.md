<div align="center">

# 🌿 Canadian Lawn

**Интернет-магазин газонных семян и сопутствующих товаров**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Strapi](https://img.shields.io/badge/Strapi-5-4945FF?style=flat-square&logo=strapi&logoColor=white)](https://strapi.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Yarn](https://img.shields.io/badge/Yarn-4.9-2C8EBB?style=flat-square&logo=yarn&logoColor=white)](https://yarnpkg.com/)

</div>

---

## Содержание

- [О проекте](#о-проекте)
- [Архитектура монорепозитория](#архитектура-монорепозитория)
- [Стек технологий](#стек-технологий)
- [Начало работы](#начало-работы)
- [Команды разработки](#команды-разработки)
- [Переменные окружения](#переменные-окружения)
- [Структура проекта](#структура-проекта)

---

## О проекте

**Canadian Lawn** — это полностековое веб-приложение для продажи газонных семян и садовых товаров. Платформа включает каталог продукции, корзину с оформлением заказа, блог, FAQ, личный кабинет и административную панель управления контентом.

### Ключевые возможности

- **Каталог продуктов** — просмотр газонных смесей с детальными страницами
- **Корзина и оформление заказа** — полный цикл покупки
- **Аутентификация** — вход через NextAuth с JWT в cookies
- **Блог и FAQ** — управляемый контент через CMS
- **Партнёрская программа** — раздел для партнёров
- **Личный кабинет** — профиль пользователя
- **Интеграция с Google Maps** — отображение локаций

---

## Архитектура монорепозитория

Проект построен на **Yarn Workspaces** и разделён на независимые приложения и переиспользуемые пакеты:

```
canadian-lawn/
├── apps/
│   ├── backend/          # CMS на Strapi 5 + PostgreSQL
│   └── web/              # Фронтенд на Next.js 15
│
├── packages/
│   ├── api/              # Shared API-клиент (axios + TanStack Query)
│   └── ui-kit/           # Библиотека UI-компонентов (Vite + Storybook)
│
├── configs/              # Общие конфиги (ESLint, Prettier, TypeScript)
├── docker-compose.yml    # PostgreSQL для локальной разработки
└── package.json          # Корневой workspace
```

### Граф зависимостей

```
┌──────────────────────────────────────────────┐
│                   apps/web                   │
│          Next.js 15  ·  React 19             │
└──────────────┬───────────────┬───────────────┘
               │               │
               ▼               ▼
┌─────────────────────┐ ┌─────────────────────┐
│   packages/api      │ │  packages/ui-kit    │
│  API-клиент, схемы, │ │  Компоненты, токены,│
│  сервисы, хуки      │ │  иконки, Storybook  │
└─────────────┬───────┘ └─────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────┐
│                 apps/backend                 │
│     Strapi 5  ·  PostgreSQL  ·  AWS S3       │
└──────────────────────────────────────────────┘
```

---

## Стек технологий

### `apps/web` — Фронтенд

| Категория          | Технология                              |
| ------------------ | --------------------------------------- |
| Фреймворк          | Next.js 15 (App Router)                 |
| UI                 | React 19, TailwindCSS 4, Framer Motion  |
| Стейт-менеджмент   | Zustand                                 |
| Серверное состояние | TanStack Query v5                      |
| Формы & валидация  | React Hook Form + Zod                   |
| Аутентификация     | NextAuth v4                             |
| Карты              | Google Maps (@vis.gl/react-google-maps) |
| HTTP               | Axios                                   |

### `apps/backend` — CMS

| Категория     | Технология                            |
| ------------- | ------------------------------------- |
| CMS           | Strapi 5                              |
| База данных   | PostgreSQL 15                         |
| Хранилище     | AWS S3 (prod) / Local (dev)           |
| Email         | Nodemailer                            |
| Документация  | Swagger (strapi-plugin-documentation) |
| Редактор      | CKEditor 5                            |

### `packages/api` — Shared API

| Категория     | Технология                            |
| ------------- | ------------------------------------- |
| Сборка        | tsup                                  |
| HTTP-клиент   | Axios                                 |
| Хуки          | TanStack Query                        |
| Query строки  | qs                                    |

### `packages/ui-kit` — UI Kit

| Категория     | Технология                            |
| ------------- | ------------------------------------- |
| Сборка        | Vite 6 + vite-plugin-dts              |
| Стили         | TailwindCSS 4                         |
| Компоненты    | Radix UI, shadcn/ui, CVA              |
| Иконки        | @neodx/svg (SVG sprites)             |
| Документация  | Storybook 9                           |

---

## Начало работы

### Предварительные требования

- **Node.js** `>=18.x <=22.x`
- **Yarn** `4.9.2` (управляется через `packageManager`)
- **Docker** и **Docker Compose** (для базы данных)

### Установка

```bash
# Клонируем репозиторий
git clone <repo-url> canadian-lawn
cd canadian-lawn

# Устанавливаем все зависимости одной командой
yarn install
```

### Запуск базы данных

```bash
# Поднимаем PostgreSQL в Docker
docker-compose up -d
```

### Запуск в режиме разработки

Перед запуском создайте `.env` файлы в `apps/backend` и `apps/web` (см. [Переменные окружения](#переменные-окружения)).

```bash
# 1. Собираем и запускаем UI Kit в watch-режиме
yarn watch:ui

# 2. Запускаем бэкенд (Strapi)
yarn start:strapi

# 3. Запускаем фронтенд (Next.js)
yarn start:web
```

---

## Команды разработки

### Корневые команды

| Команда              | Описание                                       |
| -------------------- | ---------------------------------------------- |
| `yarn start:web`     | Запустить Next.js dev-сервер                   |
| `yarn start:strapi`  | Запустить Strapi в режиме разработки           |
| `yarn start:ui`      | Запустить UI Kit в Vite dev-режиме             |
| `yarn start:storybook` | Запустить Storybook (порт 6006)              |
| `yarn watch:ui`      | Пересборка UI Kit при изменениях (watch)       |
| `yarn watch:api`     | Пересборка API пакета при изменениях (watch)   |
| `yarn build:all`     | Сборка всего: ui-kit → api → web              |
| `yarn build:ui`      | Сборка `@canadian-lawn/ui-kit`                 |
| `yarn build:api`     | Сборка `@canadian-lawn/api`                    |
| `yarn build:web`     | Сборка `@canadian-lawn/web`                    |
| `yarn build:backend` | Сборка `@canadian-lawn/backend`                |
| `yarn lint`          | ESLint по всем `.ts/.tsx/.js/.jsx` файлам      |
| `yarn format`        | Prettier форматирование                        |

### Команды workspace

```bash
# Запустить команду в конкретном воркспейсе
yarn workspace @canadian-lawn/web <команда>
yarn workspace @canadian-lawn/backend <команда>
yarn workspace @canadian-lawn/ui-kit <команда>
yarn workspace @canadian-lawn/api <команда>
```

---

## Переменные окружения

### `apps/backend/.env`

```env
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi

# Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# AWS S3 (production)
AWS_ACCESS_KEY_ID=
AWS_ACCESS_SECRET=
AWS_REGION=
AWS_BUCKET=

# Email
SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

---

## Структура проекта

```
apps/web/src/
├── app/
│   ├── (public)/           # Публичные страницы
│   │   ├── page.tsx        # Главная
│   │   ├── lawn/           # Каталог семян
│   │   ├── blogs/          # Блог
│   │   ├── partners/       # Партнёры
│   │   ├── about/          # О нас
│   │   ├── contacts/       # Контакты
│   │   └── faq/            # FAQ
│   └── (private)/          # Приватные страницы (с авторизацией)
│       ├── cart/           # Корзина
│       └── profile/        # Профиль
├── components/
│   ├── layout/             # Header, Footer, LayoutWrapper
│   └── sections/           # Секции страниц
├── hooks/api/              # Хуки для работы с API
├── stores/                 # Zustand сторы
├── auth/                   # NextAuth конфигурация
├── connector/              # React Query провайдеры
└── config/
    └── routes.ts           # Маршруты приложения

packages/ui-kit/lib/
├── components/
│   ├── Button/
│   ├── ButtonGroup/
│   ├── LawnCard/
│   ├── ProductCard/
│   └── ...
└── index.ts                # Публичный API библиотеки

packages/api/src/
├── clients/                # Axios инстанс
├── schemas/                # Zod схемы (cart, product, lawn...)
├── services/               # Сервисные функции
├── populate/               # Strapi populate-конфиги
└── builder/                # Query builder утилиты
```

---

## Рабочий процесс

В проекте настроены **pre-commit хуки** через Husky + lint-staged. Перед каждым коммитом автоматически:

1. Запускается lint-staged (ESLint + Prettier только для изменённых файлов)
2. Собирается весь проект (`build:all`)

Это гарантирует, что в репозиторий не попадёт код с ошибками типизации или нарушениями стилей.

---

<div align="center">

Сделано с заботой о качестве кода и удобстве разработки

</div>