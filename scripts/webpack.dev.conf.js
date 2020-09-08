/* eslint-disable */
var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./scripts/dev-client'].concat(baseWebpackConfig.entry[name])
})

var webpackConfig = merge(baseWebpackConfig, {
    // eval-source-map is faster for development
    mode: 'development',
    devtool: '#eval-source-map',
    stats: 'minimal',
    plugins: [
        // HMR
        new webpack.HotModuleReplacementPlugin({}),


        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'src/common/assets/img/favicon.ico',
            inject: true
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/](?!noahv|iview|vue|echarts|moment)\.js$/,
                    name: 'vendors',
                    chunks: 'all'
                },
                visual_vendors: {
                    test: /[\\/]node_modules[\\/]echarts|moment[\\/]\.js$/,
                    name: 'visual_vendors',
                    chunks: 'all'
                }
            }
        }
    }
});

if (config.dev.cssExtract) {
    var MiniCssExtractPlugin = require('mini-css-extract-plugin');
    var path = require('path');
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        })
    )
}

module.exports = webpackConfig;
