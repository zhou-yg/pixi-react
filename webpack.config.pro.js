const path = require('path');
const baseConfig = require('./webpack.config');
const webpack = require('webpack');

module.exports = Object.assign(baseConfig,{
  entry: {
    index: path.join(__dirname, './src/pixi-react.js'),
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'pixi-react.js',
    libraryTarget: 'umd',
  },
  externals: {
    'pixi-lib': 'pixiLib',
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      '__ENV__': '"pro"',
      'pro': 'production',
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress:{
    //     drop_console: true,
    //     warnings: false,
    //   }
    // }),
    // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
  ],
});
