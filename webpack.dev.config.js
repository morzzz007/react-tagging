path = require('path');

var node_dir = __dirname +'/node_modules';

var config = {
  entry: {
    sample : './samples/samples.jsx'
  },
  resolve: {
    alias: {}
  },
  output: {
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