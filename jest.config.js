module.exports = {
  setupFilesAfterEnv: ['./jestSetup.js'],
  preset: '@testing-library/react-native',
  clearMocks: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
}
