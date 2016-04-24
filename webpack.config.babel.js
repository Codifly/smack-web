const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const configuration = {
  devtool: 'source-map',
  entry: {
    main: [
      'babel-polyfill',
      './src/index.js'
    ]
  },
  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'babel!eslint?failOnWarning=false&failOnError=false', test: /\.js$/ },
      { loader: 'style!css', test: /\.css$/ },
      { loader: 'file?name=[name]-[md5:hash].[ext]', test: /\.gif$|\.jpg$|\.jpeg$|\.png|\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$|\.pdf$/ }
    ]
  },
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    // Define constants used throughout the codebase
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // Build index.html
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: {},
      template: './src/index.html'
    })
  ]
};

module.exports = configuration;
