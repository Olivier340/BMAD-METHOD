import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import nodePlugin from 'eslint-plugin-n';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import yml from 'eslint-plugin-yml';

export default [
  // Global ignores for files/folders that should not be linted
  {
    ignores: [
      'dist/**',
      'coverage/**',
      '**/*.min.js',
      'test/template-test-generator/**',
      'test/template-test-generator/**/*.js',
      'test/template-test-generator/**/*.md',
      // Exclude generated files that may not follow YAML formatting rules
      'docs-eng-perso/project-workflow-status-*.md',
      'cleanup-report-story-*.md',
      'cleanup-validation.md',
      'cleanup-final-report.md',
      // Exclude markdown files that may contain YAML-like content
      'docs-eng-perso/**/*.md',
      'docs/**/*.md',
      // Exclude configuration files that may use different patterns
      '**/vite.config.*',
      '**/jest.config.*',
      '**/tsconfig*.json',
      '**/tailwind.config.*',
      '**/postcss.config.*',
      '**/eslint.config.*',
      // Exclude build output
      'src/web/build/**',
      'src/web/dist/**',
      // Exclude node_modules but allow linting of custom scripts
      '**/node_modules/**',
    ],
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Node.js rules
  ...nodePlugin.configs['flat/mixed-esm-and-cjs'],

  // Unicorn rules (modern best practices)
  unicorn.configs.recommended,

  // YAML linting
  ...yml.configs['flat/recommended'],

  // Place Prettier last to disable conflicting stylistic rules
  eslintConfigPrettier,

  // Backend-specific configuration (exclude frontend files)
  {
    files: ['src/**/*.{js,ts}', 'tools/**/*.{js,ts}', 'test/**/*.{js,ts}'],
    ignores: ['src/web/**/*', '**/node_modules/**', 'dist/**'],
  },

  // Project-specific tweaks
  {
    rules: {
      // Allow console for CLI tools in this repo
      'no-console': 'off',
      // Enforce .yaml file extension for consistency
      'yml/file-extension': [
        'error',
        {
          extension: 'yaml',
          caseSensitive: true,
        },
      ],
      // Prefer double quotes in YAML wherever quoting is used, but allow the other to avoid escapes
      'yml/quotes': [
        'error',
        {
          prefer: 'double',
          avoidEscape: true,
        },
      ],
      // Relax many Unicorn rules that are too opinionated for this codebase
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': 'warn', // Warning only for filename case
      'unicorn/consistent-function-scoping': 'off', // Allow nested functions
      'unicorn/no-array-reduce': 'off', // Allow array.reduce()
      'unicorn/no-array-callback-reference': 'off', // Allow array callbacks
      'unicorn/prefer-add-event-listener': 'off', // Allow onclick/onmessage
      'unicorn/prefer-dom-node-remove': 'off', // Allow parentNode.removeChild
      'unicorn/explicit-length-check': 'off', // Allow length checks
      'unicorn/no-useless-escape': 'off', // Allow escape characters
      'unicorn/prefer-top-level-await': 'off', // Allow promise chains in some cases
      'unicorn/no-process-exit': 'off', // Allow process.exit in CLI tools
      '@typescript-eslint/no-unsafe-function-type': 'off', // Allow Function types
      '@typescript-eslint/no-require-imports': 'off', // Allow require imports
      'unicorn/prefer-event-target': 'off', // Allow EventEmitter (used in codebase)
      'unicorn/import-style': 'off', // Allow namespace imports
      'n/no-process-exit': 'off', // Allow process.exit in test files
      // TypeScript specific rules - more permissive
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off', // Allow unused expressions in generated code
      '@typescript-eslint/no-empty-object-type': 'off', // Allow empty interfaces
      // Global variable rules - more permissive for Node.js compatibility
      'no-redeclare': 'warn', // Warning for redeclared globals
      'no-undef': 'off', // Allow undefined globals in some contexts
      'no-prototype-builtins': 'off', // Allow Object.prototype methods
      'no-func-assign': 'off', // Allow function reassignment
      'no-empty': 'off', // Allow empty blocks
    },
  },

  // CLI/CommonJS scripts under tools/**
  {
    files: ['tools/**/*.js'],
    rules: {
      // Allow CommonJS patterns for Node CLI scripts
      'unicorn/prefer-module': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-process-exit': 'off',
      'n/no-process-exit': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/prefer-top-level-await': 'off',
      // Allow require imports for Node.js compatibility
      '@typescript-eslint/no-require-imports': 'off',
      // Avoid failing CI on incidental unused vars in internal scripts
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // Reduce style-only churn in internal tools
      'unicorn/prefer-ternary': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'n/no-extraneous-require': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-unpublished-require': 'off',
      'n/no-unpublished-import': 'off',
      // Some scripts intentionally use globals provided at runtime
      'no-undef': 'off',
      'no-redeclare': 'off', // Allow redeclared globals in Node scripts
      // Additional relaxed rules for legacy/internal scripts
      'no-useless-catch': 'off',
      'unicorn/prefer-number-properties': 'off',
      'no-unreachable': 'off',
      'no-empty': 'off',
      'no-func-assign': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // Test files configuration with Jest globals
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/__tests__/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        // Jest globals
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        beforeAll: 'readonly',
        afterEach: 'readonly',
        afterAll: 'readonly',
        // Node.js globals for tests
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // Relax some rules for test files
      'no-console': 'off',
      'no-undef': 'off',
      'unicorn/prefer-module': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'n/no-missing-require': 'off',
      'n/no-unpublished-require': 'off',
    },
  },

  // Module installer scripts use CommonJS for compatibility
  {
    files: ['**/_module-installer/**/*.js', '**/installer-templates/**/*.js'],
    rules: {
      // Allow CommonJS patterns for installer scripts
      'unicorn/prefer-module': 'off',
      'n/no-missing-require': 'off',
      'n/no-unpublished-require': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // ESLint config file should not be checked for publish-related Node rules
  {
    files: ['eslint.config.mjs'],
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },

  // GitHub workflow files in this repo may use empty mapping values
  {
    files: ['.github/workflows/**/*.yaml'],
    rules: {
      'yml/no-empty-mapping-value': 'off',
    },
  },

  // Other GitHub YAML files may intentionally use empty values and reserved filenames
  {
    files: ['.github/**/*.yaml'],
    rules: {
      'yml/no-empty-mapping-value': 'off',
      'unicorn/filename-case': 'off',
    },
  },
];
