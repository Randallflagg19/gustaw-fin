-- Скрипт для улучшения производительности базы данных
-- Применить после развертывания основных миграций

-- Индекс для сортировки постов по дате создания (используется в галерее)
CREATE INDEX IF NOT EXISTS "idx_posts_created_at_desc" ON "Post"("createdAt" DESC);

-- Индекс для фильтрации постов по типу медиа
CREATE INDEX IF NOT EXISTS "idx_posts_media_type" ON "Post"("mediaType");

-- Составной индекс для постов (тип + дата)
CREATE INDEX IF NOT EXISTS "idx_posts_media_type_created_at" ON "Post"("mediaType", "createdAt" DESC);

-- Индекс для подсчета лайков по посту
CREATE INDEX IF NOT EXISTS "idx_likes_post_id" ON "Like"("postId");

-- Индекс для поиска лайков пользователя
CREATE INDEX IF NOT EXISTS "idx_likes_user_id" ON "Like"("userId");

-- Индекс для комментариев по посту
CREATE INDEX IF NOT EXISTS "idx_comments_post_id" ON "Comment"("postId");

-- Индекс для комментариев по автору
CREATE INDEX IF NOT EXISTS "idx_comments_author_id" ON "Comment"("authorId");

-- Индекс для поиска пользователей по логину (для авторизации)
CREATE INDEX IF NOT EXISTS "idx_users_login" ON "User"("login");

-- Индекс для поиска пользователей по email
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "User"("email");

-- Индекс для сессий верификации
CREATE INDEX IF NOT EXISTS "idx_verification_expires_at" ON "VerificationCode"("expiresAt");

-- Частичный индекс для активных бронирований
CREATE INDEX IF NOT EXISTS "idx_bookings_active" ON "Booking"("status", "dateTime") 
WHERE "status" IN ('PENDING', 'CONFIRMED');

-- Индекс для платежей по статусу
CREATE INDEX IF NOT EXISTS "idx_payments_status" ON "Payment"("status");

-- Составной индекс для поиска платежей
CREATE INDEX IF NOT EXISTS "idx_payments_status_created_at" ON "Payment"("status", "createdAt" DESC);

-- Проверка созданных индексов
SELECT schemaname, tablename, indexname, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND indexname LIKE 'idx_%' 
ORDER BY tablename, indexname; 