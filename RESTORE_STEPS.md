# 🔧 Восстановление приложения - команды для копирования

## 📋 ШАГ 1: На сервере - освободить порт 3000

```bash
ssh root@91.210.170.148
```

```bash
ss -tlnp | grep :3000
```

```bash
kill -9 $(ss -tlnp | grep :3000 | awk '{print $NF}' | cut -d',' -f2 | cut -d'=' -f2) 2>/dev/null
fuser -k 3000/tcp 2>/dev/null
```

```bash
ss -tlnp | grep :3000
```

```bash
cd /home/project/gustaw-fin
exit
```

---

## 📋 ШАГ 2: Локально - собрать проект

```bash
cd /Users/tapir/Programming/gustaw-fin
```

```bash
git pull origin production
```

```bash
pnpm install
```

```bash
npm run build
```

```bash
ls -la .next
```

---

## 📋 ШАГ 3: Загрузить .next на сервер

```bash
cd /Users/tapir/Programming/gustaw-fin
rsync -avz --delete .next/ root@91.210.170.148:/home/project/gustaw-fin/.next/
```

---

## 📋 ШАГ 4: На сервере - запустить приложение

```bash
ssh root@91.210.170.148
```

```bash
cd /home/project/gustaw-fin
```

```bash
ls -la .next
```

```bash
nohup npm start > /tmp/gustaw.log 2>&1 &
```

```bash
sleep 10
```

```bash
curl -I http://localhost:3000
```

```bash
tail -20 /tmp/gustaw.log
```

```bash
ps aux | grep -E "npm|next|node" | grep -v grep
```

---

## ✅ Проверка в браузере

Откройте: https://gustaw.ru

