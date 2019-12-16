/* eslint-disable */
process.env.NODE_ENV = 'production';
var path = require('path')
var config = require('./config')
var ora = require('ora')
const fs = require('fs-extra')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
fs.removeSync(assetsPath)
fs.mkdirpSync(assetsPath)

var staticPath = path.resolve('static');
if (fs.pathExistsSync(staticPath)) {
    fs.copySync('static/*', assetsPath);
}

webpack(webpackConfig, function(err, stats) {
    spinner.stop();
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
    if (err || stats.hasErrors()) {
        process.exit(1);
    }
})