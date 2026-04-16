import { Gallery } from "@/features/gallery";
import Header from "@/features/session/header";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-y-8 px-4 pb-20 pt-8">
      <Header />
      <Gallery />
    </div>
  );
}
