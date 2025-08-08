# 🇨🇦 Canadian Lawn — Monorepo

Монорепозиторий интернет-магазина семян газонных трав.  
Собран на базе **Yarn Workspaces** с использованием:

- 🌱 [Next.js](https://nextjs.org/) — фронтенд
- 🌾 [Strapi](https://strapi.io/) — бэкенд (CMS)
- 💅 UI Kit — дизайн-система на основе Storybook
- ⚙️ API Layer — типизированные схемы, endpoints
- 🤖 Telegram Bot — сервисный бот

---

## 📁 Структура

```
.
├── apps/
│   ├── backend/           # Strapi CMS
│   ├── web/               # Next.js frontend
├── packages/
│   ├── api/               # Shared API logic (schemas, types)
│   ├── ui-kit/            # Дизайн-система + Storybook
│   └── bot/               # Telegram-бот (опционально)
├── package.json           # Root package with scripts
└── yarn.lock
```

---

## 🚀 Быстрый старт

```bash
# Установи зависимости
yarn install

# Запуск Strapi CMS
yarn start:strapi

# Запуск фронтенда (Next.js)
yarn start:web

# Запуск UI Kit (storybook)
yarn start:storybook

# Запуск Telegram-бота
yarn start:bot
```

---

## 🛠 Скрипты

| Скрипт                    | Описание                                      |
|--------------------------|-----------------------------------------------|
| `yarn start:dev`         | Запуск backend, web и ui-kit в dev-режиме     |
| `yarn build:all`         | Сборка всех пакетов                           |
| `yarn check:web`         | Линтинг frontend                              |
| `yarn format`            | Применить Prettier по проекту                 |
| `yarn lint`              | Проверка eslint                               |

---

## 🧪 Технологии

- Yarn v4 Workspaces
- TypeScript
- Zod (валидация)
- ESLint + Prettier
- Husky + Lint-Staged
- TailwindCSS

---

## ⚙️ CI/CD и Git

- GitHub → `github.com/trxsh-coding/canadian-lawn`
- GitLab (self-hosted) → `git@git.canadian-lawn.ru:2424/...`

---

## 📦 Разработка пакетов

- `@canadian-lawn/ui-kit` → UI-компоненты, Storybook
- `@canadian-lawn/api` → типы, схемы, shared логику
- `@canadian-lawn/bot` → Telegram-бот

---

## 🧼 Прочее

### Линт перед коммитом:
```bash
yarn precommit
```

### Сборка одного пакета:
```bash
yarn build:web
yarn build:ui
```

---

## 📝 Лицензия

MIT## 📦 Воркспейсы

### `@canadian-lawn/web` — Next.js клиент

- React 19 + Next.js 15
- Zustand для локального состояния
- Zod + React Hook Form для форм
- React Query 5 для API-запросов
- TailwindCSS 4 + tailwind-merge
- Framer Motion 12
- ESLint + Prettier
- usehooks-ts для утилит

```bash
yarn workspace @canadian-lawn/web dev
```

---

### `@canadian-lawn/backend` — Strapi CMS

- Strapi 5.16
- PostgreSQL (`pg`)
- Плагины:
  - `@strapi/plugin-documentation`
  - `@strapi/plugin-users-permissions`
  - `strapi-plugin-tablify`
- Upload AWS S3 / Local
- Email: Nodemailer

```bash
yarn workspace @canadian-lawn/backend develop
```

---

## 🔐 Авторизация

JWT токен от Strapi добавляется в заголовок `Authorization: Bearer {token}`.  
Можно задать глобально в Postman или Axios instance.

---

## 🌍 Git Remote

GitHub → `git@github.com:trxsh-coding/canadian-lawn.git`  
GitLab → `ssh://git@git.canadian-lawn.ru:2424/...`

---

## 🛠 Debug

- Если `TS2345` или `UID` error в Strapi — пересоздай типы или проверь `@strapi/types`
- Если `strapi develop` не видит коллекции — проверь `content-types.d.ts`

---
