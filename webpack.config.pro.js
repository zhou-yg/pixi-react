const path = require('path');
const baseConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = Object.assign(baseConfig,{
  entry: {
    index: path.join(__dirname, './src/pixi-react.js'),
  },
  output: {
    path: path.join(__dirname, './bin/'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__ENV__': 'pro',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        drop_console: true,
        warnings: false,
      }
    }),
  ],
});
