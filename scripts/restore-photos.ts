import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

const prisma = new PrismaClient();

// Настройка Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function restorePhotosFromCloudinary() {
    console.log('🔍 Searching for photos in Cloudinary...');

    try {
        // Получаем все изображения из Cloudinary
        const result = await cloudinary.search
            .expression('resource_type:image')
            .max_results(100)
            .execute();

        console.log(`📸 Found ${result.resources.length} images in Cloudinary`);

        // Получаем существующего admin пользователя
        const adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (!adminUser) {
            console.error('❌ No admin user found. Run seed first.');
            return;
        }

        let restoredCount = 0;

        for (const resource of result.resources) {
            // Пропускаем фоновые изображения и служебные
            if (resource.public_id.includes('bg') ||
                resource.public_id.includes('background') ||
                resource.public_id.includes('aweqz8dqpfvpkyqhtpfx')) {
                continue;
            }

            // Проверяем, есть ли уже этот пост
            const existingPost = await prisma.post.findUnique({
                where: { publicId: resource.public_id }
            });

            if (!existingPost) {
                const post = await prisma.post.create({
                    data: {
                        publicId: resource.public_id,
                        mediaUrl: resource.secure_url,
                        mediaType: 'IMAGE',
                        title: `Photo ${resource.public_id}`,
                    },
                });

                console.log(`✅ Restored photo: ${resource.public_id}`);
                restoredCount++;
            } else {
                console.log(`⏭️  Photo already exists: ${resource.public_id}`);
            }
        }

        console.log(`🎉 Restored ${restoredCount} photos from Cloudinary!`);

    } catch (error) {
        console.error('❌ Error accessing Cloudinary:', error);
        console.log('💡 Make sure your Cloudinary credentials are set in .env.local');
    }
}

restorePhotosFromCloudinary()
    .catch((e) => {
        console.error('❌ Restore failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 