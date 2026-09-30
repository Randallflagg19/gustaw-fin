import "dotenv/config";

import { readFile } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";

type PublicPhoto = {
  id: string;
  mediaUrl: string;
  publicId: string;
  createdAt: string;
};

const inputPath = process.argv[2];

if (!inputPath) {
  throw new Error("Укажите путь к JSON-файлу с фотографиями");
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL не задан");
}

const databaseHost = new URL(databaseUrl).hostname;

if (databaseHost !== "localhost" && databaseHost !== "127.0.0.1") {
  throw new Error(`Импорт разрешён только в локальную базу, текущий хост: ${databaseHost}`);
}

const photos = JSON.parse(await readFile(inputPath, "utf8")) as PublicPhoto[];

if (!Array.isArray(photos)) {
  throw new Error("Ожидался JSON-массив фотографий");
}

const uniquePublicIds = new Set<string>();

for (const photo of photos) {
  if (!photo.id || !photo.publicId || !photo.mediaUrl || !photo.createdAt) {
    throw new Error("В выгрузке обнаружена неполная запись");
  }

  if (uniquePublicIds.has(photo.publicId)) {
    throw new Error(`Повторяющийся publicId: ${photo.publicId}`);
  }

  const mediaUrl = new URL(photo.mediaUrl);
  if (
    mediaUrl.protocol !== "https:" ||
    mediaUrl.hostname !== "res.cloudinary.com" ||
    !mediaUrl.pathname.startsWith("/dhnzp0qqr/")
  ) {
    throw new Error(`Недопустимый mediaUrl для ${photo.publicId}`);
  }

  if (Number.isNaN(Date.parse(photo.createdAt))) {
    throw new Error(`Некорректная дата для ${photo.publicId}`);
  }

  uniquePublicIds.add(photo.publicId);
}

const prisma = new PrismaClient();

try {
  const result = await prisma.post.createMany({
    data: photos.map((photo) => ({
      id: photo.id,
      mediaUrl: photo.mediaUrl,
      publicId: photo.publicId,
      mediaType: "IMAGE" as const,
      createdAt: new Date(photo.createdAt),
    })),
    skipDuplicates: true,
  });

  const total = await prisma.post.count({ where: { mediaType: "IMAGE" } });
  console.log(`Добавлено записей: ${result.count}`);
  console.log(`Всего локальных фотографий: ${total}`);
} finally {
  await prisma.$disconnect();
}
