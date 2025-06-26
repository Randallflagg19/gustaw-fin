"use client";

import { useEffect, useState } from "react";

// Cloudinary public ID твоего фона (получишь после загрузки)
const BG_PUBLIC_ID = "aweqz8dqpfvpkyqhtpfx";

// Cloudinary трансформации
const getCloudinaryUrl = (publicId: string, options: { blur?: boolean } = {}) => {
  const transformations = options.blur
    ? "c_scale,w_30,e_blur:1000"  // Маленькая и размытая версия
    : "q_auto:good,f_auto";       // Оптимальное качество и формат

  return `https://res.cloudinary.com/dhnzp0qqr/image/upload/${transformations}/${publicId}`;
};

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function Background({ children, className = "" }: BackgroundProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = getCloudinaryUrl(BG_PUBLIC_ID);
    img.onload = () => setLoaded(true);
  }, []);

  const bgUrl = loaded
    ? getCloudinaryUrl(BG_PUBLIC_ID)
    : getCloudinaryUrl(BG_PUBLIC_ID, { blur: true });

  return (
    <div
      className={`min-h-screen flex flex-col grow font-sans antialiased dark
        bg-repeat bg-fixed
        transition-[background-image] duration-500
        ${className}`}
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      {children}
    </div>
  );
} 