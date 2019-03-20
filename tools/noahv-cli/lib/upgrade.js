/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file upgrade NoahV-Cli
 * @author darren(darrenywyu@gmail.com)
 */

let u = require('underscore');
let spawn = require('cross-spawn');
let logUtil = require('../lib/logUtil');
let registry = '';
const packageConfig = require('../package.json');

let noahvCliList = ['noahv-cli'];

let updateModule = function (module) {
    let updateArgs = ['install', module + '@latest', '-g', registry];
    let npm = 'npm';
    let getLatestVersion = ['view', module, 'version', registry];
    logUtil.info('noahv-cli', 'info', 'start upgrade ' + module);
    try {
        // get latest module info
        let latestCmd = spawn.sync(npm, getLatestVersion, {stdio: 'pipe'});
        let latestVersion = latestCmd.stdout.toString().replace(/[\r\n]/g, '');
        logUtil.info('noahv-cli', 'info', 'current version: ' + packageConfig.version);
        logUtil.info('noahv-cli', 'info', 'latest version: ' + latestVersion);
        if (latestVersion !== packageConfig.version) {
            let updateCmd = spawn.sync(npm, updateArgs, {stdio: 'inherit'});
            if (updateCmd.status === 0) {
                logUtil.ok('noahv-cli', 'ok', module + ' upgraded to latest version.');
                console.log('');
            }
            else {
                logUtil.error('noahv-cli', 'error', module + 'upgrade eror');
                console.log('');
            }
        }
        else {
            logUtil.ok('noahv-cli', 'ok', 'current version is the latest' );
            console.log('');
        }
    }
    catch (err) {
        console.log(err);
        logUtil.error('noahv-cli', 'error', 'update error, you can try upgrade you noahv-cli');
    }
};

module.exports = function update() {
    u.each(noahvCliList, function (item) {
        updateModule(item);
    });
};

