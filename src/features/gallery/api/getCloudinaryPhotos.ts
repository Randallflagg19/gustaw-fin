import cloudinary from "cloudinary";

export type SearchResult = {
  public_id: string;
  tags: string[];
  height: string;
  width: string;
  secure_url: string;
};

export async function getCloudinaryPhotos(
  extraExpression?: string,
  maxResults: number = 100,
): Promise<SearchResult[]> {
  let expression = "resource_type:image";

  if (extraExpression) {
    expression += ` AND ${extraExpression}`;
  }

  const response = await cloudinary.v2.search
    .expression(expression)
    .sort_by("created_at", "desc")
    .max_results(maxResults)
    .with_field("tags")
    .execute();

  // Возвращаем только массив ресурсов (фотографий)
  return response.resources as SearchResult[];
}
