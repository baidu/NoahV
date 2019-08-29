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
    let cmd = spawn('npm', args, {stdio: 'inherit'});
    cmd.on('close', function (status) {
        if (status === 0) {
            callback && callback();
        }
        else {
            logUtil.error('noahv-cli', 'error', 'Npm running error,please check node&npm is exist in your system');
        }
    });
};
