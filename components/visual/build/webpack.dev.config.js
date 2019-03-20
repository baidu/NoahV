const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = merge(webpackBaseConfig, {
    devtool: 'eval-source-map',

    // 入口
    entry: {
        main: './demo/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../demo/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            'util': path.resolve(__dirname, '../src/util')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendor.bundle.js'}),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../demo/dist/index.html'),
            template: path.join(__dirname, '../demo/index.html')
        }),
        new FriendlyErrorsPlugin()
    ]
});
