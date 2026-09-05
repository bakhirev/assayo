import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'ext/**',
      'node_modules/**',
      'src/**/*.cjs',
      'src/setupProxy.js',
      'src/vite-env.d.ts',
      'build/**',
      'dist/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'linebreak-style': [
        'error',
        'unix',
      ],
      'react/jsx-sort-props': [
        'error',
        {
          noSortAlphabetically: true,
          ignoreCase: true,
          callbacksLast: true,
		  requiredFirst: true,
		  reservedFirst: true,
          shorthandLast: false
        },
      ],
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 1,
          when: 'always',
        },
      ],
      'react/jsx-pascal-case': [
        'error',
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      'no-useless-escape': 'off',
      'prefer-const': 'off',
      'no-constant-binary-expression': 'off',
      'no-unsafe-optional-chaining': 'off',
      'no-empty': 'off',
      'no-constant-condition': 'off',
      'no-unused-private-class-members': 'off',
      'no-prototype-builtins': 'off',
      'no-control-regex': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
);
