var webpackConfig = require('../../build/webpack.test.config.js');

module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['mocha', 'sinon-chai'],

        files: [
            './index.js'
        ],

        exclude: [
        ],

        reporters: ['spec', 'coverage'],

        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
        },

        coverageReporter: {
            type : 'html',
            dir : './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome']
    });
};