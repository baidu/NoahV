/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file update dep
 * @author darren(darrenywyu@gmail.com)
 */

let path = require('path');
let fs = require('fs');
let u = require('underscore');
let exists = fs.existsSync;
let spawn = require('cross-spawn');
let logUtil = require('../lib/logUtil');

let packageJson = path.resolve('package.json');
let noahvList = [
    'noahv-core',
    'noahv-component',
    'noahv-mockup',
    'noahv-visual-components',
    'noahv-request'
];
let installMustModule = function (module) {
    let installArgs = ['install', module];
    let npm = 'npm';
    let installCmd = spawn.sync(npm, installArgs, {stdio: 'inherit'});
    if (installCmd.status === 0) {
        logUtil.ok('noahv-cli', 'ok', module + ' has been installed');
        console.log('');
    }
    else {
        logUtil.error('noahv-cli', 'error', module + 'installed error');
        console.log('');
    }
};

let updateModule = function (module) {
    let updateArgs = ['install', module + '@latest', '-S'];
    let npm = 'npm';
    let getLatestVersion = ['view', module, 'version'];
    let getCurrentInfo = ['list', module, 'version', '--json'];
    logUtil.info('noahv-cli', 'info', 'start upgrade ' + module);
    try {
        // get current module info
        let currentCmd = spawn.sync(npm, getCurrentInfo, {stdio: 'pipe'});
        let currentVersionInfo = JSON.parse(currentCmd.stdout.toString());
        if (currentVersionInfo.dependencies === undefined || currentVersionInfo.dependencies[module] === undefined) {
            if (module !== 'noahv-visual-components') {
                installMustModule(module);
                return;
            }
            logUtil.info('noahv-cli', 'info', module + ' package does not install, no need upgrade');
            console.log('');
            return;
        }
        let currentVersion = currentVersionInfo.dependencies[module].version;
        // get latest module info
        let latestCmd = spawn.sync(npm, getLatestVersion, {stdio: 'pipe'});
        let latestVersion = latestCmd.stdout.toString().replace(/[\r\n]/g, '');
        logUtil.info('noahv-cli', 'info', 'current version: ' + currentVersion);
        logUtil.info('noahv-cli', 'info', 'latest version: ' + latestVersion);
        if (latestVersion !== currentVersion) {
            let updateCmd = spawn.sync(npm, updateArgs, {stdio: 'inherit'});
            if (updateCmd.status === 0) {
                logUtil.ok('noahv-cli', 'ok', module + ' upgraded to latest version.');
                console.log('');
            }
            else {
                logUtil.error('noahv-cli', 'error', module + 'upgrade error');
                console.log('');
            }
        }
        else {
            logUtil.ok('noahv-cli', 'ok', 'current version is the latest' );
            console.log('');
        }
    }
    catch (err) {
        logUtil.error('noahv-cli', 'error', 'update error, you can try upgrade you noahv-cli');
    }
};

module.exports = function update() {
    if (!exists(packageJson)) {
        logUtil.error('noahv-cli', 'error', 'package.json info is not exists in `' + process.cwd() + '`');
        return;
    }
    u.each(noahvList, function (item) {
        updateModule(item);
    });
};

