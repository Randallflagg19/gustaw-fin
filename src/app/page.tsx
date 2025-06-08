import Gallery from "@/features/gallery/containers/gallery";
import Header from "@/features/session/header";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-4 pt-8 pb-20 gap-y-8">
      <Header />
      <Gallery />
    </div>
  );
}
