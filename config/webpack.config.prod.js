const webpack = require('webpack');
const webpackConfig = require('./webpack.config.base');

module.exports = env => {

  const isProd = process.env.NODE_ENV === 'production';
  const config = {
    ...webpackConfig,
    mode: isProd ? 'production' : 'development',
  
    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    output: {
      ...webpackConfig.output,
      chunkFilename: 'js/[name].bundle.js',
    },
    plugins: [
      ...webpackConfig.plugins,
      new webpack.EnvironmentPlugin([
        'VERSION',
        'DATA_DOMAIN',
        'DATA_SCHEME',
        'HASURA_GRAPHQL_ADMIN_SECRET',
        'HASURA_CLIENT_NAME',
      ]),
    ],
  
  }

  if (isProd) {
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    };
  }

  return config;
};
