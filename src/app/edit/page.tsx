"use client";
export const dynamic = "force-dynamic";

import { CldImage } from "next-cloudinary";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditPage() {
  const searchParams = useSearchParams();
  const publicId = searchParams.get("publicId");

  const [transformation, setTransformation] = useState<
    undefined | "bg-remove"
  >();

  if (!publicId) {
    return <p>No publicId provided in the URL</p>;
  }

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Редактирование</h1>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => setTransformation("bg-remove")}>
            Убрать фон
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <CldImage
            src={publicId}
            width="400"
            height="300"
            alt="some image"
            priority
          />

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="300"
              height="400"
              removeBackground
              alt="some image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
