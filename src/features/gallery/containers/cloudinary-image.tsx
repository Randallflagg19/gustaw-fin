"use client";

import { CldImage, type CldImageProps } from "next-cloudinary";

// Описываем наши пропы:
// — все пропы CldImageProps, кроме `src`
// — плюс наш строковый public_id из облака
type Props = Omit<CldImageProps, "src"> & {
  public_id: string;
};

export function CloudinaryImage({ public_id, ...rest }: Props) {
  // передаём public_id в src, остальные опции (width, height, alt и т.д.) — как есть
  return <CldImage src={public_id} {...rest} />;
}
