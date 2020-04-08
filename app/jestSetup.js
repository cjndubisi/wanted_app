const jestPreset = require('@testing-library/react-native/jest-preset');
const expoPreset = require('jest-expo/jest-preset.js');

module.exports = Object.assign(expoPreset, jestPreset, {
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles],
});
