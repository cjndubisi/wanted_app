import 'jest-styled-components';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import { config } from 'dotenv';
config({ path: '../../.env.sample' });

jest.mock('node-fetch');
jest.useFakeTimers();
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
global.fetch = require('node-fetch');

const jestPreset = require('@testing-library/react-native/jest-preset');
module.exports = Object.assign(jestPreset, {
  setupFilesAfterEnv: ['@testing-library/react-native/cleanup-after-each'],
  setupFiles: [...jestPreset.setupFiles],
});
