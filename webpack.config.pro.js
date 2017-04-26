const path = require('path');
const baseConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = Object.assign(baseConfig,{
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__ENV__': 'pro',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        drop_console: true,
      }
    }),
  ],
});
