/**
 * @file public tools
 * @author Joannamo(joannamo123@163.com)
 */

const utils = {};

utils.getQueryString = (search, name) => {
    const reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
    const r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
};

utils.getRedirectLink = (header, sidebar) => {
    let result = '';
    const headerLink = header.link;
    const link = sidebar.link;
    const toggleLink = sidebar.toggleLink;

    if (typeof headerLink === 'undefined' || headerLink === '') {
        // two level
        if (link !== '') {
            result = link;
        }
        // three level
        else {
            result = toggleLink;
        }
    }

    // one level
    if (typeof headerLink !== 'undefined' && headerLink !== '') {
        result = headerLink;
    }

    return result;
};

export default utils;
