/**
 * Created by noahv-cli.
 */

/* eslint-disable  no-undef,no-unused-vars */
let mockup = require('noahv-mockup').mockupTool;

exports.response = (path, params) => {

    return mockup.ok(
        [
            {
                'name': 'noah_namespace',
                'value': 'CUP_1',
                'alias': null,
                'metrics': {'alias3': 90, 'alias2': 95, 'alias1': null}
            }, {
                'name': 'noah_namespace',
                'value': 'CUP_2',
                'alias': null,
                'metrics': {'alias3': 100, 'alias2': 80, 'alias1': null}
            }
        ]
    );
};
/* eslint-enable */
