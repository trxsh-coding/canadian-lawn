/**
 * Общая часть конфига и для /src и для *.config.js|ts (vite, next)
 */
const commonForTypeScript = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'sonarjs', '@tanstack/query'],
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/unbound-method': 'off',
    'prettier/prettier': 'error',
    'sonarjs/cognitive-complexity': ['error', 25],
  },
};

/**
 * Переиспользуем конфиг таким образом вместо нативного extends,
 * поскольку с extends есть проблемы при организации монорепозитория и секции overrides
 **/
module.exports = ({ tsFilesPlugins = [] } = {}) => ({
  root: true,
  ignorePatterns: [
    'dist',
    'build',
    'public',
    'coverage',
    '*.cjs',
    '*.mjs',
    '*.h.ts',
    'strapi.d.ts',
    '*.config.js',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'eol-last': ['error', 'always'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'error',
    'import/no-cycle': ['error', { maxDepth: '∞' }],
    'linebreak-style': 0,
    'no-irregular-whitespace': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'object', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'export' },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    { files: ['*.mdx'], parser: 'eslint-mdx', plugins: ['import', 'prettier'] },
    {
      ...commonForTypeScript,
      extends: [...commonForTypeScript.extends, ...tsFilesPlugins],
      files: ['*.tsx', '*.ts'],
      env: {
        browser: true,
        es6: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      ...commonForTypeScript,
      files: ['./vite.config.ts', './next.config.mjs', '.storybook/**/*'],
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.node.json',
      },
    },
  ],
});
