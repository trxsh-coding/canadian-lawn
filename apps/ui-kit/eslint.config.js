import { createConfig } from 'configs/eslint.common.mjs';

export default createConfig({
  parserOptions: {
    project: './tsconfig.json',
  },
});
