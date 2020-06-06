const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.tsx')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.js', ".ts", ".tsx"]
  },

  module: {
    rules: [{
        enforce: 'pre',
        test: /\.js|(\.tsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          fix: true,
          emitError: true,
          failOnError: true,
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        }]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  stats: {
    warningsFilter: [/Failed to parse source map/],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hasura React Admin',

    })
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }

};
