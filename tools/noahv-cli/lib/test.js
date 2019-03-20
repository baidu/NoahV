/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file start test
 * @author darren(darrenywyu@gmail.com)
 */

let path = require('path');
let fs = require('fs');
let exists = fs.existsSync;
let spawn = require('child_process').spawn;
let logUtil = require('../lib/logUtil');

let packageJson = path.resolve('package.json');

let runTest = function () {
    let args = ['run', 'test'];
    let npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    let cmd = spawn(npm, args, {stdio: 'inherit', shell: process.platform === 'win32'});
    cmd.on('close', function (status) {
        if (status !== 0) {
            logUtil.error('noahv-cli', 'error', 'test framework run eror');
            console.log(status);
        }
    });
};

module.exports = function update() {
    if (!exists(packageJson)) {
        logUtil.error('noahv-cli', 'error', 'package.json info is not exists in `' + process.cwd() + '`');
        return;
    }
    runTest();
};

