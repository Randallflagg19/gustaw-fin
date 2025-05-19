// // src/features/gallery/actions/toggleLikeActions.ts
// "use server";
//
// import { prisma } from "@/shared/lib/db";
// // Предположим, у вас есть helper для получения текущего залогиненного пользователя
// import { getCurrentUser } from "@/shared/lib/sessionService";
//
// interface ToggleLikeArgs {
//   publicId: string;
//   isFavorite: boolean;
// }
//
// export async function setAsFavoriteAction(
//   publicId: string,
//   isFavorite: boolean,
// ) {
//   // 1) Убедимся, что пользователь авторизован
//   const currentUser = await getCurrentUser();
//   if (!currentUser) {
//     throw new Error("User not authenticated");
//   }
//
//   // 2) Найдём запись Post по mediaUrl = publicId
//   const post = await prisma.post.findUnique({
//     where: { mediaUrl: publicId },
//   });
//   if (!post) {
//     throw new Error("Post not found");
//   }
//
//   // 3) В зависимости от флага isFavorite – создаём или удаляем лайк
//   if (isFavorite) {
//     // Создаём новый Like (если он ещё не существует, иначе будет ошибка уникальности)
//     try {
//       await prisma.like.create({
//         data: {
//           user: { connect: { id: currentUser.id } },
//           post: { connect: { id: post.id } },
//         },
//       });
//     } catch (e: any) {
//       // Вдруг уже есть лайк (@@unique([userId, postId])) – просто игнорируем
//       if (e.code === "P2002" && e.meta?.target?.includes("userId_postId")) {
//         // Лайк уже есть, ничего делать не нужно
//       } else {
//         throw e;
//       }
//     }
//   } else {
//     // Удаляем лайк (если он есть)
//     await prisma.like.deleteMany({
//       where: {
//         userId: currentUser.id,
//         postId: post.id,
//       },
//     });
//   }
//
//   // 4) (Опционально) ревайдалим нужный маршрут, чтобы Server Components обновили счётчики:
//   // import { revalidatePath } from "next/cache";
//   // revalidatePath("/gallery");  // замените на нужный вам путь
// }
