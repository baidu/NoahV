/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {

    return mockup.ok(
        {
            id: '1678360',
            name: '1678359_1678361',
            title: ''
        }
    );

};
/* eslint-enable */
