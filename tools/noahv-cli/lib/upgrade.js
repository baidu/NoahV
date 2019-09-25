/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file upgrade NoahV-Cli
 * @author darren(darrenywyu@gmail.com)
 */

let u = require('underscore');
let spawn = require('cross-spawn');
const request = require('request');
let logUtil = require('../lib/logUtil');
const packageConfig = require('../package.json');

let updateModule = function (module, callBack) {
    let updateArgs = ['install', module + '@latest', '-g'];
    let npm = 'npm';
    logUtil.info('noahv-cli', 'info', 'start upgrade ' + module);
    try {
        request({
            url: 'https://registry.npmjs.org/noahv-cli',
            timeout: 10000,
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                const latestVersion = JSON.parse(body)['dist-tags'].latest;
                logUtil.info('noahv-cli', 'info', 'current version: ' + packageConfig.version);
                logUtil.info('noahv-cli', 'info', 'latest version: ' + latestVersion);
                if (latestVersion !== packageConfig.version) {
                    let updateCmd = spawn.sync(npm, updateArgs, {stdio: 'inherit'});
                    if (updateCmd.status === 0) {
                        logUtil.ok('noahv-cli', 'ok', module + ' upgraded to latest version.');
                        console.log('');
                        callBack && callBack();
                    }
                    else {
                        logUtil.error('noahv-cli', 'error', module + ' upgrade error');
                        console.log('');
                        callBack && callBack();
                    }
                }
                else {
                    logUtil.ok('noahv-cli', 'ok', 'current version is the latest' );
                    console.log('');
                    callBack && callBack();
                }
            }
            else {
                logUtil.error('noahv-cli', 'error', module + ' upgrade eror');
                console.log();
                console.log(err);
                console.log();
                callBack && callBack();
            }
        });
    }
    catch (err) {
        console.log(err);
        logUtil.error('noahv-cli', 'error', 'upgrade error, you can retry upgrade');
        callBack && callBack();
    }
};

module.exports = function update(callBack) {
    updateModule('noahv-cli', typeof callBack === 'function' ? callBack : null);
};

