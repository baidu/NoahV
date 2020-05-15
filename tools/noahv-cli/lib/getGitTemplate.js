/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file get template from git/github
 * @author darren(darrenywyu@gmail.com)
 */

let spawn = require('cross-spawn');

const templateDir = 'template';

// getTemplate form github
function getTemplate(type, dest, cb) {
    let cloneArgs = [
        'clone',
        '--branch',
        'template_' + type,
        'https://github.com/baidu/NoahV.git',
        dest
    ];
    let gitCloneCmd = spawn.sync('git', cloneArgs, {stdio: 'inherit'});
    if (gitCloneCmd.status !== 0) {
        console.log('');
        cb('clone template failed!')
    }
    else {
        cb();
    }
}

module.exports = getTemplate;
