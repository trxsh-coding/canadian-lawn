import { createConfig } from '../../configs/eslint.common.mjs';
import nextPlugin from '@next/eslint-plugin-next';

export default createConfig({
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
  },
});
