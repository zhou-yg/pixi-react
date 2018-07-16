const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: {
    index: path.join(__dirname, './src/pixi-react.js'),
    test: path.join(__dirname, './test/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/,
        // include: /node_modules/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "test"),
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__ENV__': '"dev"',
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi-fake.js',
      requestAnimationFrame: 'raf',
    })
  ]
}
