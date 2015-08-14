path = require('path');

var node_dir = __dirname +'/node_modules';
var react_dist = node_dir + '/react/dist/react.js';

var config = {
  entry: {
    sample: './samples/samples.jsx',
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: '[name].js',
  },
  module: {
    noParse: [new RegExp(/\.min.js$/)],
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' },
    ],
  },
};

module.exports = config;
