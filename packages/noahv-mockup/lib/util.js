/**
 * NoahV Mockup
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file mockup util
 * @author darren(darrenywyu@gmail.com)
 */

let mockup = {};

/**
 * 返回普通成功mockup请求
 *
 * @param {Object} data 返回的结果数据
 * @return {Object} 返回接口数据
 */
mockup.ok = function (data) {
    return {
        success: true,
        data: data || {}
    };
};

/**
 * 返回列表类型成功mockup请求
 *
 * @param {Object} data 返回的结果数据
 * @param {Object} page 返回分页数据的元数据
 * @return {Object} 返回接口数据
 */
mockup.list = function (data, page) {
    page = page || {};

    return {
        success: true,
        page: {
            totalCount: parseInt(page.totalCount, 10) || 100,
            pageNo: parseInt(page.pageNo, 10) || 1,
            pageSize: parseInt(page.pageSize, 10) || 15,
            orderBy: page.orderBy || 'id',
            order: page.order || 'desc'
        },
        data: data || []
    };
};

/**
 * 返回普通失败mockup请求
 *
 * @param {Object} msg 失败信息
 * @return {Object} 返回接口数据
 */
mockup.fail = function (msg) {
    return {
        success: false,
        message: msg || ''
    };
};

module.exports = exports = mockup;
