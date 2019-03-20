/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
var mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {

    return mockup.list(
        [
            {
                // id: 1
            },
            {
                // id: 2
            }
        ],
        {
            totalCount: 20,
            pageSize: params.pageSize || 10,
            pageNo: params.pageNo || 1
        }
    );

};
/* eslint-enable */
