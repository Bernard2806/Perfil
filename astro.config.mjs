import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bernard2806.is-a.dev',
  base: '/',
  output: 'static',
  compressHTML: true,
  prefetch: true,

  build: {
    inlineStylesheets: 'always'
  },

  integrations: [sitemap()]
});