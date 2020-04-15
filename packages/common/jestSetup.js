import 'jest-styled-components';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import { config } from 'dotenv';
config({ path: '../../.env.sample' });

jest.useFakeTimers();
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const jestPreset = require('@testing-library/react-native/jest-preset');
module.exports = Object.assign(jestPreset, {
  setupFiles: [...jestPreset.setupFiles],
});
