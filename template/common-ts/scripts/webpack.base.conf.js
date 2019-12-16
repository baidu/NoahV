/* eslint-disable */
var path = require('path')
var config = require('./config')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var projectRoot = path.resolve(__dirname, '../');

var env = process.env.NODE_ENV;
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

var cssExtractDev = (env === 'development' && config.dev.cssExtract);
var cssExtractProd = env === 'production';
var useCssExtract = cssExtractDev || cssExtractProd;


var assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
};

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.vue', '.less', '.css', '.scss', '.less', '.ts'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js',
            'src': path.resolve(__dirname, '../src'),
            'common': path.resolve(__dirname, '../src/common')
        },
        symlinks: false
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.ts?$/,
            exclude: /(node_modules)/,
            loader: 'ts-loader',
            options: {
                // 用于提取 .vue单文件组件中的TS代码。
                appendTsSuffixTo: [/\.vue$/],
            }
        },
        {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }],
            include: [
                path.resolve(__dirname, '../src'),
                path.resolve(__dirname, '../node_modules/noahv')
            ]
        },
        {
            test: /\.css$/,
            use: [
                useCssExtract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: useCssSourceMap
                    }
                }
            ]
        },
        {
            test: /\.less$/,
            use: [
                useCssExtract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: useCssSourceMap
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: useCssSourceMap,
                        javascriptEnabled: true
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[ext]')
                }
                
            }]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }]
        }]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}