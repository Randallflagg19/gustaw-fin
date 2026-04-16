# Safe Deploy And Rollback

## Цель

Этот файл нужен для безопасного деплоя новой версии сайта `gustaw.ru` с возможностью быстро откатиться на предыдущую рабочую версию, если после выката что-то пойдёт не так.

---

## Что уже ломалось раньше

Ниже перечислены реальные проблемы, которые уже встречались на сервере и которые нужно учитывать перед каждым деплоем.

### 1. Приложение падало через время после запуска

Возможные причины:

- нехватка памяти на сервере
- утечка памяти в Node.js процессе
- PM2 запускал приложение без ограничения памяти
- swap был недостаточным или отсутствовал

Признаки:

- сайт сначала работает, а потом перестаёт открываться
- в `pm2 status` процесс может уходить в `errored` или перезапускаться
- в логах системы можно увидеть `OOM` или `Out of memory`

Что помогает:

```bash
pm2 delete gustaw
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env
pm2 save
```

---

### 2. На сервере не всегда хватало памяти на `next build`

Проблема:

- сервер слабый
- локально сборка проходит
- на сервере сборка может зависать или падать

Что делать:

- при необходимости собирать проект локально
- загружать на сервер готовую `.next`

---

### 3. Падения из-за переменных окружения

Что уже было критично:

- `DATABASE_URL`
- `SESSION_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- OAuth ключи
- Cloudinary ключи

Если что-то из этого потерять или перезаписать, сайт может не стартовать вообще.

---

### 4. Проблемы с базой данных

Что может случиться:

- не поднят Docker контейнер PostgreSQL
- Prisma не может достучаться до базы
- после изменений схемы не применён `prisma generate` / `db push`

---

### 5. Порт 3000 может быть занят старым процессом

Из-за этого новый процесс может не стартовать, даже если сборка успешна.

Проверка:

```bash
ss -tlnp | grep :3000
```

---

## Главный принцип деплоя

Перед обновлением нужно:

1. сохранить текущую рабочую версию
2. только потом тянуть новый код
3. в случае проблем уметь быстро откатиться

---

## Что сохраняем перед деплоем

Сохраняем:

- текущий git commit
- текущую `.env`
- текущий `ecosystem`/PM2 сценарий
- текущую сборку `.next` если она есть

---

## Безопасная схема деплоя

### 1. Подключиться к серверу

```bash
ssh root@91.210.170.148
cd /home/project/gustaw-fin
```

---

### 2. Зафиксировать текущую рабочую версию

```bash
git rev-parse HEAD
git log -1 --oneline
```

Скопируй хеш последнего рабочего коммита.  
Это и будет точка отката.

Дополнительно можно сохранить его в файл:

```bash
git rev-parse HEAD > /home/project/gustaw-fin/LAST_WORKING_COMMIT.txt
git log -1 --oneline >> /home/project/gustaw-fin/LAST_WORKING_COMMIT.txt
```

---

### 3. Сохранить текущие рабочие файлы в backup-директорию

```bash
mkdir -p /home/project/backups/gustaw-fin
BACKUP_DIR="/home/project/backups/gustaw-fin/$(date +%F-%H%M%S)"
mkdir -p "$BACKUP_DIR"

cp -r /home/project/gustaw-fin/.next "$BACKUP_DIR/.next" 2>/dev/null || true
cp /home/project/gustaw-fin/.env "$BACKUP_DIR/.env" 2>/dev/null || true
cp /home/project/gustaw-fin/package.json "$BACKUP_DIR/package.json" 2>/dev/null || true
cp /home/project/gustaw-fin/package-lock.json "$BACKUP_DIR/package-lock.json" 2>/dev/null || true
cp /home/project/gustaw-fin/pnpm-lock.yaml "$BACKUP_DIR/pnpm-lock.yaml" 2>/dev/null || true
pm2 save
```

Если `.next` нет, это не критично.

---

### 4. Проверить, что база жива

```bash
cd /home/project/gustaw-fin
docker compose ps
docker ps | grep postgres
```

Если PostgreSQL не запущен:

```bash
docker compose up -d
```

---

### 5. Обновить код

Если деплой идёт из `production`:

```bash
git checkout production
git pull origin production
```

Если деплоишь другую ветку:

```bash
git checkout <branch-name>
git pull origin <branch-name>
```

---

### 6. Обновить зависимости

```bash
npm install
```

или

```bash
pnpm install
```

---

### 7. Обновить Prisma

```bash
npx prisma generate
npx prisma db push
```

Если используешь миграции:

```bash
npx prisma migrate deploy
```

---

### 8. Собрать проект

```bash
npm run build
```

Если сервер не тянет сборку, использовать локальную сборку и загрузку `.next`.

---

### 9. Перезапустить приложение

```bash
pm2 restart gustaw --update-env
```

Если были проблемы с памятью:

```bash
pm2 delete gustaw
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env
pm2 save
```

---

### 10. Проверить результат

```bash
pm2 status
pm2 logs gustaw --lines 50 --nostream
curl -I http://localhost:3000
```

Плюс открыть:

- `https://gustaw.ru`
- главную страницу
- вход / регистрацию
- booking
- лайки

---

## Быстрый откат

Если после деплоя сайт сломался, используем один из двух сценариев.

### Вариант A. Откат по git commit

Если проблема в коде:

```bash
cd /home/project/gustaw-fin
git log --oneline -n 5
git checkout <last-working-commit>
npm install
npx prisma generate
npm run build
pm2 restart gustaw --update-env
```

Минус:

- checkout на detached HEAD

Лучше потом вернуть ветку в нормальное состояние отдельно.

---

### Вариант B. Восстановление из backup

Если проблема в сборке, env или server-state:

```bash
cd /home/project/gustaw-fin

# пример, выбери нужную backup-папку
BACKUP_DIR="/home/project/backups/gustaw-fin/<backup-folder>"

cp "$BACKUP_DIR/.env" /home/project/gustaw-fin/.env 2>/dev/null || true
rm -rf /home/project/gustaw-fin/.next
cp -r "$BACKUP_DIR/.next" /home/project/gustaw-fin/.next 2>/dev/null || true

pm2 restart gustaw --update-env
```

---

## Минимальный чек-лист перед каждым деплоем

- [ ] есть текущий рабочий commit hash
- [ ] сохранён backup `.env`
- [ ] сохранён backup `.next` если нужен
- [ ] база данных запущена
- [ ] переменные окружения не затёрты
- [ ] билд проходит
- [ ] PM2 перезапущен с `--update-env`
- [ ] сайт открывается локально через `curl`
- [ ] сайт открывается по домену

---

## Минимальный чек-лист после деплоя

- [ ] открывается главная
- [ ] открывается логин
- [ ] открывается регистрация
- [ ] booking работает
- [ ] лайки работают
- [ ] логи PM2 без критических ошибок
- [ ] процесс `gustaw` в `online`

---

## Команды быстрой диагностики

```bash
cd /home/project/gustaw-fin
pm2 status
pm2 logs gustaw --lines 50 --nostream
free -h
df -h /
docker ps | grep postgres
ss -tlnp | grep :3000
curl -I http://localhost:3000
```

---

## Что важно помнить

- Никогда не деплой без сохранения последнего рабочего commit hash.
- Никогда не перезаписывай `.env` целиком.
- Если сервер снова начинает падать через время, первым делом проверяй память и PM2.
- Если сомневаешься, лучше сделать backup и только потом тянуть новую версию.
