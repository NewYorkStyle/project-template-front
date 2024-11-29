const {join} = require('path');
const {NxReactWebpackPlugin} = require('@nx/react/webpack-plugin');
const {NxAppWebpackPlugin} = require('@nx/webpack/app-plugin');

module.exports = {
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      index: '/index.html',
    },
    port: 4200,
  },
  output: {
    path: join(__dirname, '../../dist/apps/pet-project'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      assets: ['./src/favicon.ico', './src/assets'],
      baseHref: '/',
      compiler: 'babel',
      index: './src/index.html',
      main: './src/main.tsx',
      optimization: process.env['NODE_ENV'] === 'production',
      outputHashing: process.env['NODE_ENV'] === 'production' ? 'all' : 'none',
      styles: ['./src/styles.less'],
      tsConfig: './tsconfig.app.json',
    }),
    new NxReactWebpackPlugin({
      // Uncomment this line if you don't want to use SVGR
      // See: https://react-svgr.com/
      // svgr: false
    }),
  ],
};
