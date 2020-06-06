const path = require('path');
const webpackConfig = require('./webpack.config.base');
const Dotenv = require('dotenv-webpack');

module.exports = {
  ...webpackConfig,

  mode: 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: false,
    port: 3000,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    open: true
  },

  plugins: [
    ...webpackConfig.plugins,
    new Dotenv()
  ],
};
