var webpack = require('webpack');

var path = require("path");
module.exports = {
  entry: {
    app: ['webpack-dev-server/client?http://192.168.0.20:3000',
    'webpack/hot/dev-server',
    './app/src/js/entry.js']
  },
  output: {
    path: path.resolve(__dirname, "./app/asset"),
    publicPath: "/asset/",
    filename: "bundle.js",
    sourceMapFilename: "[file].map"
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: "style!css" }
    ]
  },
  devtool: 'source-map',
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
  ]
};