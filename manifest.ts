import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inkwell — Essays on design, craft and the future",
    short_name: "Inkwell",
    description:
      "A premium multi-author publication covering design, technology and culture.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b10",
    theme_color: "#0a0b10",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png"
      }
    ]
  };
}
