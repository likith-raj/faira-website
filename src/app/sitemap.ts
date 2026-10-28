import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://faira.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/demos",
    "/demos/restaurant",
    "/demos/clinic",
    "/demos/real-estate",
    "/demos/coaching",
    "/demos/retail",
    "/demos/webapp",
    "/demos/mobileapp",
    "/about",
    "/contact",
    "/quote",
    "/legal"
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7
  }));
}
