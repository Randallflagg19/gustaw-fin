"use client";

import { JSX, useState } from "react";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { Button } from "@/shared/ui/button";
import { UploadIcon } from "@/shared/ui/icons/upload";

export const UploadButton = (): JSX.Element => {
  // const [imageId, setImageId] = useState("");
  return (
    <CldUploadWidget
      uploadPreset="rk3q1ykf"
      onSuccess={(result) => {
        // const info = result.info as CloudinaryUploadWidgetInfo;
        // setImageId(info.public_id);
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
    // {imageId && (
    //   <CldImage
    //     width="400"
    //     height="300"
    //     src={imageId}
    //     sizes="100vw"
    //     alt="Description of my image"
    //   />
    // )}
  );
};
