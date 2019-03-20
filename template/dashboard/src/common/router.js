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
        path: '/dashboard/list',
        component: r => require.ensure([], () => r(require('../view/dashboard/list')), 'dashboardList'),
        entry: true
    },
    {
        path: '/dashboard/edit',
        component: r => require.ensure([], () => r(require('../view/dashboard/edit')), 'dashboardEdit')
    },
    {
        path: '/dashboard/view',
        component: r => require.ensure([], () => r(require('../view/dashboard/view')), 'dashboardView')
    },
    {
        path: '/dashboard/widget/edit',
        component: r => require.ensure([], () => r(require('../view/dashboard/widget/edit')), 'dashboardWidgetEdit')
    },
    // please keep this object last one
    {
        component: r => require.ensure([], () => r(require('src/common/layout/404')), '404'),
        path: '*'
    }
    /* eslint-enable */
];
