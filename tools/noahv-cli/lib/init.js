/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file init project
 * @author darren(darrenywyu@gmail.com)
 */
const path = require('path');
const emptyDir = require('empty-dir');
const logUtil = require('../lib/logUtil');
const fs = require('fs');
const exists = fs.existsSync;
const fse = require('fs-extra');
const installModules = require('./installModules');
const ora = require('ora');
const getGitTemplate = require('./getGitTemplate');


module.exports = function init({dashboard}) {
    let type = dashboard ? 'dashboard' : 'common';
    let dest = process.cwd();
    if (!emptyDir.sync(dest)) {
        logUtil.error('noahv-cli', 'error', 'please run init command in an empty folder!');
        process.exit();
    }
    logUtil.info('noahv-cli', 'info', `Creating a new ${type} project in ${dest}`);
    let spinner = ora('Generating template...');
    spinner.start();

    // get template form git
    getGitTemplate(type, dest, function (err) {
        spinner.stop();
        if (err) {
            logUtil.error('noahv-cli', 'error', 'get template failed');
            console.log('');
            console.log('Error info:');
            console.log(err);
            console.log('');
            return;
        }
        // remove git repo
        let gitInfo = path.resolve(process.cwd(), '.git');
        if (!exists(gitInfo)) {
            fse.removeSync(gitInfo);
        }
        logUtil.ok('noahv-cli', 'ok', 'template download completed!')
        logUtil.info('noahv-cli', 'info', 'install dependence');
        installModules(printSuccessInfo);
    });

    function printSuccessInfo() {
        logUtil.info('noahv-cli', 'info', 'npm install finished!');
        logUtil.ok('noahv-cli', 'success', `Success created a project at ${dest} !`);
        logUtil.info('noahv-cli', 'info', 'you can start by type: noahv start');
    }
};
