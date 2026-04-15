#!/bin/bash
# Проверка что произошло между 21 и 22 декабря
# Выполните на сервере

echo "=== Что произошло между 21 и 22 декабря? ==="
echo ""

echo "1. Системные логи (ошибки, убитые процессы):"
journalctl --since "2025-12-21 18:00:00" --until "2025-12-22 08:00:00" | grep -iE "error|fail|kill|oom|gustaw|node|npm" | tail -30

echo ""
echo "2. OOM Killer (было ли убийство процесса из-за памяти):"
dmesg | grep -iE "out of memory|oom|killed process" | tail -20

echo ""
echo "3. Логи PM2 (если доступны):"
if [ -f ~/.pm2/logs/gustaw-error.log ]; then
    echo "Последние 50 строк логов ошибок:"
    tail -50 ~/.pm2/logs/gustaw-error.log
else
    echo "Логи PM2 не найдены"
fi

echo ""
echo "4. Текущее использование памяти:"
free -h

echo ""
echo "5. Процессы Node (если есть):"
ps aux | grep -E "node|npm" | grep -v grep

echo ""
echo "6. Когда последний раз перезагружался сервер:"
last reboot | head -5

echo ""
echo "7. Uptime сервера:"
uptime

echo ""
echo "8. Проверка порта 3000:"
ss -tlnp | grep :3000 || echo "Порт 3000 свободен"

echo ""
echo "=== Готово ==="




