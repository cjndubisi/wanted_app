module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      'babel-plugin-styled-components',
      "@babel/plugin-proposal-export-default-from"
    ],
  };
};
