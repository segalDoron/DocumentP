var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// HTML plugin options
let htmlOptions = {
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
  }

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin(htmlOptions),
        new CleanWebpackPlugin(['dist']),
    ],
    devServer: {
        historyApiFallback: true
    }
}