/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file get template from git/github
 * @author darren(darrenywyu@gmail.com)
 */

const fs = require('fs-extra');
const path = require('path');
const downloadGit = require('download-git-repo');


const templateDir = 'template';

function filterGitFile(type, dest, cb) {
    var fileList = fs.readdirSync(dest);
    fileList.forEach(function (item) {
        if (item !== templateDir) {
            fs.removeSync(path.resolve(dest, item));
        }
    });
    fs.moveSync(path.resolve(dest, templateDir, type), dest);
    fs.removeSync(path.resolve(dest, templateDir));
    cb();
}

// getTemplate form github
function getTemplate(type, dest, cb) {
    downloadGit('github:baidu/NoahV', dest, function(err) {
        if (err) {
            cb(err);
        }
        else {
            filterGitFile(type, dest, cb);
        }
    });
}

module.exports = getTemplate;
