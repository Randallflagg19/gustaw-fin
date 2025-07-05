import { PrismaClient } from '@prisma/client';
import { passwordService } from '../src/entities/user/services/password';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Создаем тестового пользователя
    const { hash, salt } = await passwordService.hashPassword('password');

    // Сначала проверяем, есть ли пользователь
    const existingUser = await prisma.user.findFirst({
        where: { login: 'admin' }
    });

    const user = existingUser || await prisma.user.create({
        data: {
            login: 'admin',
            email: 'admin@example.com',
            passwordHash: hash,
            salt: salt,
            role: 'ADMIN',
        },
    });

    console.log('✅ Created user:', user.login);

    // Создаем тестовые посты с рабочими изображениями
    const testPosts = [
        {
            publicId: 'placeholder_1',
            mediaUrl: 'https://picsum.photos/400/600?random=1',
            mediaType: 'IMAGE' as const,
            title: 'Placeholder Image 1',
        },
        {
            publicId: 'placeholder_2',
            mediaUrl: 'https://picsum.photos/400/800?random=2',
            mediaType: 'IMAGE' as const,
            title: 'Placeholder Image 2',
        },
        {
            publicId: 'placeholder_3',
            mediaUrl: 'https://picsum.photos/400/500?random=3',
            mediaType: 'IMAGE' as const,
            title: 'Placeholder Image 3',
        },
        {
            publicId: 'placeholder_4',
            mediaUrl: 'https://picsum.photos/400/700?random=4',
            mediaType: 'IMAGE' as const,
            title: 'Placeholder Image 4',
        },
    ];

    for (const postData of testPosts) {
        const existingPost = await prisma.post.findUnique({
            where: { publicId: postData.publicId }
        });

        if (!existingPost) {
            const post = await prisma.post.create({
                data: postData,
            });
            console.log('✅ Created post:', post.title);

            // Добавляем тестовые лайки
            const existingLike = await prisma.like.findUnique({
                where: {
                    userId_postId: {
                        userId: user.id,
                        postId: post.publicId,
                    },
                },
            });

            if (!existingLike) {
                await prisma.like.create({
                    data: {
                        userId: user.id,
                        postId: post.publicId,
                    },
                });
                console.log('✅ Added like for post:', post.title);
            }
        } else {
            console.log('⏭️  Post already exists:', postData.title);
        }
    }

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 