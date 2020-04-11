const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appIncludes = [
  resolveApp('src'),
  resolveApp('../../node_modules/react-native-gesture-handler/'),
  resolveApp('../../node_modules/react-native-haptic-feedback/'),
  resolveApp('../../node_modules/react-native-vector-icons/'),
  resolveApp('../../node_modules/react-native-screens/'),
];

module.exports = async function override(config, env) {
  const __DEV__ = env !== 'production';

  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[0].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins);

  config.module.rules[2].oneOf[1].options.preset = [require.resolve('babel-preset-expo')];
  // .concat(
  //   config.module.rules[2].oneOf[1].options.preset
  // );

  config.plugins.push(new webpack.DefinePlugin({ __DEV__ }));

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native-web': resolveApp('../../node_modules/react-native-web'),
    react: resolveApp('../../node_modules/react'),
  };

  config.module.rules = config.module.rules.filter(Boolean);

  return config;
};
