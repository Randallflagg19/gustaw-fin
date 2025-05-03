"use client";

import { JSX } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/shared/ui/button";
import { UploadIcon } from "@/shared/ui/icons/upload";

export const UploadButton = (): JSX.Element => {
  const router = useRouter();
  return (
    <CldUploadWidget
      uploadPreset="rk3q1ykf"
      onSuccess={() => {
        setTimeout(() => {
          router.refresh();
        }, 3000);
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()}>
            <UploadIcon />
            Upload
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
