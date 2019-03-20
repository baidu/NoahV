var spawn = require('cross-spawn');
var path = require('path');
var fs = require('fs');
var fs = require('fs-extra');
var exists = fs.existsSync;
var template = path.resolve('template');
var commonTpl = path.resolve(template, 'common');
var dashboardTpl = path.resolve(template, 'dashboard');

function cleanTemplate() {
    var cleanList = [
        'npm-debug.log',
        'template/common/node_modules',
        'template/dashboard/node_modules',
        'template/common/npm-debug.log',
        'template/dashboard/npm-debug.log'
    ];
    cleanList.forEach(function (item) {
        fs.removeSync(item);
    });
}


function updateTemplateDepVersion() {
    if (exists(template)) {
        updateDep(commonTpl);
        updateDep(dashboardTpl);
    }
}


function updateDep(tplPath) {
    if (exists(tplPath)) {
        console.log('update dependency in tplPath');
        var updateCmd = spawn.sync('noahv', ['update'], { cwd: tplPath, stdio: 'inherit' });
        if (updateCmd.status === 0) {
            console.log('update template dependency success!');
        }
        else {
            console.log('update template dependency fail!');
            process.exit();
        }
    }
    else {
        console.log('path error!');
        process.exit();
    }
}


// updateTemplateDepVersion();
cleanTemplate();
