const path = require('path');

module.exports = {

  entry: {
    index: path.join(__dirname, './src/pact.js'),
    test: path.join(__dirname, './test/test.js'),
  },
  output: {
    path: path.join(__dirname, './bin/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
