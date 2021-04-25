module.exports = {
  env: {
    browser: false,
    commonjs: false,
    es2021: true
    // 'jest/globals': true
  },
  extends: [
    'standard'
    // 'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'import/no-commonjs': 0,
    'func-names': 0,
    'func-style': 0,
    'prefer-arrow-callback': 0,
    'default-case': 0,
    'more/no-numeric-endings-for-variables': 0,
    'standard/no-callback-literal': 0,
    'max-len': ['error', {
      comments: 800,
      code: 120,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreStrings: true
    }]
    // 'jest/no-disabled-tests': 'warn',
    // 'jest/no-focused-tests': 'error',
    // 'jest/no-identical-title': 'error',
    // 'jest/prefer-to-have-length': 'warn',
    // 'jest/valid-expect': 'error'
  }
  // plugins: ['jest']
}
