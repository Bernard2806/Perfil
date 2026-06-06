import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://bernard2806.is-a.dev',
  base: '/',
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  }
});
