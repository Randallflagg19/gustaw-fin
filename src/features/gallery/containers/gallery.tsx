import cloudinary from "cloudinary";
import { UploadButton } from "./upload-button";
import { CloudinaryImage } from "./cloudinary-image";

export type SearchResult = {
  public_id: string;
  tags: string[];
  height: string;
  width: string;
};

export async function Gallery() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    // .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .max_results(3)
    .with_field("tags")
    .execute()) as { resources: SearchResult[] };

  console.log(results);
  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <UploadButton />
        </div>
      </div>
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-4 max-w-[1280px]">
        {results.resources.map((result, index) => (
          <CloudinaryImage
            key={result.public_id}
            // src={result.public_id}
            // publicId={result.public_id}
            imageData={result}
            // width={result.width}
            // height={result.height}
            width="300"
            height="400"
            alt="Gallery image"
            priority={index < 6}
          />
        ))}
      </div>
    </section>
  );
}

// 1 9
