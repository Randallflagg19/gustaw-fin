"use client";

import { JSX } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Button } from "@/shared/ui/button";

export const Gallery = (): JSX.Element => {
  return (
    <section className="w-full">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Gallery</h1>
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
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </Button>
            );
          }}
        </CldUploadWidget>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
    </section>
  );
};
