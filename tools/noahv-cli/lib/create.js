/**
 * NoahV-Cli
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file create project
 * @author darren(darrenywyu@gmail.com)
 */

const inquirer = require('inquirer');
const fs = require('fs');
const isValid = require('is-valid-path');
const path = require('path');
let logUtil = require('../lib/logUtil');
let typeList = ['action', 'list', 'filterList', 'form', 'chart', 'api', 'test'];
let apiType = ['ok', 'list', 'fail'];
const exists = require('fs').existsSync;
const fse = require('fs-extra');
const camelCase = require('camelcase');

module.exports = function create(conf) {
    let packageJson = path.resolve(process.cwd(), 'package.json');
    if (!exists(packageJson)) {
        logUtil.error('noahv-cli', 'error', 'please run this command in project root path');
        return;
    }
    let type = conf.args[0];
    if (type === undefined) {
        logUtil.warn('noahv-cli', 'INFO', 'please enter <type> for `noahv create`');
        inquirer.prompt([
            {
                type: 'input',
                message: typeList.join(' | ') + '\n',
                name: 'type',
                default: 'action'
            }
        ]).then(function (answers) {
            if (answers.type) {
                if (typeList.indexOf(answers.type) > -1) {
                    askPath(answers.type);
                }
                else {
                    logUtil.error('noahv-cli', 'ERROR', 'invaild type');
                }
            }
            else {
                logUtil.error('noahv-cli', 'ERROR', 'type is required.');
            }
        });
    }
    else if (typeList.indexOf(type) > -1){
        askPath(type);
    }
    else {
        logUtil.error('noahv-cli', 'ERROR', 'invaild type');
    }
};
function askPath(type) {
    logUtil.warn('noahv-cli', 'INFO', 'please enter <path> for `noahv create`');
    inquirer.prompt([
        {
            type: 'input',
            message: type === 'api' ? '<path> such as `api/table`' : '<path> such as `demo/list`',
            name: 'path'
        }
    ]).then(function (answers) {
        if (answers.path) {
            answers.path = answers.path.replace(/ /g, '');
            if (isValid(answers.path)) {
                if (type === 'api') {
                    createApi(type, answers.path);
                }
                else if (type === 'test') {
                    createTest(answers.path);
                }
                else {
                    createTpl(type, answers.path);
                }
            }
            else {
                logUtil.error('noahv-cli', 'ERROR', 'invaild path');
            }
        }
        else {
            logUtil.error('noahv-cli', 'ERROR', 'path is required.');
        }
    });
}

function getTplFilePath(customPath) {
    return customPath + '.vue';
}

function trimPath(customPath) {
    if ((/^\/.*/).test(customPath)) {
        customPath = customPath.replace(/^\//, '');
    }
    if ((/^\.\/.*/).test(customPath)) {
        customPath = customPath.replace(/^\.\//, '');
    }
    if ((/^src.*/).test(customPath)) {
        customPath = customPath.replace('src/', '');
    }
    return customPath;
}

function createTpl(type, customPath) {
    customPath = trimPath(customPath);
    let tplpath = path.resolve(__dirname, '../template/createTpl/' + type + '.vue');
    let destFilePath = path.resolve(process.cwd(), 'src', getTplFilePath(customPath));
    let readTplFile = function (file, callback) {
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) {
                logUtil.error('noahv-cli', 'ERROR', 'open tpl failed');
            }
            else {
                callback(data);
            }
        });
    };
    let writeTplFile = function (file, data, callback) {
        // 如果有多层路径，先创建路径
        let pathArray = customPath.split('/');
        if (pathArray.length > 1) {
            pathArray.pop();
            require('mkdirp').sync(path.resolve(process.cwd(), 'src', pathArray.join('/')));
        }
        fs.writeFile(file, data, function (err) {
            if (err) {
                logUtil.error('noahv-cli', 'ERROR', 'write tpl failed');
                throw err;
            }
            else {
                callback();
            }
        });
    };
    let createRouter = function () {
        let targetPos = '    // Keep this line if you want auto add router by noahv create';
        let routerPath = path.resolve(process.cwd(), 'src/common/router.js');
        let routerConfig = fs.readFileSync(routerPath, 'utf8');
        let tab = '    ';
        let newItem = '\n'
        + tab
        + '{\n'
        + tab + tab
        + 'component: r => require.ensure([], () => r(require(\'src/' + customPath + '\')), \'' + customPath + '\'),\n'
        // simple
        // + 'component: \'' + customPath + '\',\n'
        + tab + tab
        + 'path: \'/' + customPath + '\'\n'
        + tab
        + '},';
        routerConfig = routerConfig.replace(targetPos, targetPos + newItem);
        fs.writeFileSync(routerPath, routerConfig, 'UTF-8');
        // 创建单测
        createTest(customPath, creatFinsh);
    };
    const creatFinsh = function () {
        console.log('+ src/' + customPath + '.vue');
        console.log('M src/common/router.js');
        console.log('+ test/unit/specs/' + customPath + '.spec.js');
        logUtil.ok('noahv-cli', 'ok', 'creat success!');
        logUtil.ok('noahv-cli', 'info', 'your can visit this new page in #/' + customPath);
    };
    let replaceData = function (data) {
        let filterData = data.replace(/\$\{class\}/g, customPath.split('/').join('-'));
        writeTplFile(destFilePath, filterData, createRouter);
    };
    readTplFile(tplpath, replaceData);
}

function createApi(type, customPath) {
    inquirer.prompt([
        {
            type: 'input',
            message: apiType.join(' | ') + '\n',
            default: 'ok',
            name: 'apiType'
        }
    ]).then(function (answers) {
        if (answers.apiType) {
            if (apiType.indexOf(answers.apiType) > -1) {
                cpApiFile(answers.apiType, customPath);
            }
            else {
                logUtil.error('noahv-cli', 'ERROR', 'invaild apiType');
            }
        }
        else {
            logUtil.error('noahv-cli', 'ERROR', 'apiType is required.');
        }
    });

    function cpApiFile(type, customPath) {
        if ((/.*\/$/).test(customPath)) {
            customPath = customPath.replace(/\//, '');
        }
        if ((/^\/.*/).test(customPath)) {
            customPath = customPath.replace(/^\//, '');
        }
        let absPath = path.resolve(process.cwd(), 'mockup', customPath + '.js');
        let origin = path.resolve(__dirname, '../template/createApi/' + type + '.js');
        fse.copy(origin, absPath).then(function () {
            console.log('+ mockup/' + customPath + '.js');
            logUtil.ok('noahv-cli', 'ok', 'creat success!');
        });
    }
}

function createTest(customPath, callback) {
    // 简单处理下路径
    customPath = trimPath(customPath);
    console.log(customPath);
    // 模板地址
    let testTplPath = path.resolve(__dirname, '../template/createTest/spec.js');
    let testPath = path.resolve(process.cwd(), 'test/unit/specs/', customPath + '.spec.js');
    // 如果有多层路径，先创建路径
    let pathArray = customPath.split('/');
    if (pathArray.length > 1) {
        pathArray.pop();
        require('mkdirp').sync(path.resolve(process.cwd(), 'test/unit/specs', pathArray.join('/')));
    }
    let testData = fs.readFileSync(testTplPath, 'utf8');
    let componetName = camelCase(customPath.replace(/\//g, '-'));
    testData = testData.replace(/\$\{componetName\}/g, componetName);
    testData = testData.replace(/\$\{componetPath\}/g, customPath);
    fs.writeFileSync(testPath, testData, 'UTF-8');
    if (callback && typeof callback === 'function') {
        callback();
    }
    else {
        console.log('+ test/unit/specs/' + customPath + '.spec.js');
        logUtil.ok('noahv-cli', 'ok', 'test file creat success!');
    }
}
