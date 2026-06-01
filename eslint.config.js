import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import checkFile from 'eslint-plugin-check-file'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      'dist',
      'node_modules',
      'mcp-server',
      'plugins',
      'public',
      '.wrangler',
      'scratch',
      'src/paraglide/*.js',
      'src/paraglide/messages/*.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict, // Use base strict for all files
  ...tseslint.configs.stylistic, // Use base stylistic for all files
  perfectionist.configs['recommended-natural'],
  {
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    // Apply type-checked rules ONLY to TS files
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'check-file': checkFile,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],
      // TypeScript variable/function/type naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          filter: {
            // Ignore variables containing underscores (such as paraglide keys: about_recentUpdates)
            match: false,
            regex: '_',
          },
          format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
          selector: 'variable',
        },
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'function',
        },
        {
          format: ['PascalCase'],
          selector: 'typeLike',
        },
        {
          format: ['PascalCase', 'UPPER_CASE'],
          selector: 'enumMember',
        },
        {
          format: null,
          selector: 'property',
        },
        {
          format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
          selector: 'import',
        },
      ],

      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-deprecated': 'warn', // Downgrade to warn as it might be common in libs
      '@typescript-eslint/no-empty-object-type': 'off',
      // Strict rule promotions
      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      // Filename and folder casing conventions
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/components/!(ui)/**/*.{ts,tsx}': 'PASCAL_CASE',
          'src/hooks/**/*.{ts,tsx}': 'CAMEL_CASE',
          'src/utils/**/*.{ts,tsx}': 'CAMEL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'CAMEL_CASE',
        },
      ],

      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'prefer-const': 'error',
      'react-hooks/exhaustive-deps': 'error',

      'react-hooks/incompatible-library': 'off',
      'react-hooks/rules-of-hooks': 'error',

      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    },
  },
  {
    files: ['scripts/**/*.mjs', 'scratch/**/*.mjs', 'vite.config.ts', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  prettier,
)
