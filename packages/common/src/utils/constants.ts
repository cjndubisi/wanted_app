// use 'react-native-config' & 'dotenv' for mobile and web respectively
import { Platform } from 'react-native';
interface IConfig {
  API_URL: string;
}

let nativeConfig: Partial<IConfig> = {};
if (Platform.OS !== 'web') {
  try {
    nativeConfig = require('react-native-config');
  } catch (ex) {
  }
}

const env = process.env;
const envKeys = Object.keys(env)
  .filter((item) => {
    return item.indexOf('REACT_APP_') !== -1;
  })
  .reduce((acc, next) => {
    acc[next.replace('REACT_APP_', '')] = env[next];
    return acc;
  }, {});

// using ...process.env doesn't work,
// must manually access API_URL on .env
export default {
  ...nativeConfig,
  ...envKeys,
};
