path = require('path');

var node_dir = __dirname +'/node_modules';

var config = {
  entry: ['./js/tagfilter.jsx'],
  addVendor: function (name, path) {
   	this.resolve.alias[name] = path;
  },
  resolve: {
    alias: {}
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: 'tagfilter.js'
  },
  module: {
  	noParse: [new RegExp(/\.min.js$/)],
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  }
};

config.addVendor('react/lib/Object.assign', node_dir + '/react/lib/Object.assign.js');
config.addVendor('react/lib/invariant', node_dir + '/react/lib/invariant.js');
config.addVendor('react/lib/warning', node_dir + '/react/lib/warning.js');
config.addVendor('react/lib/ExecutionEnvironment', node_dir + '/react/lib/ExecutionEnvironment.js');
config.addVendor('react', node_dir + '/react/dist/react.min.js');

module.exports = config;