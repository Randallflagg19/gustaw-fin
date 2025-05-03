import { UploadButton } from "./upload-button";
import cloudinary from "cloudinary";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";

type SearchResult = {
  public_id: string;
};

export async function Gallery() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-4">
          {results.resources.map((result) => {
            return (
              <CloudinaryImage
                key={result.public_id}
                public_id={result.public_id}
                width="400"
                height="300"
                alt="Gallery image"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

{
  /*<svg*/
}
{
  /*  xmlns="http://www.w3.org/2000/svg"*/
}
{
  /*  fill="none"*/
}
{
  /*  viewBox="0 0 24 24"*/
}
{
  /*  strokeWidth={1.5}*/
}
{
  /*  stroke="currentColor"*/
}
{
  /*  className="size-6"*/
}
{
  /*>*/
}
{
  /*  <path*/
}
{
  /*    strokeLinecap="round"*/
}
{
  /*    strokeLinejoin="round"*/
}
{
  /*    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"*/
}
{
  /*  />*/
}
{
  /*</svg>*/
}
