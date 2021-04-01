const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');

module.exports = function override(config, env) {
  config = rewireAliases.aliasesOptions({
    '@root': path.resolve('src/'),
    '@components': path.resolve('src/components/'),
    '@redux': path.resolve('src/redux/'),
    '@scss': path.resolve(__dirname, 'src/assets/scss/'),
    '@custom-types': path.resolve(__dirname, 'src/types/')
  })(config, env);

  return config;
};
