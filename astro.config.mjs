// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bernard2806.is-a.dev",
  integrations: [sitemap()],
  fonts: [
    {
      name: "Chakra Petch",
      cssVariable: "--font-display",
      provider: fontProviders.google(),
      weights: [400, 500, 700],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["sans-serif"],
    },
    {
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      provider: fontProviders.google(),
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["monospace"],
    },
  ],
});
