/* eslint-disable */
var config = require('./config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var logger = require('morgan');
var opn = require('./openBrowser');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.dev.conf');
var mockup = require('noahv-mockup').mockupHandler;
var bodyParser = require('body-parser');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware

var server = express();

server.use(logger('dev'));

// 处理post模拟数据参数信息
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
     log: console.log,
     heartbeat: 2000
})
    // force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function(compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
//         hotMiddleware.publish({
//             action: 'reload'
//         })
//         cb()
//     })
// })

var context = config.dev.proxyTable.path || [];
// switch(process.env.NODE_ENV){
//     case 'development': var proxypath = 'http://localhost:8001'; break;
//     default:  var proxypath = config.dev.proxypath; 
// }

var options = config.dev.proxyTable.option || {};
if (context.length && options.target) {
    server.use(proxyMiddleware(context, options));
}

// server.use(proxyMiddleware('/*/*', {
//     target: '',
//     changeOrigin: true,
//     secure: false,
// }))
server.use(mockup);

// handle fallback for HTML5 history API
server.use(require('connect-history-api-fallback')());

// serve webpack bundle output
server.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
server.use(hotMiddleware);


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
server.use(staticPath, express.static('./static'));


var signal = ['SIGINT', 'SIGTERM'];

signal.forEach(function(sig) {
    process.on(sig, function() {
        process.exit();
    });
});

module.exports = server.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    var uri = 'http://localhost:' + port + '/?em';
    console.log('Listening at ' + uri + '\n');
    console.log('default enable mock data, remove "?em" disable mock data' + '\n');

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
})