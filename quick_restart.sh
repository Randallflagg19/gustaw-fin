#!/bin/bash
# Быстрый перезапуск сервера - выполните на сервере
cd /home/project/gustaw-fin

echo "=== Шаг 1: Проверка статуса PM2 ==="
pm2 status

echo ""
echo "=== Шаг 2: Остановка приложения ==="
pm2 delete gustaw 2>/dev/null || echo "Приложение не найдено"

echo ""
echo "=== Шаг 3: Освобождение порта 3000 ==="
fuser -k 3000/tcp 2>/dev/null || echo "Порт свободен"

echo ""
echo "=== Шаг 4: Проверка базы данных ==="
docker compose ps | grep postgres || docker compose up -d main-db

echo ""
echo "=== Шаг 5: Запуск приложения ==="
pm2 start npm --name "gustaw" -- start --max-memory-restart 400M --update-env

echo ""
echo "=== Шаг 6: Сохранение конфигурации ==="
pm2 save

echo ""
echo "=== Шаг 7: Ожидание запуска (5 секунд) ==="
sleep 5

echo ""
echo "=== Шаг 8: Проверка статуса ==="
pm2 status

echo ""
echo "=== Шаг 9: Проверка доступности ==="
curl -I http://localhost:3000 2>&1 | head -3

echo ""
echo "=== Шаг 10: Последние логи (если есть ошибки) ==="
pm2 logs gustaw --lines 15 --nostream | tail -20

