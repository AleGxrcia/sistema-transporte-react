import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import js from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import { importX } from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const rootDirectory = dirname(fileURLToPath(import.meta.url));

const sourceFiles = [
  '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
];

const typescriptFiles = [
  '**/*.{ts,mts,cts,tsx}',
];

export default defineConfig([
  globalIgnores([
    'dist/**',
    'build/**',
    'coverage/**'
  ]),

  {
    files: sourceFiles,

    extends: [
      js.configs.recommended,
      importX.flatConfigs.recommended,
      jsxA11y.flatConfigs.recommended,
      eslintReact.configs.recommended,
    ],

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true},
      ],

      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'] 
        },
      ],
      'prefer-const': 'error',
      'no-var': 'error'
    },
  },

  // TYPESCRIPT
  {
    files: typescriptFiles,

    extends: [
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintReact.configs['recommended-type-checked'],
      importX.flatConfigs.typescript,
    ],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: rootDirectory,
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        "error",
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  eslintConfigPrettier,
]);
