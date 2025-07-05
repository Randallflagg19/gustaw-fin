# Инструкции по установке оптимизаций

## 1. Установка зависимостей

```bash
pnpm install @tanstack/react-query @tanstack/react-query-devtools @upstash/redis
```

## 2. Настройка Redis (Upstash)

1. Зарегистрируйтесь на [Upstash](https://upstash.com/)
2. Создайте новую Redis базу данных
3. Добавьте в `.env.local`:

```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## 3. Применение миграций базы данных

```bash
# Создать миграцию для индексов
npx prisma migrate dev --name add_performance_indexes

# Применить миграцию
npx prisma migrate deploy
```

## 4. Альтернативная настройка Redis (локальная)

Если не хотите использовать Upstash, можете использовать локальный Redis:

```bash
# Запустить Redis через Docker
docker run -d -p 6379:6379 redis:latest
```

И обновить `src/shared/lib/redis.ts`:

```typescript
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

export const redis = client;
```

## 5. Проверка работы оптимизаций

1. Запустите проект: `pnpm dev`
2. Откройте React Query DevTools (появится в правом нижнем углу)
3. Проверьте кэширование в Redis (если используете Redis CLI)
4. Мониторьте производительность запросов в консоли браузера

## 6. Мониторинг производительности

### Ключевые метрики для отслеживания:
- Время загрузки первой страницы фотографий
- Время отклика API лайков
- Количество запросов к базе данных
- Использование кэша (hit rate)

### Команды для мониторинга:
```bash
# Мониторинг Redis
redis-cli monitor

# Мониторинг PostgreSQL (если доступен)
SELECT * FROM pg_stat_activity;
```

## 7. Настройка production

В production окружении:
1. Используйте connection pooling для PostgreSQL
2. Настройте TTL для Redis кэша в зависимости от нагрузки
3. Мониторьте использование памяти Redis
4. Настройте алерты для производительности

## 8. Откат изменений

Если нужно откатить изменения:

```bash
# Откат миграции
npx prisma migrate reset

# Удаление зависимостей
pnpm remove @tanstack/react-query @tanstack/react-query-devtools @upstash/redis
```

## 9. Дополнительные оптимизации

После успешного внедрения базовых оптимизаций, рекомендуется:
1. Настроить CDN для статических файлов
2. Добавить service worker для offline работы
3. Настроить мониторинг ошибок (Sentry)
4. Добавить метрики производительности 