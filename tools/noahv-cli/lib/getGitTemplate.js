/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file get template from git/github
 * @author darren(darrenywyu@gmail.com)
 */

const fs = require('fs');
const path = require('path');
const exists = fs.existsSync;
const request = require('request');

const logUtil = require('../lib/logUtil');

const gitRepo = 'https://api.github.com/repos/baidu/NoahV/git/trees/master';
const rowRepo = 'https://github.com/baidu/NoahV/raw/master/';

/**
 * downLoad file 
 * @param  {Object} file  file in github
 * @param  {string} type  folder
 * @param  {string} dest  file path 
 * @return {boolean}  download status
 */
function downLoad(file, type, dest) {
    const filePath = dest + file.path.replace(type, '');
    const folder = path.dirname(filePath);
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true }, err => {
            if (err) {
                logUtil.error('noahv-cli', 'error', err);
                return false;
            }
        });
    }

    request(rowRepo + '/' + file.path, (err, res, body) => {
        if (err) {
            logUtil.error('noahv-cli', 'error', err);
            return false;
        }
    }).pipe(fs.createWriteStream(filePath));
}

/**
 * filter && download file from github
 * @param  {Array}   tree  file in NoahV repo
 * @param  {string}  type  folder
 * @param  {string}  dest  file path 
 * @param  {Function} cb   callback
 */
function filterTree(tree, type, dest, cb) {
    tree = tree.filter(function (item) {
        return item.type === 'blob' && item.path.indexOf(type) > -1;
    });
    for (let i = 0; i < tree.length; i++) {
        let isDownLoad = downLoad(tree[i], type, dest);
        if (isDownLoad === false) {
            cb('Get template fail!');
            break;
        }
        else if (i === tree.length - 1) {
            cb();
        }
    }
}

// getTemplate form github floder 
function getTemplate(type, dest, cb) {
    request({
        url: gitRepo + '?recursive=1',
        headers: {
            'User-Agent': 'noahv'
        }
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const tree = JSON.parse(body)['tree'];
            type = 'template/' + type;
            filterTree(tree, type, dest, cb);
        }
    });
}


module.exports = getTemplate;
