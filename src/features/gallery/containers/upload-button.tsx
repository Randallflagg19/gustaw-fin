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
  const [, startTransition] = useTransition();

  return (
    <CldUploadWidget
      config={{ cloud: { cloudName: "dhnzp0qqr" } }}
      uploadPreset="rk3q1ykf"
      onSuccess={({ info }) => {
        if (info) {
          const file = info as CloudinaryUploadWidgetInfo;
          startTransition(async () => {
            const result = await createPostAction({
              secure_url: file.secure_url,
              resource_type: file.resource_type,
              public_id: file.public_id,
            });

            if (result.success) {
              // Notify about new upload
              const newImage = {
                id: result.post.id,
                mediaUrl: result.post.mediaUrl,
                publicId: result.post.publicId,
                createdAt: result.post.createdAt,
                likesCount: 0,
                commentCount: 0,
              };
              localStorage.setItem('newUpload', JSON.stringify(newImage));
              // Trigger storage event manually since we're in the same window
              window.dispatchEvent(new StorageEvent('storage', {
                key: 'newUpload',
                newValue: JSON.stringify(newImage)
              }));

              router.refresh();
            } else {
              console.error("Не удалось создать пост");
            }
          });
        }
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
