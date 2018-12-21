const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } } }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
