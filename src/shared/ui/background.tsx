"use client";

import { useEffect, useState } from "react";

// Cloudinary public ID твоего фона
const BG_PUBLIC_ID = "aweqz8dqpfvpkyqhtpfx";

// Cloudinary трансформации
const getCloudinaryUrl = (publicId: string, options: {
  blur?: boolean;
  width?: number;
  quality?: number;
} = {}) => {
  const transformations = [];

  if (options.blur) {
    transformations.push("c_scale,w_30,e_blur:1000");
  } else {
    if (options.width) {
      transformations.push(`w_${options.width}`);
    }
    if (options.quality) {
      transformations.push(`q_${options.quality}`);
    }
    transformations.push("f_auto");
  }

  return `https://res.cloudinary.com/dhnzp0qqr/image/upload/${transformations.join(",")}/${publicId}`;
};

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function Background({ children, className = "" }: BackgroundProps) {
  const [loaded, setLoaded] = useState(false);
  const [finalImageLoaded, setFinalImageLoaded] = useState(false);

  useEffect(() => {
    // Load blur placeholder immediately
    const placeholderImg = new window.Image();
    placeholderImg.src = getCloudinaryUrl(BG_PUBLIC_ID, { blur: true });
    placeholderImg.onload = () => setLoaded(true);

    // Start loading final image
    const finalImg = new window.Image();
    // Use responsive width based on screen size
    const width = window.innerWidth <= 768 ? 1024 : 1920;
    finalImg.src = getCloudinaryUrl(BG_PUBLIC_ID, {
      width,
      quality: 75 // Reduced quality for faster loading while maintaining good appearance
    });
    finalImg.onload = () => setFinalImageLoaded(true);
  }, []);

  const currentBgUrl = finalImageLoaded
    ? getCloudinaryUrl(BG_PUBLIC_ID, {
      width: window.innerWidth <= 768 ? 1024 : 1920,
      quality: 75
    })
    : loaded
      ? getCloudinaryUrl(BG_PUBLIC_ID, { blur: true })
      : "none";

  return (
    <div
      className={`min-h-screen flex flex-col grow font-sans antialiased dark
        bg-repeat bg-fixed
        transition-[background-image] duration-500
        ${className}`}
      style={{
        backgroundImage: `url(${currentBgUrl})`,
      }}
    >
      {children}
    </div>
  );
} 