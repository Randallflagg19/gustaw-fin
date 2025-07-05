import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupPlaceholders() {
    console.log('🧹 Cleaning up placeholder images...');

    try {
        // Сначала удаляем лайки для placeholder постов
        const likesResult = await prisma.like.deleteMany({
            where: {
                postId: {
                    startsWith: 'placeholder_'
                }
            }
        });

        console.log(`✅ Deleted ${likesResult.count} likes for placeholder images`);

        // Теперь удаляем сами placeholder изображения
        const result = await prisma.post.deleteMany({
            where: {
                publicId: {
                    startsWith: 'placeholder_'
                }
            }
        });

        console.log(`✅ Deleted ${result.count} placeholder images`);

        console.log('🎉 Cleanup completed!');

    } catch (error) {
        console.error('❌ Cleanup failed:', error);
    }
}

cleanupPlaceholders()
    .catch((e) => {
        console.error('❌ Script failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 