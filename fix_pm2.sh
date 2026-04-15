#!/bin/bash
# Исправление зависшего PM2 и запуск приложения
cd /home/project/gustaw-fin

echo "=== Шаг 1: Проверка процессов PM2 ==="
ps aux | grep -E "PM2|pm2" | grep -v grep

echo ""
echo "=== Шаг 2: Убийство всех процессов PM2 ==="
pkill -9 PM2
pkill -9 pm2
pm2 kill 2>/dev/null || echo "PM2 kill выполнен"

echo ""
echo "=== Шаг 3: Очистка порта 3000 ==="
fuser -k 3000/tcp 2>/dev/null || echo "Порт свободен"
pkill -9 node 2>/dev/null || echo "Node процессы очищены"

echo ""
echo "=== Шаг 4: Ожидание очистки (2 секунды) ==="
sleep 2

echo ""
echo "=== Шаг 5: Проверка базы данных ==="
docker compose ps | grep postgres || docker compose up -d main-db

echo ""
echo "=== Шаг 6: Проверка что .next директория существует ==="
if [ ! -d ".next" ]; then
    echo "ОШИБКА: .next директория не найдена!"
    echo "Нужно собрать проект: npm run build"
    exit 1
else
    echo "✓ .next директория найдена"
fi

echo ""
echo "=== Шаг 7: Запуск PM2 заново ==="
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env

echo ""
echo "=== Шаг 8: Сохранение конфигурации ==="
pm2 save

echo ""
echo "=== Шаг 9: Ожидание запуска (5 секунд) ==="
sleep 5

echo ""
echo "=== Шаг 10: Проверка статуса ==="
pm2 list

echo ""
echo "=== Шаг 11: Проверка доступности ==="
curl -I http://localhost:3000 2>&1 | head -5

echo ""
echo "=== Шаг 12: Логи (последние 20 строк) ==="
pm2 logs gustaw --lines 20 --nostream 2>&1 | tail -25

