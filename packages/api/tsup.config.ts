import * as path from 'node:path';

import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import aliasPlugin from 'esbuild-plugin-alias';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm', 'cjs'],
  platform: 'node',
  target: 'node20',
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  bundle: true,
  minify: true,
  tsconfig: 'tsconfig.json',
  outExtension({ format }) {
    return format === 'esm' ? { js: '.mjs' } : { js: '.cjs' };
  },
  esbuildPlugins: [
    NodeModulesPolyfillPlugin(),
    aliasPlugin({
      '@config': path.resolve(__dirname, 'src/config'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@': path.resolve(__dirname, 'src'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    }),
  ],
});
