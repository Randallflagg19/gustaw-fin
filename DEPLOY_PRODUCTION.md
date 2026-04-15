# 🚀 Инструкция по деплою на продакшн сервер

## 📋 Информация о сервере

- **IP адрес**: `91.210.170.148`
- **Домен**: `gustaw.ru`
- **Пользователь**: `root`
- **Директория проекта**: `/home/project/gustaw-fin`
- **Процесс менеджер**: PM2 (`gustaw`)
- **База данных**: PostgreSQL в Docker
- **Ветка**: `production`

---

## 🔄 Полная последовательность деплоя

### 1️⃣ Подготовка (на локальной машине)

#### 1.1 Убедиться, что все изменения закоммичены и запушены

```bash
# Проверить статус
git status

# Если есть незакоммиченные изменения, закоммитить
git add .
git commit -m "описание изменений"

# Запушить в ветку production
git push origin production
```

#### 1.2 Проверить, что код собирается без ошибок

```bash
# Линтинг
pnpm lint

# Сборка (если используете npm на сервере)
npm run build
```

---

### 2️⃣ Подключение к серверу

```bash
ssh root@91.210.170.148
```

Введите пароль при запросе.

---

### 3️⃣ Переход в директорию проекта

```bash
cd /home/project/gustaw-fin
```

---

### 4️⃣ Получение последних изменений из репозитория

```bash
# Переключиться на ветку production (если не на ней)
git checkout production

# Получить изменения
git pull origin production
```

**⚠️ Если возникают конфликты с `.next/` директорией:**

```bash
# Удалить старую сборку
rm -rf .next

# Повторить pull
git pull origin production
```

---

### 5️⃣ Обновление переменных окружения (если нужно)

Если добавили новые переменные в `.env`, отредактируйте файл:

```bash
nano .env
```

**⚠️ ВАЖНО: Не перезаписывайте существующие переменные!**

Проверьте, что все необходимые переменные присутствуют:

```env
# База данных (НЕ МЕНЯТЬ!)
DATABASE_URL="postgresql://gustaw:gustawpassword@localhost:5432/gustawdb"

# Session (НЕ МЕНЯТЬ!)
SESSION_SECRET="ваш-секрет"

# NextAuth
NEXTAUTH_URL="https://gustaw.ru"
NEXTAUTH_SECRET="ваш-nextauth-секрет"

# Google OAuth
GOOGLE_CLIENT_ID="ваш-client-id"
GOOGLE_CLIENT_SECRET="ваш-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="ваш-client-id"
GITHUB_CLIENT_SECRET="ваш-client-secret"

# Cloudinary (НЕ МЕНЯТЬ!)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="ваш-cloud-name"
CLOUDINARY_API_KEY="ваш-api-key"
CLOUDINARY_API_SECRET="ваш-api-secret"

# Redis (если используется)
UPSTASH_REDIS_REST_URL="ваш-url"
UPSTASH_REDIS_REST_TOKEN="ваш-token"
```

Сохраните: `Ctrl+O`, `Enter`, `Ctrl+X`

---

### 6️⃣ Установка зависимостей

```bash
# Если используете npm
npm install

# Или если используете pnpm (если установлен)
pnpm install
```

**⚠️ Если возникают ошибки при установке:**

```bash
# Очистить кэш и переустановить
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### 7️⃣ Применение изменений базы данных

Если были изменения в Prisma schema:

```bash
# Сгенерировать Prisma Client
npx prisma generate

# Применить изменения в БД
npx prisma db push

# Или если используете миграции
npx prisma migrate deploy
```

**⚠️ Убедитесь, что Docker контейнер с PostgreSQL запущен:**

```bash
cd /home/project/gustaw-fin
docker compose ps
```

Если контейнер не запущен:

```bash
docker compose up -d
```

---

### 8️⃣ Сборка проекта

```bash
npm run build
```

**⚠️ Если сборка падает с ошибками:**

1. Проверьте логи сборки
2. Убедитесь, что все зависимости установлены
3. Проверьте переменные окружения
4. Если проблема с Prisma:

```bash
npx prisma generate
npm run build
```

---

### 9️⃣ Перезапуск приложения

```bash
# Перезапустить с обновлением переменных окружения
pm2 restart gustaw --update-env
```

**⚠️ ВАЖНО: При первом запуске или после проблем с памятью используйте:**

```bash
# Удалить старое приложение
pm2 delete gustaw

# Запустить с ограничением памяти (автоперезапуск при превышении 400MB)
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env

# Сохранить конфигурацию
pm2 save
```

Это предотвратит падения из-за утечек памяти.

**Альтернативные команды PM2:**

```bash
# Посмотреть статус
pm2 status

# Посмотреть логи
pm2 logs gustaw

# Посмотреть детальную информацию
pm2 show gustaw

# Перезапуск без обновления env
pm2 restart gustaw

# Полная остановка и запуск заново
pm2 stop gustaw
pm2 start gustaw
```

---

### 🔟 Проверка работы

#### 10.1 Проверить статус приложения

```bash
pm2 status
```

Должно быть: `online` ✅

#### 10.2 Проверить логи

```bash
pm2 logs gustaw --lines 50
```

Ищите ошибки в логах.

#### 10.3 Проверить, что сайт доступен

```bash
curl -I https://gustaw.ru
```

Должен вернуть `200 OK` или `301/302` редирект.

---

## 🛠️ Дополнительные операции

### Очистка места на диске (если нужно)

Если диск заполнен (проверить: `df -h /`):

```bash
# Очистить системные логи (оставить последние 3 дня)
journalctl --vacuum-time=3d

# Очистить логи входов
truncate -s 0 /var/log/btmp
truncate -s 0 /var/log/btmp.1
truncate -s 0 /var/log/wtmp
truncate -s 0 /var/log/lastlog

# Очистить кэш apt
apt-get clean

# Проверить свободное место
df -h /
```

### Проверка базы данных

```bash
# Запустить Prisma Studio (в браузере)
npx prisma studio

# Или подключиться через psql
docker compose exec main-db psql -U gustaw -d gustawdb
```

### Обновление OAuth Callback URL (если нужно)

После деплоя убедитесь, что в настройках OAuth провайдеров добавлены правильные callback URL:

- **Google**: `https://gustaw.ru/api/auth/callback/google`
- **GitHub**: `https://gustaw.ru/api/auth/callback/github`

---

## 📝 Чеклист деплоя

Перед деплоем убедитесь:

- [ ] Код закоммичен и запушен в `production` ветку
- [ ] Линтинг проходит без ошибок (`pnpm lint`)
- [ ] Локальная сборка проходит успешно (`npm run build`)
- [ ] Новые переменные окружения записаны в `.env` на сервере
- [ ] База данных доступна (Docker контейнер запущен)
- [ ] На сервере достаточно места на диске

После деплоя проверьте:

- [ ] `pm2 status` показывает `online`
- [ ] Сайт доступен: `https://gustaw.ru`
- [ ] Страницы открываются без ошибок
- [ ] OAuth авторизация работает (Google/GitHub)
- [ ] Нет ошибок в логах (`pm2 logs gustaw`)

---

## 🐛 Решение проблем

### Ошибка: "Can't reach database server"

```bash
# Проверить Docker контейнер
docker compose ps

# Запустить если остановлен
docker compose up -d

# Проверить логи контейнера
docker compose logs main-db
```

### Ошибка: "Port 3000 already in use"

```bash
# Найти процесс на порту 3000
lsof -ti:3000

# Убить процесс
kill -9 $(lsof -ti:3000)

# Или через PM2
pm2 stop gustaw
pm2 delete gustaw
pm2 start npm --name "gustaw" -- start
```

### Ошибка при сборке: "Module not found"

```bash
# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install
npx prisma generate
npm run build
```

### Ошибка: "Disk space full"

```bash
# Очистить место (см. раздел выше)
journalctl --vacuum-time=3d
truncate -s 0 /var/log/btmp*
df -h /
```

### Ошибка: "git pull failed" (conflicts)

```bash
# Удалить конфликтующие файлы сборки
rm -rf .next

# Повторить pull
git pull origin production

# Если конфликты в коде - разрешить вручную
git status
```

---

## 🔗 Полезные ссылки

- **Документация Next.js**: https://nextjs.org/docs
- **Документация PM2**: https://pm2.keymetrics.io/docs/
- **Документация Prisma**: https://www.prisma.io/docs
- **Документация NextAuth**: https://next-auth.js.org/

---

## 📞 Контакты

Если возникли проблемы:

- Email: lextapir191919@gmail.com
- Сервер: `root@91.210.170.148`
- Домен: https://gustaw.ru

---

**Последнее обновление**: 2025-11-07
