module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['standard', 'prettier', 'react', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'never'],
    eqeqeq: ['error', 'always'],
    'no-else-return': ['error'],
    'no-new': 0,
    'prettier/prettier': [
      'error',
      {
        trailingCommas: 'none',
        singleQuote: true,
        semi: false
      }
    ],
    quotes: ['error', 'single'],
    semi: [2, 'never'],
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  globals: {
    fetch: false
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    es6: true
  }
}
