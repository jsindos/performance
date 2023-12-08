module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'], // Added 'react'
  extends: [
    'standard'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prettier/prettier': 'off',
    'react-native/no-inline-styles': 'off',
    'react/jsx-indent': ['error', 2], // Added this line
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // Added this line
    'react/jsx-indent-props': ['error', 2] // Added this line
    // '@typescript-eslint/indent': ['error', 2]
  }
}
