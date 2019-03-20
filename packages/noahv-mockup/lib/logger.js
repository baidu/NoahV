/**
 * NoahV Mockup
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file format log
 * @author darren(darrenywyu@gmail.com)
 */

let chalk = require('chalk');

function log(mod, status, msg, color) {
    console.log(mod + ' ' + chalk[color] + ' ' + msg);
}

let logger = {
    ok: function (mod, status, msg) {
        log(mod, status, msg, 'green');
    },
    error: function (mod, status, msg) {
        log(mod, status, msg, 'red');
    }
};

module.exports = exports = logger;
