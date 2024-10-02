import pluginJs from "@eslint/js";
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  // Google configuration
  pluginJs.configs.recommended,

  // Prettier configuration
  eslintConfigPrettier,

  {
    // Specify language options including parser options
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        es6: true,
        node: true,
        browser: true, // Define browser globals
      },
    },

    // Include plugins
    plugins: {
      prettier: eslintPluginPrettier,
    },

    // Define rules
    rules: {
      'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
      'camelcase': ['warn', { properties: 'always' }], // Warn on camel case violations
      'max-len': ['warn', { code: 80, "ignoreTemplateLiterals": true }], // Warn if lines exceed 80 characters
      'no-undef': 'off', // Disable no-undef rule since Google Apps Script has global variables
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused variables but ignore those starting with _
    },

    // Ignore specific files or directories
    ignores: [
      '**/*.config.js', // Ignore all config files
      '**/node_modules/**', // Ignore node_modules directory
      '**/*.test.js', // Ignore test files if applicable
      '**/dist/**', // Ignore distribution files if applicable
      '**/docs/**'  // Ignore docs directory
    ],
  },
];