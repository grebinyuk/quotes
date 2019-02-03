const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

 module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',

  },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
  ]
});
