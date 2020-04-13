const { defaults: tsjPreset } = require('ts-jest/presets');

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
  transformIgnorePatterns: ['../../node_modules/(?!(react-native)/)'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
};
