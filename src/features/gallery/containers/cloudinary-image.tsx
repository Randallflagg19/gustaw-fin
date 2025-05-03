"use client";

import { CldImage } from "next-cloudinary";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
export function CloudinaryImage(props: any) {
  return <CldImage {...props} />;
}
