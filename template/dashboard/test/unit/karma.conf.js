/**
 * @file Karma configuration
 * Generated on Mon Dec 11 2017 16:06:33 GMT+0800 (CST)
 */

/* eslint-disable no-undef */
let webpackConfig = require('../../scripts/webpack.test.conf');

module.exports = config => {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: ['./index.js'],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },

        reporters: ['spec', 'coverage'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values:
        //   config.LOG_DISABLE
        //   || config.LOG_ERROR
        //   || config.LOG_WARN
        //   || config.LOG_INFO
        //   || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome']


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    // concurrency: Infinity
    });
};
/* eslint-enable */

