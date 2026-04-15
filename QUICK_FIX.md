# 🔧 Быстрое восстановление приложения

## Проблема
- Приложение не запускается: отсутствует `.next` директория
- Сборка на сервере зависает из-за нехватки памяти (1 GB RAM недостаточно)

## Решение: Локальная сборка + загрузка на сервер

### ✅ ШАГ 1: На сервере - освободить порт 3000

```bash
ssh root@91.210.170.148

# Убить процессы на порту 3000
ss -tlnp | grep :3000
# Если есть процесс - скопируйте PID и выполните:
kill -9 <PID>
fuser -k 3000/tcp 2>/dev/null

# Проверить что порт свободен
ss -tlnp | grep :3000
# Должно быть пусто

cd /home/project/gustaw-fin
exit
```

---

### ✅ ШАГ 2: Локально (на Mac) - собрать проект

```bash
cd /Users/tapir/Programming/gustaw-fin

# Обновить код (если нужно)
git pull origin production

# Установить зависимости (если обновились)
pnpm install

# Собрать проект
npm run build

# Проверить что сборка успешна
ls -la .next
# Должна быть директория .next с файлами
```

---

### ✅ ШАГ 3: Загрузить .next на сервер

```bash
# На Mac
cd /Users/tapir/Programming/gustaw-fin

# Загрузить .next директорию (около 180-200 MB)
rsync -avz --delete .next/ root@91.210.170.148:/home/project/gustaw-fin/.next/

# Введите пароль при запросе
# Загрузка займет 1-2 минуты
```

---

### ✅ ШАГ 4: На сервере - запустить приложение

```bash
ssh root@91.210.170.148
cd /home/project/gustaw-fin

# Проверить что .next загружен
ls -la .next

# Запустить приложение
nohup npm start > /tmp/gustaw.log 2>&1 &

# Подождать 10 секунд
sleep 10

# Проверить что работает
curl -I http://localhost:3000
# Должен вернуть: HTTP/1.1 200 OK

# Посмотреть логи
tail -20 /tmp/gustaw.log

# Проверить процесс
ps aux | grep -E "npm|next|node" | grep -v grep
```

---

## ✅ Проверка работы

```bash
# На сервере
curl -I http://localhost:3000

# В браузере
https://gustaw.ru
```

---

## 🐛 Если что-то пошло не так

### Проблема: `rsync` не работает

```bash
# Проверить SSH соединение
ssh root@91.210.170.148

# Попробовать загрузить через scp (медленнее)
cd /Users/tapir/Programming/gustaw-fin
tar -czf .next.tar.gz .next/
scp .next.tar.gz root@91.210.170.148:/home/project/gustaw-fin/
# На сервере:
ssh root@91.210.170.148
cd /home/project/gustaw-fin
tar -xzf .next.tar.gz
rm .next.tar.gz
```

### Проблема: Приложение не запускается

```bash
# Проверить логи
tail -50 /tmp/gustaw.log

# Проверить порт
ss -tlnp | grep :3000

# Проверить .next
ls -la .next

# Если ошибка - проверить переменные окружения
cat .env | grep -E "DATABASE_URL|NEXTAUTH"
```

---

## 📊 Почему это работает

- **Сервер**: 1 GB RAM недостаточно для сборки Next.js
- **Локальный Mac**: Достаточно ресурсов для быстрой сборки
- **rsync**: Быстрая и надежная синхронизация файлов
- **Время**: Локальная сборка ~1-2 минуты, на сервере может зависать часами

---

**Последнее обновление**: 10 декабря 2025
