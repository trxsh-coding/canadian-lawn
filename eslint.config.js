import { createConfig } from './configs/eslint.common.mjs';

/**
 * Корневой конфиг — линтит весь монорепозиторий
 * Подключает базовый набор правил через createConfig
 */
export default [
  ...createConfig({
    ignores: [
      '.next',
      '**/dist',
      '**/build',
      '**/coverage',
      '**/node_modules',
      '**/.storybook/**',
      '**/lib/sprite.h.ts',
    ],
  }),
];
