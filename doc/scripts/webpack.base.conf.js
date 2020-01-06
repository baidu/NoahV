/* eslint-disable */
var path = require('path')
var config = require('./config')
var utils = require('./utils')
var slugify = require('transliteration').slugify;
var projectRoot = path.resolve(__dirname, '../');

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
var vueLoaderConfig = require('./vue-loader.conf')

const replacedlist = 'guide|table|form|trend|view|api|chart|icon';

const replaceRegx = new RegExp('(' + replacedlist + ')\/(.*)\\.md$');

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
        extensions: ['.js', '.vue', '.less', '.css', '.scss', '.less'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'vue-router$': 'vue-router/dist/vue-router.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'common': path.resolve(__dirname, '../src/common'),
            'config': path.resolve(__dirname, '../src/config'),
            'tools': path.resolve(__dirname, '../src/tools'),
            'mock': path.resolve(__dirname, '../mockup')
        },
        symlinks: false
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    module: {
        // unknownContextCritical : false,
        rules: [
            {
                test: function(path) {
                    if (!/\.md$/.test(path)) {
                        return false;
                    }
                    var arr = path.split('/');
                    var name = arr[arr.length - 2];
                    if (replacedlist.split('|').indexOf(name) === -1) {
                        return true;
                    }
                    return false;
                },
                loader: 'vue-markdown-loader',
                options: {
                    wrapper: 'saas-doc'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }],
                exclude: /(scripts|test)/,
                include: [
                    path.resolve(__dirname, "../src")
                ]
            },
            {
                test: replaceRegx,
                use: [
                  {
                    loader: 'vue-loader',
                    options: {
                      compilerOptions: {
                        preserveWhitespace: false
                      }
                    }
                  },
                  {
                    loader: path.resolve(__dirname, './demo-loader/index.js')
                  }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('img/[name].[ext]')
                    }
                    
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }]
            }
        ]
    }
    // vue: {
    //     loaders: utils.cssLoaders({
    //         sourceMap: useCssSourceMap
    //     }),
    //     postcss: [
    //         require('autoprefixer')({
    //             browsers: ['last 10 versions']
    //         })
    //     ]
    // }
}