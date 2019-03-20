const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const webpackBaseConfig = require('./webpack.base.config.js');
const MiniCssTextPlugin = require('mini-css-extract-plugin');


const webpackConfig = merge(webpackBaseConfig, {
    mode: 'development',
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
    plugins: [
        new MiniCssTextPlugin('index.min.css')
    ]
});

// no need for app entry during tests
delete webpackConfig.entry;

module.exports = webpackConfig;
