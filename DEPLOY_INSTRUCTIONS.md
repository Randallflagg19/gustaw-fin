# 🚀 Инструкция по деплою Google OAuth на продакшен

## 📋 Что нужно сделать на сервере gustaw.ru

### 1️⃣ Обновить `.env` файл на сервере

Добавьте эти переменные в `.env` на **продакшен сервере**:

```env
# NextAuth (НОВЫЕ переменные)
NEXTAUTH_URL="https://gustaw.ru"
NEXTAUTH_SECRET="FmnFGdttgGdCRmt7/ivQ08VdoB26xy7hU+pmuMkrDZs="

# Google OAuth (НОВЫЕ переменные)
GOOGLE_CLIENT_ID="ваш-реальный-client-id-из-google-console"
GOOGLE_CLIENT_SECRET="ваш-реальный-client-secret-из-google-console"
```

**⚠️ ВАЖНО:**

- `DATABASE_URL` — оставьте как есть (ваш существующий)
- `SESSION_SECRET` — оставьте как есть (ваш существующий)
- `CLOUDINARY_*` — оставьте как есть (ваши существующие)

---

### 2️⃣ Применить миграции Prisma

После деплоя кода на сервер, выполните **на сервере**:

```bash
# Вариант 1 (если используете миграции)
npx prisma migrate deploy

# Вариант 2 (если используете db push)
npx prisma db push
```

Это создаст новые таблицы в базе данных:

- `Account` (для связи с Google OAuth)
- `Session` (для NextAuth сессий)
- `VerificationToken` (для верификации)

---

### 3️⃣ Обновить Google Cloud Console

1. Зайти в [Google Cloud Console](https://console.cloud.google.com/)
2. Перейти в **APIs & Services** → **Credentials**
3. Выбрать ваш OAuth 2.0 Client ID
4. В секции **Authorized redirect URIs** нажать **Add URI**
5. Добавить:
   ```
   https://gustaw.ru/api/auth/callback/google
   ```
6. Нажать **Save**

---

### 4️⃣ Проверить что страницы доступны

Убедитесь, что эти страницы открываются:

- https://gustaw.ru/privacy
- https://gustaw.ru/terms

---

### 5️⃣ Протестировать OAuth

1. Открыть https://gustaw.ru/sign-in
2. Нажать кнопку "Войти через Google"
3. Выбрать аккаунт Google
4. Разрешить доступ
5. Должно перенаправить на https://gustaw.ru (авторизованным)

---

## ✅ Чеклист перед деплоем

- [ ] Код закоммичен и запушен в репозиторий
- [ ] `.env` на сервере обновлён (добавлены NEXTAUTH*\* и GOOGLE*\*)
- [ ] `DATABASE_URL` на сервере правильный (не перезаписали!)
- [ ] Prisma миграции применены (`npx prisma migrate deploy`)
- [ ] Google Console обновлён (добавлен redirect URI для gustaw.ru)
- [ ] Страницы `/privacy` и `/terms` доступны на проде
- [ ] Приложение перезапущено (если нужно)

---

## 🔍 Проверка после деплоя

### 1. Проверить страницы:

```bash
curl -I https://gustaw.ru/privacy | grep "200 OK"
curl -I https://gustaw.ru/terms | grep "200 OK"
```

### 2. Проверить что NextAuth endpoint работает:

```bash
curl -I https://gustaw.ru/api/auth/signin | grep "200 OK"
```

### 3. Проверить базу данных (на сервере):

```bash
npx prisma studio
# Должны видеть новые таблицы: Account, Session, VerificationToken
```

---

## 🐛 Если что-то не работает

### Ошибка: "Error: Invalid OAuth callback URL"

**Решение:** Проверьте что в Google Console добавлен правильный redirect URI:

```
https://gustaw.ru/api/auth/callback/google
```

### Ошибка: "Can't reach database server"

**Решение:**

- Проверьте `DATABASE_URL` в `.env` на сервере
- Убедитесь что PostgreSQL запущен (`docker compose ps` или `systemctl status postgresql`)

### Ошибка: "Table 'Account' does not exist"

**Решение:** Запустите миграции Prisma:

```bash
npx prisma db push
```

### Ошибка: "[next-auth][error][NO_SECRET]"

**Решение:** Добавьте `NEXTAUTH_SECRET` в `.env`:

```env
NEXTAUTH_SECRET="FmnFGdttgGdCRmt7/ivQ08VdoB26xy7hU+pmuMkrDZs="
```

---

## 📞 Контакты

Если что-то пошло не так:

- Email: lextapir191919@gmail.com
- Документация NextAuth: https://next-auth.js.org/
- Документация Google OAuth: https://developers.google.com/identity/protocols/oauth2

---

## 🎉 После успешного деплоя

Теперь пользователи могут:

- ✅ Войти через Google на https://gustaw.ru
- ✅ Ставить лайки (они сохранятся)
- ✅ Видеть свои лайки после повторного входа

**Готово к Production mode?**
Когда будете готовы разрешить вход всем (не только Test users):

1. В Google Console нажать "Publish app"
2. Дождаться верификации Google (1-4 недели)
