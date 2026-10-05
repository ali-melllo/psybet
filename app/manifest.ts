import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080A10",
    theme_color: "#FF168A",
    icons: [
      {
        src: "/images/icons/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icons/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
