/**
 * @file router config
 * @author darren(darrenywyu@gmail.com)
 */
/* eslint-disable no-undef */
export default [
    // Keep this line if you want auto add router by noahv create
    {
        component: r => require.ensure([], () => r(require('src/example/trend/trend')), 'example/trend/trend'),
        path: '/example/trend/trend'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/request.md')), 'guide/request'),
        path: '/guide/request'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/dashboardCreate.md')),
            'doc/view/api/dashboardCreate'), path: '/doc/view/api/dashboardCreate'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/dashboardList.md')),
            'doc/view/api/dashboardList'), path: '/doc/view/api/dashboardList'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/dashboardCopy.md')),
            'doc/view/api/dashboardCopy'), path: '/doc/view/api/dashboardCopy'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/dashboardDelete.md')),
            'doc/view/api/dashboardDelete'), path: '/doc/view/api/dashboardDelete'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/updateMeta.md')),
            'doc/view/api/updateMeta'), path: '/doc/view/api/updateMeta'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/widgetCreate.md')),
            'doc/view/api/widgetCreate'), path: '/doc/view/api/widgetCreate'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/widgetDelete.md')),
            'doc/view/api/widgetDelete'), path: '/doc/view/api/widgetDelete'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/widgetSave.md')),
            'doc/view/api/widgetSave'), path: '/doc/view/api/widgetSave'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/widgetCopy.md')),
            'doc/view/api/widgetCopy'), path: '/doc/view/api/widgetCopy'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/dashboardUpdate.md')),
            'doc/view/api/dashboardUpdate'), path: '/doc/view/api/dashboardUpdate'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/widgetConfig.md')),
            'doc/view/api/widgetConfig'), path: '/doc/view/api/widgetConfig'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/dashboardGet.md')),
            'doc/view/api/dashboardGet'), path: '/doc/view/api/dashboardGet'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/conf.md')), 'doc/view/conf'),
        path: '/doc/view/conf'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/api/api.md')), 'doc/view/api/api'),
        path: '/doc/view/api/api'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/quickstart.md')), 'doc/view/quickstart'),
        path: '/doc/view/quickstart'
    },
    {
        component: r => require.ensure([], () => r(require('src/doc/view/guide')), 'doc/view/guide'),
        path: '/doc/view/guide'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/mockup.md')), 'guide/mockup'),
        path: '/guide/mockup'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/router.md')), 'guide/router'),
        path: '/guide/router'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/deploy.md')), 'guide/deploy'),
        path: '/guide/deploy'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/proxy.md')), 'guide/proxy'),
        path: '/guide/proxy'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/specification.md')), 'guide/specification'),
        path: '/guide/specification'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/theme.md')), 'guide/theme'),
        path: '/guide/theme'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/tpl.md')), 'guide/tpl'),
        path: '/guide/tpl'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/menu.md')), 'guide/menu'),
        path: '/guide/menu'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/catalog.md')), 'guide/catalog'),
        path: '/guide/catalog'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/quickstart')), 'guide/quickstart'),
        path: '/guide/quickstart'
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/about')), 'guide/about'),
        path: '/guide/about',
        entry: true
    },
    {
        component: r => require.ensure([], () => r(require('src/guide/qa.md')), 'guide/qa'),
        path: '/guide/qa'
    },
    {
        path: '/doc/component/icon',
        component: r => require.ensure([], () => r(require('src/doc/icon/icon')), 'icon')
    },
    {
        path: '/doc/template/basic-table',
        component: r => require.ensure([], () => r(require('src/doc/template/table/table.md')), 'doc-table')
    },
    {
        path: '/doc/template/filter-table',
        component: r => require.ensure(
            [],
            () => r(require('src/doc/template/table/filterTable.md')),
            'doc-filter-table'
        )
    },
    {
        path: '/doc/template/form',
        component: r => require.ensure([], () => r(require('src/doc/template/form/form.md')), 'doc-form')
    },
    {
        path: '/doc/template/contrast-trend',
        component: r => require.ensure([], () => r(require('src/doc/template/trend/contrastTrend.md'))
            , 'doc-contrast-trend')
    },
    {
        path: '/doc/template/trend',
        component: r => require.ensure([], () => r(require('src/doc/template/trend/trend.md'))
            , 'doc-trend')
    },
    {
        path: '/doc/component/date-picker',
        component: r => require.ensure([], () => r(require('src/doc/component/datePicker/datePicker.md'))
            , 'doc-date-picker')
    },
    {
        path: '/doc/component/tree',
        component: r => require.ensure([], () => r(require('src/doc/component/tree/tree.md')), 'tree')
    },
    {
        path: '/doc/component/steps',
        component: r => require.ensure([], () => r(require('src/doc/component/steps/steps.md')), 'steps')
    },
    {
        path: '/doc/component/tag',
        component: r => require.ensure([], () => r(require('src/doc/component/tag/tag.md')), 'tag')
    },
    {
        path: '/doc/component/business/list',
        component: r => require.ensure([], () => r(require('src/doc/component/business/list/list')), 'list')
    },
    {
        path: '/doc/component/business/buttonTpl',
        component: r => require.ensure(
            [], () => r(require('src/doc/component/business/buttonTpl/buttonTpl')), 'buttonTpl')
    },
    {
        path: '/doc/component/business/switchTpl',
        component: r => require.ensure(
            [], () => r(require('src/doc/component/business/switchTpl/switchTpl')), 'switchTpl')
    },
    {
        path: '/doc/component/business/chart',
        component: r => require.ensure(
            [], () => r(require('src/doc/component/business/chart/chart')), 'chart')
    },
    {
        path: '/doc/component/business/trend',
        component: r => require.ensure(
            [], () => r(require('src/doc/component/business/trend/trend')), 'trend')
    },
    {
        path: '/doc/component/business/constrastTrend',
        component: r => require.ensure(
            [], () => r(require('src/doc/component/business/constrastTrend/constrastTrend')), 'constrastTrend')
    },
    {
        path: '/doc/component/business/dialogTpl',
        component: r => require.ensure(
            [], () => r(require('src/doc/component/business/dialogTpl/dialogTpl')), 'dialogTpl')
    },
    {
        path: '/doc/component/text-line',
        component: r => require.ensure([], () => r(require('src/doc/component/textLine/textLine.md'))
            , 'doc-text-line')
    },
    {
        path: '/doc/component/search',
        component: r => require.ensure([], () => r(require('src/doc/component/search/search.md'))
            , 'doc-search')
    },
    {
        path: '/doc/component/dutyTable',
        component: r => require.ensure([], () => r(require('src/doc/component/dutyTable/dutyTable.md'))
            , 'doc-dutyTable')
    },
    {
        path: '/color/index',
        component: r => require.ensure([], () => r(require('src/color/index')), 'color-index')
    },
    {
        path: '/example/table/normal',
        component: r => require.ensure([], () => r(require('src/example/table/normal')), 'example-table-normal')
    },
    {
        path: '/doc/visualComponent/report',
        component: r => require.ensure([], () => r(require('src/doc/visualComponent/report')), 'saasvReport')
    },
    {
        path: '/doc/visualComponent/billboard',
        component: r => require.ensure([], () => r(require('src/doc/visualComponent/billboard')), 'saasvBillboard')
    },
    {
        path: '/doc/visualComponent/trend',
        component: r => require.ensure([], () => r(require('src/doc/visualComponent/trend')), 'saasvTrend')
    },
    {
        path: '/doc/visualComponent/circle',
        component: r => require.ensure([], () => r(require('src/doc/visualComponent/circle')), 'saasvCircle')
    },
    {
        path: '/doc/visualComponent/eventriver',
        component: r => require.ensure([], () => r(require('src/doc/visualComponent/eventriver')), 'saasvEventrive')
    }
];
/* eslint-enable */
