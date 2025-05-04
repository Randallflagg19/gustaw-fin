import { getCloudinaryPhotos } from "@/features/gallery/api/getCloudinaryPhotos";
import { ForceRefresh } from "@/shared/force-refresh";
import FavoritesList from "@/app/favorite/favorites-list";

export default async function Favorite() {
  const results = await getCloudinaryPhotos("tags=favorite");

  return (
    <>
      <ForceRefresh />
      <section>
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold mt-8"> Favorite Images</h1>
          </div>
          <FavoritesList initialResources={results} />
        </div>
      </section>
    </>
  );
}
