/**
 * NoahV Mockup
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file mockup
 * @author darren(darrenywyu@gmail.com)
 */

let logger = require('./logger');
let qs = require('qs');
let _ = require('lodash');
let join = require('path');
let urlParse = require('url-parse');
let mockupUtil = require('./util');
let noahvMockup = {};
let mockup = {};

// 返回mockupTool给mockup文件使用
noahvMockup.mockupTool = mockupUtil;

// 返回mockupHandler给express server使用
noahvMockup.mockupHandler = function (req, res, next) {
    _.extend(req, urlParse(req.url, true));
    req.pathname = decodeURIComponent(req.pathname);
    if (mockup.shouldMock(req)) {
        mockup.handleData(req, res, next);
    }
    else {
        next();
    }
};

module.exports = exports = noahvMockup;

/**
 * 返回mockup请求的处理函数
 *
 * @param  {Object} req requset
 * @param  {Object} res response
 * @param  {Object} next next handler
 */
mockup.handleData = function (req, res, next) {
    try {
        let reqHandler = mockup.loadfile(req);
        if (!reqHandler) {
            res.status(404).end();
            return;
        }

        // mockup数据载入正常
        logger.ok('noahv', 'OK', 'Mockup data found for `' + req.pathname + '`');

        let path = req.pathname;
        let reqHandlerKey = 'response';

        let requestParams = req.method === 'POST' ? req.body : req.query;

        let reqBody;

        if (requestParams === undefined) {
            logger.ok('noahv', 'info', 'params is undefined');
        }
        else if (typeof requestParams === 'string') {
            try {
                reqBody = JSON.parse(requestParams);
            }
            catch (err) {
                reqBody = qs.parse(requestParams);
            }
        }
        else {
            reqBody = requestParams;
        }

        let data = reqHandler[reqHandlerKey](path, reqBody);

        // 返回值未指定内容类型，默认按JSON格式处理返回
        let resInfo = {};
        if (!req.header['Content-Type']) {
            resInfo['Content-Type'] = 'application/json;charset=UTF-8';
            data = JSON.stringify(data || {});
        }
        res.set(resInfo);
        res.send(data).end();
        next();
    }
    catch (e) {
        logger.error('noahv', 'ERROR', e.toString());
        res.status(500).end();
        next();
    }
};

/**
 * 返回mockup请求的处理函数
 *
 * @param  {Object} request requset
 * @return {null|Object} mockup文件
 */
mockup.loadfile = function (request) {
    logger.ok('noahv', 'OK', 'Mockup load data for `' + request.pathname + '`');
    let path = request.pathname.replace(/^\/data/, '') || '';
    let pathSegments = path.split(/\//);
    let notEmptySegments = [];
    pathSegments.forEach(function (item) {
        item && notEmptySegments.push(item);
    });

    if (notEmptySegments.length > 1) {
        let filePath = notEmptySegments.join('/');

        try {
            let mockModuleName = join.resolve(process.cwd(), './mockup', filePath);
            delete require.cache[require.resolve(mockModuleName)];
            return require(mockModuleName);
        }
        catch (e) {
            logger.error('noahv', 'ERROR', 'Mockup data not found for `' + path + '`');
            return null;
        }
    }
    else {
        return null;
    }
};

/**
 * 是否满足mockup的条件
 * @param  {Object} request 请求信息
 * @return {boolean} 是否需要mockup
 */
mockup.shouldMock = function (request) {
    // 只处理`api/`开头，并且有mock标识的请求
    if (/^\/api\//i.test(request.pathname)) {
        let referer = request.headers.referer;
        if (!referer) {
            // 浏览器里面直接访问的
            return true;
        }

        // 页面里面发起的请求需要携带mock标识
        return /[?&](?:em|enable_mock)\b/i.test(referer);
    }

    // 不需要载入mockup数据
    return false;
};
