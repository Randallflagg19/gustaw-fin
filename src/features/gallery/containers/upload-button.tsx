"use client";

import { JSX, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/shared/ui/button";
import { UploadIcon } from "@/shared/ui/icons/upload";
import { createPostAction } from "@/features/gallery/actions/createPostAction";
import type { CloudinaryUploadWidgetInfo } from "next-cloudinary";

export const UploadButton = (): JSX.Element => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <CldUploadWidget
      config={{ cloud: { cloudName: "dhnzp0qqr" } }}
      uploadPreset="rk3q1ykf"
      onSuccess={({ info }) => {
        const file = info as CloudinaryUploadWidgetInfo;

        startTransition(async () => {
          const result = await createPostAction({
            secure_url: file.secure_url,
            resource_type: file.resource_type,
          });

          if (result.success) {
            router.refresh();
          } else {
            console.error("Не удалось создать пост");
          }
        });
      }}
    >
      {({ open }) => (
        <Button onClick={() => open()}>
          <UploadIcon />
          Upload
        </Button>
      )}
    </CldUploadWidget>
  );
};
