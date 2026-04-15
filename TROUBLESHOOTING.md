# 🔍 Диагностика проблем продакшн-сервера

## 🚨 Быстрая диагностика (скопировать и выполнить все команды)

```bash
cd /home/project/gustaw-fin

echo "=== 1. Статус PM2 ==="
pm2 status
pm2 list

echo ""
echo "=== 2. Логи PM2 (последние 30 строк) ==="
pm2 logs gustaw --lines 30 --nostream

echo ""
echo "=== 3. Процессы на порту 3000 ==="
ss -tlnp | grep :3000
lsof -i:3000 2>/dev/null || echo "lsof не установлен"

echo ""
echo "=== 4. Все Node процессы ==="
ps aux | grep -E "node|npm|next|PM2" | grep -v grep

echo ""
echo "=== 5. Использование диска ==="
df -h /

echo ""
echo "=== 6. Использование памяти ==="
free -h

echo ""
echo "=== 7. Проверка приложения ==="
curl -I http://localhost:3000 2>&1 | head -5

echo ""
echo "=== 8. Логи Nginx ==="
tail -20 /var/log/nginx/error.log 2>/dev/null || echo "Nginx лог не найден"

echo ""
echo "=== 9. Статус Nginx ==="
systemctl status nginx --no-pager -l | head -15

echo ""
echo "=== 10. Последние ошибки системы (OOM, убитые процессы) ==="
journalctl -xe -n 30 --no-pager | grep -i "error\|fail\|kill\|oom" | tail -10

echo ""
echo "=== 11. OOM Killer (если было убийство процесса) ==="
dmesg | grep -i "out of memory\|oom" | tail -5

echo ""
echo "=== 12. Проверка переменных окружения (названия без значений) ==="
cat .env 2>/dev/null | grep -E "DATABASE_URL|NEXTAUTH_URL|NEXTAUTH_SECRET|GOOGLE_CLIENT|GITHUB_CLIENT|SESSION_SECRET" | cut -d'=' -f1

echo ""
echo "=== 13. Статус базы данных ==="
docker ps | grep postgres || echo "PostgreSQL контейнер не найден"
```

---

## 🔍 Возможные причины постоянных падений

### 1. ⚠️ Нехватка памяти (OOM Killer) - САМАЯ ЧАСТАЯ ПРИЧИНА

**Признаки:**

- Приложение падает внезапно без ошибок в логах
- В системных логах есть `Out of memory` или `OOM`
- Использование памяти > 90% перед падением

**Проверка:**

```bash
# Проверить OOM в системных логах
dmesg | grep -i "out of memory\|oom"
journalctl -k | grep -i "killed process"

# Проверить текущую память
free -h

# Проверить использование памяти процессом
ps aux | grep -E "node|npm" | awk '{print $2, $4, $11}' | sort -k2 -rn
```

**Решение:**

```bash
# Ограничить память для PM2 (автоперезапуск при превышении)
pm2 delete gustaw
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env
pm2 save

# Или добавить swap (если нет)
free -h  # проверить swap
# Если Swap: 0B, то:
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

### 2. 🔐 Неправильные или отсутствующие переменные окружения

**Признаки:**

- Приложение падает при старте
- Ошибки подключения к БД: `Can't reach database server`
- Ошибки NextAuth: `NEXTAUTH_URL is not set`

**Проверка:**

```bash
cd /home/project/gustaw-fin

# Проверить наличие всех обязательных переменных
cat .env | grep -E "^DATABASE_URL=|^NEXTAUTH_URL=|^NEXTAUTH_SECRET=|^SESSION_SECRET=" | wc -l
# Должно быть 4 строки

# Проверить что PM2 видит переменные
pm2 env 0 | grep -E "DATABASE_URL|NEXTAUTH"
```

**Решение:**

```bash
# Убедиться что .env файл существует и правильный
nano .env

# Перезапустить PM2 с обновлением переменных
pm2 restart gustaw --update-env

# Проверить что переменные загрузились
pm2 env 0
```

**Обязательные переменные:**

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://gustaw.ru"
NEXTAUTH_SECRET="..."
SESSION_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

---

### 3. 🗄️ Проблемы с базой данных

**Признаки:**

- Ошибки подключения к БД в логах
- Таймауты при запросах
- `Can't reach database server at`

**Проверка:**

```bash
# Проверить что Docker контейнер с БД запущен
docker ps | grep postgres

# Проверить подключение к БД
cd /home/project/gustaw-fin
npx prisma db push --skip-generate 2>&1 | head -10

# Проверить логи БД
docker logs $(docker ps -q -f "name=postgres") --tail 20
```

**Решение:**

```bash
# Перезапустить БД
cd /home/project/gustaw-fin
docker-compose down
docker-compose up -d

# Подождать пока БД запустится
sleep 5

# Проверить подключение
npx prisma db push --skip-generate

# Перезапустить приложение
pm2 restart gustaw
```

---

### 4. 🔄 Утечка памяти или зависшие процессы

**Признаки:**

- Множество процессов Node.js (должно быть 1-3)
- Порт 3000 занят старым процессом
- `EADDRINUSE: address already in use`

**Проверка:**

```bash
# Подсчитать процессы Node.js
ps aux | grep node | grep -v grep | wc -l
# Должно быть 1-3, если больше - проблема

# Проверить все процессы на порту 3000
ss -tlnp | grep :3000
lsof -i:3000
```

**Решение:**

```bash
# Убить все процессы Node.js
pkill -9 node
pkill -9 npm
fuser -k 3000/tcp

# Подождать
sleep 2

# Запустить заново
cd /home/project/gustaw-fin
pm2 delete all
pm2 start npm --name "gustaw" -- start --update-env
pm2 save

# Проверить что только один процесс
pm2 list
```

---

### 5. 🔁 Перезагрузка сервера без автозапуска PM2

**Признаки:**

- Приложение не запускается после перезагрузки сервера
- `pm2 status` показывает пустой список

**Проверка:**

```bash
# Проверить что PM2 настроен на автозапуск
pm2 startup
# Если выводит команду - выполнить её

# Проверить сохраненную конфигурацию
pm2 save
```

**Решение:**

```bash
# Настроить автозапуск PM2
pm2 startup
# Скопировать и выполнить команду, которую выдаст PM2

# Сохранить текущие процессы
pm2 save
```

---

### 6. 💾 Проблемы с файловой системой / диск переполнен

**Признаки:**

- Ошибки записи в лог
- Приложение не может создать временные файлы
- `ENOSPC: no space left on device`

**Проверка:**

```bash
df -h /
# Если Use% > 95% - проблема

du -sh /home/project/gustaw-fin/.next
du -sh /home/project/gustaw-fin/node_modules
du -sh /var/log
```

**Решение:**

```bash
# Очистить старые логи системы
journalctl --vacuum-time=3d

# Очистить Docker (старые образы, контейнеры)
docker system prune -af

# Удалить старый билд (пересоберется при следующем деплое)
rm -rf /home/project/gustaw-fin/.next

# Очистить npm кэш
npm cache clean --force

# Проверить результат
df -h /
```

---

## 🔧 Типичные проблемы и быстрые решения

### ❌ Приложение не отвечает (502 Bad Gateway)

```bash
# 1. Проверить что приложение запущено
pm2 status

# 2. Если не запущено - запустить
cd /home/project/gustaw-fin
fuser -k 3000/tcp
pm2 delete all
pm2 start npm --name "gustaw" -- start --update-env
pm2 save

# 3. Проверить логи
pm2 logs gustaw --lines 50

# 4. Проверить что приложение отвечает
curl -I http://localhost:3000
```

---

### ❌ Порты заняты (EADDRINUSE)

```bash
# Найти и убить процесс на порту 3000
lsof -i:3000 -t | xargs kill -9
fuser -k 3000/tcp

# Подождать
sleep 2

# Проверить что порт свободен
ss -tlnp | grep :3000

# Если ничего не выведено - порт свободен, можно запускать
pm2 restart gustaw
```

---

### ❌ PM2 завис / не отвечает

```bash
# Убить все процессы PM2
pkill -9 PM2
pkill -9 node
pm2 kill

# Подождать
sleep 2

# Запустить заново
cd /home/project/gustaw-fin
pm2 start npm --name "gustaw" -- start --update-env
pm2 save

# Проверить
pm2 status
```

---

### ❌ Приложение постоянно перезапускается

```bash
# Проверить логи на ошибки
pm2 logs gustaw --lines 50

# Проверить использование памяти
free -h

# Если память заканчивается - ограничить
pm2 delete gustaw
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env
pm2 save
```

---

## ✅ Чек-лист после каждого падения

- [ ] Выполнить команды из секции "Быстрая диагностика"
- [ ] Проверить логи PM2: `pm2 logs gustaw --lines 50`
- [ ] Проверить системные логи: `journalctl -xe -n 50`
- [ ] Проверить OOM Killer: `dmesg | grep -i oom`
- [ ] Проверить использование ресурсов: `free -h && df -h /`
- [ ] Проверить процессы: `ps aux | grep node`
- [ ] Проверить порты: `ss -tlnp | grep :3000`
- [ ] Проверить Nginx: `systemctl status nginx`
- [ ] Проверить переменные окружения: `pm2 env 0`
- [ ] Проверить БД: `docker ps | grep postgres`
- [ ] Записать все выводы в секцию "Записи диагностики" ниже

---

## 📝 Записи диагностики

### Дата: **9 декабря 2025**

**Проблема:** Приложение постоянно падает, 20 перезапусков, ошибки Server Actions

**Выполненные команды и вывод:**

```
PM2 статус: online, но ↺ 20 (20 перезапусков!)
Память: 635Mi / 961Mi (66%), Swap: 416Mi / 2Gi
Диск: 77% заполнен
Приложение отвечает: HTTP/1.1 200 OK

Ошибки в логах:
[Error: Failed to find Server Action "x". This request might be from an older or newer deployment.
⨯ SyntaxError: Unexpected token x in JSON at position 159
```

**Анализ:**

1. **20 перезапусков** - приложение падает и перезапускается
2. **Server Action ошибки** - браузер пытается вызвать старые серверные действия, которых нет в новом коде
3. Это происходит когда:
   - Браузер кэшировал старую версию приложения
   - После деплоя новый код не совместим со старыми клиентскими запросами
   - `.next` может быть частично поврежден

**Решение:**

```bash
# 1. Очистить старый билд
cd /home/project/gustaw-fin
rm -rf .next

# 2. Пересобрать проект
npm run build

# 3. Ограничить память для PM2 (автоперезапуск при превышении 400MB)
pm2 delete gustaw
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env
pm2 save

# 4. Проверить что все работает
pm2 status
curl -I http://localhost:3000
```

**Результат:**

```
✅ Применено: PM2 перезапущен с ограничением памяти --max-memory-restart 400M
✅ Команды выполнены: pm2 delete gustaw → pm2 start с ограничением памяти → pm2 save
⏳ Ожидается: Стабилизация приложения, отсутствие постоянных перезапусков
```

**Статус:** Ожидается подтверждение от пользователя о результатах

---

### Дата: **10 декабря 2025**

**Проблема:** Приложение не запускается - отсутствует `.next` директория. Попытка сборки на сервере зависает из-за нехватки памяти (1 GB RAM).

**Выполненные команды и вывод:**

```
# Проверка swap
free -h
Mem: 961Mi total, 539Mi used
Swap: 2.0Gi total, 406Mi used (19%)

swapon --show
NAME      TYPE SIZE   USED PRIO
/swapfile file   2G 406.8M   -2

# Приложение не запускается
[Error: Could not find a production build in the '.next' directory.
Try building your app with 'next build' before starting the production server.]

# Попытка сборки зависает
npm run build  # Процесс зависает
```

**Анализ:**

1. **Swap в порядке** - 2 GB файл существует и настроен правильно
2. **Проблема не в swap** - используется только 19% (406 MB)
3. **Проблема в памяти сервера** - всего 1 GB RAM недостаточно для сборки Next.js
4. **Next.js сборка требует** - минимум 2-3 GB RAM для комфортной работы
5. **Даже с swap** - сборка может зависать или быть очень медленной (часы)

**Решение:**

Собрать проект **локально** (на Mac) и залить `.next` директорию на сервер через `rsync`:

```bash
# ШАГ 1: На сервере - освободить порт 3000
ssh root@91.210.170.148
kill -9 $(ss -tlnp | grep :3000 | awk '{print $NF}' | cut -d',' -f2 | cut -d'=' -f2) 2>/dev/null
fuser -k 3000/tcp 2>/dev/null
cd /home/project/gustaw-fin

# ШАГ 2: Локально (на Mac) - собрать проект
cd /Users/tapir/Programming/gustaw-fin
git pull origin production
pnpm install
npm run build

# ШАГ 3: Загрузить .next на сервер
rsync -avz --delete .next/ root@91.210.170.148:/home/project/gustaw-fin/.next/

# ШАГ 4: На сервере - запустить приложение
cd /home/project/gustaw-fin
nohup npm start > /tmp/gustaw.log 2>&1 &
sleep 5
curl -I http://localhost:3000
tail -20 /tmp/gustaw.log
```

**Результат:**

```
✅ Swap проверен: 2 GB файл существует и активен (19% используется)
✅ Проблема выявлена: нехватка RAM для сборки (1 GB недостаточно)
✅ Решение применено: локальная сборка + rsync

Выполнено:
- Порт 3000 освобожден
- Проект собран локально на Mac (быстро, без зависаний)
- .next директория загружена на сервер (181 MB, ~36 секунд)
- Приложение запущено через nohup
- Проверка: HTTP/1.1 200 OK, Ready in 1441ms
```

**Статус:** ✅ **ПРОБЛЕМА РЕШЕНА** - Приложение работает

**Рекомендация:** Перевести процесс на PM2 для автозапуска:

```bash
# Остановить nohup процесс
kill %1

# Запустить через PM2
pm2 start npm --name 'gustaw' -- start --max-memory-restart 400M --update-env
pm2 save
```

---

### Дата: **\*\***\_\_\_**\*\***

**Проблема:**
**Выполненные команды и вывод:**

```

```

**Анализ:**

```

```

**Решение:**

```

```

**Результат:**

```

```
