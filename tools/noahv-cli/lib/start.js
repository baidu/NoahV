/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file start server
 * @author darren(darrenywyu@gmail.com)
 */

let path = require('path');
let fs = require('fs');
let exists = fs.existsSync;
let spawn = require('cross-spawn');
let installModules = require('../lib/installModules');
let logUtil = require('../lib/logUtil');

let port = 8899;

let nodeModule = path.resolve('node_modules');
let packageJson = path.resolve('package.json');

let startServer = function () {
    let args = ['start'];
    if (port) {
        if (0 < parseInt(port, 10) < 65535) {
            process.env.PORT = port;
        }
    }
    let npm = 'npm';
    let cmd = spawn(npm, args, {stdio: 'inherit', env: process.env});
    cmd.on('close', function (err) {
        if (err) {
            logUtil.error('noahv-cli', 'error', 'npm start eror');
            console.log(err);
        }
    });
};

module.exports = function init(conf) {
    port = conf.args[0];
    if (!exists(packageJson)) {
        logUtil.error('noahv-cli', 'error', 'package.json info is not exists in `' + process.cwd() + '`');
    }
    else if (!exists(nodeModule)) {
        logUtil.warn('noahv-cli', 'warn', 'dependency not found');
        logUtil.info('noahv-cli', 'info', 'install dependency');
        installModules(startServer);
    }
    else {
        startServer(port);
    }
};

