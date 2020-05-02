const path = require("path");

const webpackOptions = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@app": path.resolve(__dirname, "../../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};

module.exports = webpackOptions;
