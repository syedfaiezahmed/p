import { MetadataRoute } from "next";
import { servicesData } from "@/data/servicesData";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://prosperaksa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/financial`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/services/digital`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Dynamic Service Slugs
  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(servicesData).map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
