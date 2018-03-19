// webpack.config.js

const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  //entry: './handler.js',
  target: 'node',
  module: {
    //loaders: [ ... ]
  }
};
