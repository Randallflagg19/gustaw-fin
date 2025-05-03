import cloudinary from "cloudinary";
import { UploadButton } from "./upload-button";
import { CloudinaryImage } from "./cloudinary-image";

export type SearchResult = {
  public_id: string;
};

export async function Gallery() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    // .with_field("tags")
    .execute()) as { resources: SearchResult[] };

  console.log("results", results);

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <UploadButton />
        </div>
      </div>
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-4 max-w-[1280px]">
        {results.resources.map((result) => (
          <CloudinaryImage
            key={result.public_id}
            src={result.public_id}
            width="400"
            height="300"
            alt="Gallery image"
          />
        ))}
      </div>
    </section>
  );
}

// import {
//   CloudinaryImage;
// } from "@/features/gallery/containers/cloudinary-image";
//
// export type SearchResult = {
//   public_id: string;
//   tags: string[];
// };
//
// export async function Gallery() {
//   const results = (await cloudinary.v2.search
//     .expression("resource_type:image")
//     .sort_by("created_at", "desc")
//     .max_results(1)
//     .with_field("tags")
//     .execute()) as { resources: SearchResult[] };
//
//   console.log("results", results);
//
//   return (
//     <section className="w-full">
//       <div className="flex flex-col gap-8">
//         <div className="flex justify-between">
//           <h1 className="text-4xl font-bold">Gallery</h1>
//           <UploadButton />
//         </div>
//
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-4">
//           {results.resources.map((result) => {
//             return (
//               <CloudinaryImage
//                 key={result.public_id}
//                 imageData={result}
//                 width="400"
//                 height="300"
//                 alt="Gallery image"
//               />
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
