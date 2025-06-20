import { resolve } from 'path';
import path from 'path';

import svg from '@neodx/svg/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'lib'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './lib/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'classnames', 'tailwindcss', 'next/link'],
      output: {
        assetFileNames: 'style.css',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),

    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
      outDir: 'dist',
      entryRoot: 'lib',
      include: ['lib'],
    }),

    svg({
      root: 'assets/sprites',
      output: 'public/sprites',
      metadata: 'lib/sprite.h.ts',
      group: true,
      resetColors: false,
      fileName: '{name}.svg',
    }),

    viteStaticCopy({
      targets: [{ src: './public/sprites/*.svg', dest: '../../../apps/web/public/sprites' }],
    }),
  ],
});
