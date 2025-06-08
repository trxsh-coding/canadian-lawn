/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,jsx,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],
};
