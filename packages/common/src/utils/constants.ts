// use 'react-native-config' & 'dotenv' for mobile and web respectively
import { Platform } from 'react-native';
interface IConfig {
  API_URL: string;
}

const nativeConfig = Platform.select({
  ios: () => require('react-native-config'),
  android: () => require('react-native-config'),
})();

const env = { ...process.env, ...nativeConfig.default };
const envKeys = Object.keys(env)
  .filter((item) => {
    return item.indexOf('REACT_APP_') !== -1;
  })
  .reduce((acc, next) => {
    console.log(acc, next, next.replace('REACT_APP_', ''));
    acc[next.replace('REACT_APP_', '')] = env[next];
    return acc;
  }, {});

// using ...process.env doesn't work,
// must manually access API_URL on .env
const Config: Partial<IConfig> = {
  ...envKeys,
};
export default Config;
