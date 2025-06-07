import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import sonarJs from 'eslint-plugin-sonarjs';
import eslintImport from 'eslint-plugin-import';
import eslintPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export const createConfig = (options = {}) => {
  return tseslint.config(
    {
      ignores: [
        'dist',
        'build',
        'public',
        '*.cjs',
        '*.mjs',
        '*.h.ts',
        '*.config.js',
        ...(options.ignores ?? []),
      ],
    },
    {
      files: ['*.mdx'],
      languageOptions: {
        parser: 'eslint-mdx',
        plugins: ['import', 'prettier'],
      },
    },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parserOptions: {
          ecmaVersion: 'latest',
          project: [
            './tsconfig.json',
            './tsconfig.app.json',
            './tsconfig.lib.json',
          ],
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        prettier: eslintPrettier,
        import: eslintImport,
        sonarjs: sonarJs,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'eol-last': ['error', 'always'],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-console': 'error',
        'import/no-cycle': ['error', { maxDepth: '∞' }],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'object',
              'parent',
              'sibling',
              'index',
            ],
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
        'sonarjs/cognitive-complexity': ['error', 25],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      files: [
        'vite.config.ts',
        'next.config.mjs',
        'tailwind.config.ts',
        '.storybook/**/*',
      ],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: 'latest',
          project: './tsconfig.node.json',
        },
      },
      plugins: {
        prettier: eslintPrettier,
        import: eslintImport,
        sonarjs: sonarJs,
      },
    }
  );
};
