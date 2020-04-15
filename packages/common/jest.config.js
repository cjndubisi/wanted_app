module.exports = {
  setupFilesAfterEnv: [
    './jestSetup.js',
    '../../node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  preset: '@testing-library/react-native',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  modulePaths: ['src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*)',
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
};
