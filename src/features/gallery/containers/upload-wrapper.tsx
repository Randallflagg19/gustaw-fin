"use client";

import useStore from "@/features/user/user";
import { UploadButton } from "@/features/gallery/containers/upload-button";
import React from "react";

export function UploadWrapper() {
  const { user } = useStore();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        {user?.role === "ADMIN" && <UploadButton />}
      </div>
    </div>
  );
}
