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
      onSuccess={({ info }) => {
        fetch("/api/posts/create", {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              router.refresh();
            } else {
              console.error("Не удалось создать пост");
            }
          });
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
