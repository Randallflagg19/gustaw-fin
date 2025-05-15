import { ForceRefresh } from "@/shared/force-refresh";
import FavoritesList from "@/app/favorite/favorites-list";
import { getDataBasePhotos } from "@/features/gallery/services/getDataBasePhotos";

export default async function Favorite() {
  const results = await getDataBasePhotos();

  return (
    <>
      <ForceRefresh />
      <section>
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold mt-8">Понравились</h1>
          </div>
          <FavoritesList initialResources={results} />
        </div>
      </section>
    </>
  );
}
