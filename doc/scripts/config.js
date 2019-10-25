/* eslint-disable */
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var assetsPublicPath = '/NoahV/';

var proxyTable = {};
try {
    var devProxyConfigs = require('../src/common/devProxy');
    proxyTable = devProxyConfigs.proxy;
}
catch (err) {
    console.log('proxy file not existed');
}

module.exports = {
    build: {
        env: {NODE_ENV: '"production"'},
        index: path.resolve(__dirname, '../noahv/index.html'),
        assetsRoot: path.resolve(__dirname, '../noahv'),
        assetsSubDirectory: 'static',
        assetsPublicPath: assetsPublicPath,
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: {NODE_ENV: '"development"'},
        port: 8088,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: proxyTable,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}