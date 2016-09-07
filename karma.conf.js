const webpack = require("webpack");
const webpackConfig = require("webpack.config");

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      '{,**/}*.spec.ts',
    ],
    exclude: [],
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-chrome-launcher"),
    ],
    preprocessors: {
      ["{,**/}*.spec.ts"]: ["webpack"],
    },
    webpack: {
      cache: webpackConfig.cache,
      devtool: webpackConfig.devtool,
      module: webpackConfig.module,
      fileLoader: webpackConfig.fileLoader,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins
        .filter((p) => !(p instanceof webpack.optimize.CommonsChunkPlugin)),
    },
    webpackMiddleware: {
      quiet: true,
      noInfo: true,
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
