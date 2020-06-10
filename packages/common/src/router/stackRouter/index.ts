import { Platform } from 'react-native';

const native = Platform.select({
  ios: () => require('./stackRouter.native'),
  android: () => require('./stackRouter.native'),
  default: () => require('./stackRouter.web'),
})();

export default native;
