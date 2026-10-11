# Gustav: подготовка и план выкладки — 6 октября 2026

Статус: переключение production НЕ выполнено. В работу включён только Gustav.

## Состав кандидата

Основа: 5c7c42b8738a5a5bf15fbe33c9c4a568bab0aaa7.
Изменены только package.json, pnpm-workspace.yaml, pnpm-lock.yaml: обновления PostCSS, Tailwind, ESLint и закрепления вложенных зависимостей. Next 15.5.27, NextAuth 4.24.15 и React 19.2.1 сохранены.
Исходники приложения и схема/миграции Prisma не меняются. Локальное отключение загрузки, preview .env и локальная БД в релиз не входят.

Кандидат на VPS: /home/tapir/security-work/gustaw-20261006-iteration1.
Исходная рабочая папка: /home/tapir/apps/gustaw-fin.

SHA256 файлов кандидата на Mac и VPS совпадают:
- package.json: 2fb0cff15372263164372b2f252b120684269199fc536d582b79c24402961f19
- pnpm-lock.yaml: 239b97da83a189b0be69f22fff4092626c7fe8a62f2963efab6ff8b168dc81e8
- pnpm-workspace.yaml: a3cd88b1c3c999a67873233acaa421949bae3a98180dc476e4bcfe097e597401

## Проверки

- Mac: frozen-lockfile install, production build, линтер и TypeScript — успешно.
- Mac: HTTP главной, sign-in, sign-up, privacy, terms, чтения фотографий и свободных слотов — 200. Создание бронирования без входа — 401.
- Mac, отдельная локальная БД: регистрация; отказ неверному паролю; вход с правильным; доступ к бронированию; создание брони и MOCK_PAID записи; час становится занят. Созданные тестовые пользователь, бронь и платёж удалены.
- Повторный audit: production 0; полный 1 high в braces, dev-цепочка, GHSA-vfj7-8cjw-p6xm. Не скрывать уведомление.
- VPS: Linux, Node 24.21.0, pnpm 12.5.1; сборка с временными настройками и без production-БД прошла. Финальная сборка с действующим EnvironmentFile также прошла. BUILD_ID: CfZWzIRIuPW6_ETW6hy_e. Короткий запуск на 127.0.0.1:3101 с этими настройками: главная, sign-in, sign-up, session, providers, photos, slots — HTTP 200. Тестовый процесс остановлен, порт освобождён. Проверки на VPS ограничены чтением; тестовые записи создавались только в отдельной локальной БД.
- Google/GitHub OAuth и реальная загрузка Cloudinary ещё не проверены; успешный /api/auth/providers не подтверждает полный вход.

Ограничения: проверки не доказывают отсутствие всех уязвимостей и не являются полным аудитом исходников. Настройка Secure для legacy cookie в исходнике отключена; это существующий отдельный вопрос, не изменение этой итерации.

## План переключения — НЕ выполнять до решения пользователя

Переключить только WorkingDirectory сервиса через отдельный drop-in. ExecStart остаётся /usr/bin/pnpm exec next start -H 127.0.0.1 -p 3100; EnvironmentFile остаётся /home/tapir/apps/gustaw-fin/.env. Nginx, домен gustaw.ru и PostgreSQL не меняются. Исходная папка, node_modules и .next остаются на месте для отката. Не применять устаревшие инструкции со старым удалённым VPS.

Перед переключением: финальная Linux-сборка с текущим env без вывода значений; короткий запуск только на 127.0.0.1:3101 с этими настройками и проверка читающих API; завершить тестовый процесс. Эти сборка и временный запуск уже выполнены; если кандидат/конфигурация изменятся, повторить. Повторно проверить контрольные суммы и состояние исходного сервиса. Не запускать db:reset, seed, db push или migrate.

Для переключения нужен sudo. Агент не располагает sudo без интерактивного пароля; пользователь выполняет следующую группу на VPS после решения. Проверка отсутствия drop-in обязательна.

```bash
test ! -e /etc/systemd/system/gustaw-fin.service.d/90-security-20261006.conf || exit 1
sudo install -d -m 755 /etc/systemd/system/gustaw-fin.service.d
sudo tee /etc/systemd/system/gustaw-fin.service.d/90-security-20261006.conf >/dev/null <<'UNIT'
[Service]
WorkingDirectory=/home/tapir/security-work/gustaw-20261006-iteration1
UNIT
sudo systemctl daemon-reload
sudo systemctl restart gustaw-fin.service
systemctl show gustaw-fin.service -p ActiveState -p MainPID -p NRestarts -p WorkingDirectory
curl --fail --silent --output /dev/null --write-out 'HTTP %{http_code}
' --max-time 10 http://127.0.0.1:3100/
```

Последствия: короткий перерыв при перезапуске возможен; заранее точную длительность не обещаем. Сессии используют прежние secrets. Изменений схемы БД нет; откат не требует отката данных.

После переключения: HTTP через Nginx и публичный домен, вход/выход, галерея/CSS, бронирование, Cloudinary; проверить только относящиеся к новому запуску ошибки, не публикуя секреты или персональные данные. Если процесс падает, главная/API не отвечают или появились новые ошибки авторизации/данных — откатить. Сетевой сбой публичного TLS сам по себе не доказывает дефект приложения; отдельно проверить localhost и Nginx.

## Откат после создания указанного drop-in

Удалить только добавленный файл; исходная рабочая папка не изменялась.

```bash
sudo rm -- /etc/systemd/system/gustaw-fin.service.d/90-security-20261006.conf
sudo systemctl daemon-reload
sudo systemctl restart gustaw-fin.service
systemctl show gustaw-fin.service -p ActiveState -p MainPID -p NRestarts -p WorkingDirectory
curl --fail --silent --output /dev/null --write-out 'HTTP %{http_code}
' --max-time 10 http://127.0.0.1:3100/
```

Ожидаемый WorkingDirectory после отката: /home/tapir/apps/gustaw-fin.
Дополнительный архив: /home/tapir/security-backups/gustaw-20261006-iteration1/baseline.tar.gz (без env/.git), SHA256 76823efc23bf913fe8a915ea606e2993048acfbfd126af689a397b75f4b29302. Его восстановление ещё не испытывалось; основной быстрый откат использует нетронутую папку.

## Финальное состояние перед решением пользователя

Production: active, MainPID 439420, NRestarts 0, WorkingDirectory /home/tapir/apps/gustaw-fin. Drop-in не создан; переключение и перезапуск не выполнялись. Файл next-env.d.ts генерируется Next при сборке; это ожидаемый служебный результат, не дополнительная правка приложения в security-патче. Локальный временный production-сервер 3001 остановлен; прежний изолированный dev-preview на 3000 остаётся для пользователя.
