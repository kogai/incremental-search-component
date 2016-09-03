const path = require("path");
const webpack = require("webpack");

const configuration = {
  srcDir: "./src",
  distDir: "./dist",
};

const webpackConfig = {
  cache: !process.env.CI,
  devtool: "inline-source-map",
  entry: {
    index: `${configuration.srcDir}`,
  },
  output: {
    filename: "[name].bundle.js",
    path: configuration.distDir,
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"],
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: "awesome-typescript-loader" },
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

module.exports = webpackConfig;