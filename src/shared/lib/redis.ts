// Redis отключён для стабильной работы
// Все функции кэширования работают в no-op режиме

// Типы для кэша
export interface CacheConfig {
    key: string;
    ttl?: number; // время жизни в секундах
}

// Утилиты для кэширования с полным fallback (без Redis)
export const cache = {
    // Получить данные из кэша - всегда возвращаем null (нет кэша)
    async get<T>(key: string): Promise<T | null> {
        return null;
    },

    // Сохранить данные в кэш - ничего не делаем
    async set<T>(key: string, value: T, ttl: number = 300): Promise<void> {
        // No-op
    },

    // Удалить из кэша - ничего не делаем
    async del(key: string): Promise<void> {
        // No-op
    },

    // Инвалидировать кэш по паттерну - ничего не делаем
    async invalidatePattern(pattern: string): Promise<void> {
        // No-op
    },

    // Генерация ключей кэша (для совместимости)
    keys: {
        likeCount: (postId: string) => `like_count:${postId}`,
        userLiked: (userId: string, postId: string) => `user_liked:${userId}:${postId}`,
        photosSummary: (photoIds: string[], userId?: string) =>
            `photos_summary:${photoIds.sort().join(",")}:${userId || "guest"}`,
        photosPage: (page: number, pageSize: number) =>
            `photos_page:${page}:${pageSize}`,
    },
}; 