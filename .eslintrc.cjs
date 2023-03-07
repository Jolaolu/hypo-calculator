/* eslint-env node */
require( '@rushstack/eslint-patch/modern-module-resolution' )

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        '**/*.vue', '**/*.ts'
      ],
      plugins: [ 'import', 'import-alias' ],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': [ 'error', { allowExpressions: true } ],
        'vue/component-name-in-template-casing': [
          'error',
          'kebab-case',
          {
            registeredComponentsOnly: false,
            ignores: [],
          },
        ],
        'import-alias/import-alias': [
          'error',
          {
            relativeDepth: 0, // allows relative paths for colocated files (import FILE from "./FILE.js")
            aliases: [ { alias: '~', matcher: '^src' }, { alias: '@', matcher: '^src' } ],
          },
        ],
      },
    } ]
  ,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  }
}
