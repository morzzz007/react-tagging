path = require('path');

var node_dir = __dirname +'/node_modules';

var config = {
  entry: {
    reacttagging : './js/reacttagging.jsx'
  },
  externals: {
    'react': 'react'
  },
  resolve: {
    alias: {}
  },
  output: {
    libraryTarget: 'umd',
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: '[name].js'
  },
  module: {
  	noParse: [new RegExp(/\.min.js$/)],
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  }
};

module.exports = config;
