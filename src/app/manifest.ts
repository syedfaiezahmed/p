import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prospera KSA - Financial & Strategic Business Consulting",
    short_name: "Prospera KSA",
    description:
      "Premier Saudi corporate advisory specializing in ZATCA e-invoicing Phase 2, SOCPA bookkeeping, fractional CFO consulting, and ERP implementation.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2a1a4a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
