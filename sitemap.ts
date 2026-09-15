import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://inkwell.example.com";
  const posts = await getPosts();

  const staticRoutes = ["", "/login", "/signup", "/dashboard", "/settings", "/search"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date()
    })
  );

  const postRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt)
  }));

  return [...staticRoutes, ...postRoutes];
}
