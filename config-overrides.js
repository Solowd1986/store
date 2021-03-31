const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@root': path.resolve('src/'),
    '@components': path.resolve('src/components/'),
    '@redux': path.resolve('src/redux/'),
    //'@scss': path.resolve('src/assets/scss/'),
    '@scss': path.resolve(__dirname, 'src/assets/scss/')
  })(config, env);

  return config;
};
