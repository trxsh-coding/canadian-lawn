import { createConfig } from '../../configs/eslint.common.mjs';

export default createConfig({
  ignores: ['lib/sprite.h.ts'],
  files: ['.storybook/**/*'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.storybook.json',
  },
});
