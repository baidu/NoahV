/**
 * @file config for proxy, useful only in dev.
 *
 * @author darren(darrenywyu@gmail.com)
 *
 * The dev server is using http-proxy-middleware for proxying,
 * so you can refer to its docs for detailed usage.
 * see https://github.com/chimurai/http-proxy-middleware for documentation.
 */
/* eslint-disable no-undef */
module.exports = {
    proxy: {
        // proxy all requests starting with /proxy to target,
        // use /*/* will proxy all requests starting with any string
        // proxy useful only while path exist && option.target is exist
        path: ['/proxy'],
        option: {
            // the target to request
            target: 'http://online.baidu.com:8888/',
            // changes the origin of the host header to the target URL
            changeOrigin: true,
            // object, adds request headers. (Example: {Cookie:'mycookie'})
            headers: {
                // if target url need auth
                // get cookie by visit the target url
                Cookie: ''
            }
        }
    }
};
/* eslint-enable */
