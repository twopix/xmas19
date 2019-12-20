'use strict'

const path = require('path')
const merge = require('webpack-merge')
const config = require('../config')
const webpack = require('webpack')
const webpackConfig = require('./webpack.base.conf')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

Object.keys(webpackConfig.entry).forEach(key => {
  webpackConfig.entry[key] = [
    path.join(__dirname, 'dev-client.js'),
    webpackConfig.entry[key]
  ]
})

module.exports = merge(require('./webpack.base.conf'), {
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  devtool: config().devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors()
  ]
});
