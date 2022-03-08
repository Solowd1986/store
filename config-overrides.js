const rewireAliases = require('react-app-rewire-aliases');
const path = require('path');

const {
  override,
  addBabelPlugins,
  addBabelPresets
} = require("customize-cra");

module.exports = override(
    rewireAliases.aliasesOptions({
      '@root': path.resolve('src/'),
      '@components': path.resolve('src/components/'),
      '@redux': path.resolve('src/redux/'),
      '@scss': path.resolve(__dirname, 'src/assets/scss/'),
      '@custom-types': path.resolve(__dirname, 'src/types/')
    }),

    ...addBabelPlugins(
        "@babel/plugin-syntax-dynamic-import"
    ),
    ...addBabelPresets(
        "@babel/preset-react"
    )
);
