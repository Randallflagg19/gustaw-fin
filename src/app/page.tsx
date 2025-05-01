'use client'

import { useState } from "react";

export default function Home() {

  const [postsCount, setPostsCount] = useState(4);

  // Функция-обработчик клика
  const handleAddPost = () => {
    setPostsCount(prev => prev + 1);
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-8 pb-20 gap-y-8">

      {/* Заголовок */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-5xl">
        Этот сайт посвящён самому важному существу в этой галактике.
      </h1>

      {/* Сторис */}
      <div className="w-full max-w-4xl mx-auto overflow-x-auto px-4">
        <div className="flex justify-start space-x-4">
          {[...Array(7)].map((_, idx) => (
            <div
              key={idx}
              className="
                      flex-shrink-0
                      w-24 h-36         /* на самых маленьких — 24×36 */
                      sm:w-28 sm:h-40   /* на sm — 28×40 */
                      md:w-32 md:h-48   /* на md+ — 32×48 */
                      bg-gray-300 rounded-lg
                    "
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleAddPost}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Добавить пост
      </button>

      {/* Посты (плейсхолдеры фото/видео) */}
      <div className="w-full max-w-4xl">
        <h2 className="sr-only">Посты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(postsCount)].map((_, idx) => (
            <div
              key={idx}
              className="w-full aspect-square bg-gray-300 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
//favorites добавить