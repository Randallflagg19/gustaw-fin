// app/page.tsx (или pages/index.tsx для старых версий)
"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const stories = [
  { id: 1, thumbnail: "/gustaw1.jpg" },
  { id: 2, thumbnail: "/gustaw2.jpg" },
  { id: 3, thumbnail: "/gustaw3.jpg" },
];

export default function GustawLanding() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e2f] via-[#2e2e4f] to-[#1e1e2f] animate-gradient z-0" />

      {/* Частицы */}
      <Particles
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { speed: 0.4 },
            opacity: { value: 0.4 },
          },
        }}
      />

      {/* Контент поверх */}
      <div className="relative z-10 flex flex-col items-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-6">Добро пожаловать к Густаву 😺</h1>

        {/* Сторис */}
        <div className="flex space-x-4 overflow-x-auto p-4 bg-black/30 rounded-xl mb-10">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-20 h-20 rounded-full border-4 border-yellow-500 bg-center bg-cover"
              style={{ backgroundImage: `url(${story.thumbnail})` }}
            />
          ))}
        </div>

        <p className="text-xl text-center max-w-xl">
          Самый ласковый кот на свете. Запишитесь на сеанс поглаживания или просто полюбуйтесь 😻
        </p>
      </div>

      {/* Волны */}
      <svg
        className="absolute bottom-0 w-full z-0"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#4b0082"
          fillOpacity="1"
          d="M0,160L40,186.7C80,213,160,267,240,277.3C320,288,400,256,480,245.3C560,235,640,245,720,261.3C800,277,880,299,960,282.7C1040,267,1120,213,1200,202.7C1280,192,1360,224,1400,240L1440,256V320H0Z"
        ></path>
      </svg>
    </div>
  );
}
