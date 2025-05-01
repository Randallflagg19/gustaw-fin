import { CloudinaryGallery } from "@/features/post";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-8 pb-20 gap-y-8">
      {/*<Header/>*/}
      {/*<StoriesList/>*/}
      {/*<PostsList/>*/}
      <CloudinaryGallery />
    </div>
  );
}
