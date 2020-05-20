/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file install module
 * @author darren(darrenywyu@gmail.com)
 */
let spawn = require('cross-spawn');
const logUtil = require('../lib/logUtil');

module.exports = function (callback) {
    let args = ['i'];
    let cmd = spawn.sync('npm', args, {stdio: 'inherit'});
    if (cmd.status !== 0) {
        logUtil.error('noahv-cli', 'error', 'Npm running error,you can try run npm i');
    }
    else {
        callback && callback();
    }
};
