/**
 * @file router config
 */
export default [
    /* eslint-disable no-undef */
    // Keep this line if you want auto add router by noahv create
    {
        component: r => require.ensure([], () => r(require('src/demo/chart/trend')), 'demo/chart/trend'),
        path: '/demo/chart/trend'
    },
    {
        // file path，string or object
        component: r => require.ensure([], () => r(require('src/demo/table/tableDemo')), 'tableDemo'),
        // hash name,unique
        path: '/tableDemo'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/form/formDemo')), 'formDemo'),
        path: '/formDemo'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/table/filterTableDemo')), 'filterTableDemo'),
        path: '/filterTableDemo'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/chart/chartDemo')), 'chartDemo'),
        path: '/chartDemo'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/button')), 'button'),
        path: '/theme/button'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/table')), 'table'),
        path: '/theme/table'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/input')), 'input'),
        path: '/theme/input'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/checkbox')), 'checkbox'),
        path: '/theme/checkbox'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/radio')), 'radio'),
        path: '/theme/radio'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/toast')), 'toast'),
        path: '/theme/toast'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/tooltip')), 'tooltip'),
        path: '/theme/tooltip'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/modal')), 'modal'),
        path: '/theme/modal'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/tabs')), 'tabs'),
        path: '/theme/tabs'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/page')), 'page'),
        path: '/theme/page'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/select')), 'select'),
        path: '/theme/select'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/switch')), 'switch'),
        path: '/theme/switch'
    },
    {
        component: r => require.ensure([], () => r(require('src/demo/theme/find')), 'find'),
        path: '/theme/find'
    },
    // please keep this object last one
    {
        component: r => require.ensure([], () => r(require('src/common/layout/404')), '404'),
        path: '*'
    }
    /* eslint-enable */
];
