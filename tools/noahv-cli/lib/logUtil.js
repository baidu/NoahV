/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file format log
 * @author darren(darrenywyu@gmail.com)
 */

let chalk = require('chalk');

function log(prefix, status, msg, color) {
    console.log(prefix + ' ' + chalk[color] + ' ' + msg);
}

let logger = {
    info: function (prefix, status, msg) {
        log(prefix, status, msg, 'gray');
    },
    ok: function (prefix, status, msg) {
        log(prefix, status, msg, 'green');
    },
    warn: function (prefix, status, msg) {
        log(prefix, status, msg, 'yellow');
    },
    error: function (prefix, status, msg) {
        log(prefix, status, msg, 'red');
    }
};

module.exports = exports = logger;
