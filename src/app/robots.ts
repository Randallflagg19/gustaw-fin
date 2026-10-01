import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/booking", "/sign-in", "/sign-up"],
    },
    sitemap: "https://gustaw.ru/sitemap.xml",
    host: "https://gustaw.ru",
  };
}
