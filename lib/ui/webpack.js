const webpack           = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config            = require('./webpack.config.js');


module.exports = webpackMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
  lazy: true
});
