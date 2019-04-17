const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const MiniCssTextPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = merge(webpackBaseConfig, {
    mode: 'development',
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
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../demo/dist/index.html'),
            template: path.join(__dirname, '../demo/index.html')
        }),
        new MiniCssTextPlugin({
            filename: 'index.min.css'
        }),
        new FriendlyErrorsPlugin()
    ]
});
