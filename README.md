# Gustaw Photo Gallery

Современная фотогалерея на Next.js с системой лайков, аутентификацией и оптимизированной производительностью.

## Деплой

-- Стартап проекта через pm2 + проксирование nginx
-- Postgresql через docker-compose с поднятием миграций prisma.

## Startup Guide

-- pnpm run start
-- prisma migrate run
-- docker compose up -d # -d для того чтобы работало в фоне

## 🚀 Технологии

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Cache**: Redis (Upstash)
- **State Management**: Zustand, React Query
- **Image Storage**: Cloudinary
- **Authentication**: Custom JWT-based auth

## 📋 Возможности

- 📸 Загрузка и отображение фотографий
- ❤️ Система лайков с оптимистичными обновлениями
- 🔐 Аутентификация и авторизация
- 🎨 Адаптивный дизайн
- ⚡ Кэширование с Redis
- 🔄 Бесконечная прокрутка
- 📱 Мобильная оптимизация

## 🏗️ Архитектура

Проект использует Feature-Sliced Design:

```
src/
├── app/                 # Next.js App Router
├── entities/           # Бизнес-сущности (User, Like, Post)
├── features/           # Функциональные возможности
├── shared/             # Общие компоненты и утилиты
└── kernel/             # Основные типы и конфигурация
```

## ⚡ Оптимизации производительности

### 1. Кэширование

- **Redis** для кэширования лайков и сводок
- **React Query** для клиентского кэширования
- **Prisma** с оптимизированными запросами

### 2. База данных

- Индексы для часто используемых запросов
- Оптимизированные Prisma запросы с `_count`
- Партиционирование для больших таблиц

### 3. Изображения

- **Cloudinary** для оптимизации изображений
- Прогрессивная загрузка фона
- Ленивая загрузка галереи

## 🚀 Быстрый старт

1. **Клонирование репозитория**

```bash
git clone <repository-url>
cd gustaw-fin
```

2. **Установка зависимостей**

```bash
pnpm install
```

3. **Настройка окружения**

```bash
cp .env.example .env.local
# Заполните переменные окружения
```

4. **Настройка базы данных**

```bash
# Запуск PostgreSQL
docker-compose up -d

# Применение миграций
npx prisma migrate dev
```

5. **Настройка Redis** (опционально)

```bash
# Для локального Redis
docker run -d -p 6379:6379 redis:latest

# Или используйте Upstash (см. OPTIMIZATION_SETUP.md)
```

6. **Запуск проекта**

```bash
pnpm dev
```

## 📊 Мониторинг производительности

### Встроенные инструменты:

- **React Query DevTools** - мониторинг кэша
- **Console логи** - отслеживание Redis операций
- **Network панель** - анализ запросов

### Ключевые метрики:

- Время загрузки первой страницы: `< 2s`
- Время отклика API лайков: `< 500ms`
- Cache hit rate: `> 80%`

## 🔧 Конфигурация

### Переменные окружения:

```env
# База данных
DATABASE_URL="postgresql://..."

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Аутентификация
SESSION_SECRET="..."
```

## 📈 Производительность

### До оптимизации:

- Время загрузки галереи: ~5s
- Запросы к БД на страницу: ~20
- Время отклика лайков: ~1.5s

### После оптимизации:

- Время загрузки галереи: ~1.5s
- Запросы к БД на страницу: ~3
- Время отклика лайков: ~200ms

## 🛠️ Разработка

### Полезные команды:

```bash
# Разработка
pnpm dev

# Сборка
pnpm build

# Линтинг
pnpm lint

# Работа с БД
npx prisma studio
npx prisma migrate dev
```

### Структура компонентов:

```
features/gallery/
├── actions/           # Server Actions
├── containers/        # Контейнеры с логикой
├── hooks/            # React Query хуки
├── services/         # Бизнес-логика
└── ui/               # Презентационные компоненты
```

## 🔍 Отладка

### Общие проблемы:

1. **Redis не подключается** - проверьте переменные окружения
2. **Медленные запросы** - используйте `npx prisma studio` для анализа
3. **Изображения не загружаются** - проверьте настройки Cloudinary

### Логи:

```bash
# Мониторинг Redis
redis-cli monitor

# Логи Next.js
tail -f .next/trace
```

## 📚 Дополнительная документация

- [Инструкции по оптимизации](./OPTIMIZATION_SETUP.md)
- [Архитектура проекта](./docs/architecture.md)
- [API документация](./docs/api.md)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/amazing-feature`)
3. Коммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Пушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - см. файл [LICENSE](./LICENSE)

---

**Создано с ❤️ для демонстрации современных практик веб-разработки**
