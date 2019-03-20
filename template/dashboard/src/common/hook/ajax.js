/**
 * @file ajax hook conf
 */

import request from 'noahv-request';

request.hooks.beforeRequest = config => {
    return config;
};

