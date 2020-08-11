/* eslint-disable */
var path = require('path')
var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var env = config.build.env;

var assetsPath = function (_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path)
};

var webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: assetsPath('js/[name].js'),
        chunkFilename: assetsPath('js/[name].[chunkhash].min.js')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // noahv: {
                //     name: 'noahv',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true
                // },
                visual_vendors: {
                    test: /[\\/]node_modules[\\/]echarts|moment(.*)\.js$/,
                    name: 'visual_vendors',
                    chunks: 'all'
                },
                vendors: {
                    test:/[\\/]node_modules[\\/](?!noahv|iview|vue|echarts|moment)(.*)\.js$/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                test: /\.js(\?.*)?$/i,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: assetsPath('css/[name].css?[chunkhash]')
        }),
         // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            hash: true,
            favicon: 'src/common/assets/img/favicon.ico',
        })
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig