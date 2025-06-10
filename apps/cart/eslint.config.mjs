import { createConfig } from '../../configs/eslint.common.mjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const projectConfig = createConfig({
  parserOptions: {
    project: ['./tsconfig.json'],
  },
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next'],
  }),
  ...projectConfig,
];

export default eslintConfig;
