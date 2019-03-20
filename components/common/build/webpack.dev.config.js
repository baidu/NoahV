const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const utils = require('./utils');
const webpackBaseConfig = require('./webpack.base.config.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssTextPlugin = require('mini-css-extract-plugin');
const apiMocker = require('webpack-api-mocker');


module.exports = merge(webpackBaseConfig, {
    stats: {
        depth: false,
        entrypoints: false,
        children: false
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true
        })
    },
    devtool: 'eval-source-map',
    devServer: {
        before(app) {
            apiMocker(app, path.resolve('mockup/index.js'), {
                proxy: {
                    '/repos/*': 'https://api.github.com/'
                },
                changeHost: true
            });
        }
    },
    // 入口
    entry: {
        main: './demo/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../demo/dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        // new webpack.optimize.splitChunk({name: 'vendors', filename: 'vendor.bundle.js'}),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '../demo/index.html')
        }),
        new MiniCssTextPlugin({
            filename: 'index.min.css'
        }),
        new FriendlyErrorsPlugin()
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors'
                },
                common: {
                    chunks: 'all',
                    test: /[\\/]demo[\\/]js[\\/]/,
                    name: 'common'
                }
                // styles: {
                //     name: 'index',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true
                // }
            }
        }
    }
});
