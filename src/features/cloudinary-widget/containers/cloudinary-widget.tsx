"use client";

import { JSX, useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

export const CloudinaryWidget = (): JSX.Element => {
  const [imageId, setImageId] = useState("");

  return (
    <>
      <CldUploadWidget
        uploadPreset="rk3q1ykf"
        onSuccess={(result) => {
          const info = result.info as CloudinaryUploadWidgetInfo;
          setImageId(info.public_id);
        }}
      >
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>

      {imageId && (
        <CldImage
          width="400"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </>
  );
};
