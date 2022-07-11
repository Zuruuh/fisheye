import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import glob from 'fast-glob';

export default defineConfig({
  build: {
    minify: 'esbuild',
    emptyOutDir: true,
    rollupOptions: {
      input: glob
        .sync(['./*.html', '!dist'])
        .map((entry: string) => resolve(__dirname, entry)),
    },
  },
});
