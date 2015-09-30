var webpack = require('webpack');
var net = require('./server.config');

var path = require("path");

var url = "http://" + net.ip + ":" + net.port;

module.exports = {
    entry: {
        app: ['webpack-dev-server/client?' + url,
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