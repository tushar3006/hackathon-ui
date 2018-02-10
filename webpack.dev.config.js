var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');
var WriteFilePlugin = require('write-file-webpack-plugin');
// var OfflinePlugin = require('offline-plugin');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, 'dist')
};

config.devtool = 'source-map';

config.proxy = {
  '/order-online/api/*': 'http://tossinpizza.com/'
};

config.module.loaders.push({
	  test: /\.scss$/,
	  loader: 'style!css?sourceMap!sass?sourceMap'
	})

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin(),
  new WriteFilePlugin()
  // new OfflinePlugin()
]);

module.exports = config;
