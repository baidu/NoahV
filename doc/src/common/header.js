/**
 * @file header config
 * @author darren(darrenywyu@gmail.com)
 */

import logo from './assets/img/logo.png';

export default {
    header: [
        {
            label: '开发指南',
            key: 'devStart',
            type: 'overview',
            link: 'guide/about',
            children: [
                {
                    label: '关于NoahV',
                    key: 'guide/about',
                    link: 'guide/about',
                    type: 'overview'
                },
                {
                    label: '快速开始',
                    key: 'guide/quickstart',
                    link: 'guide/quickstart',
                    type: 'start-circle'
                },
                {
                    label: '目录结构',
                    key: 'guide/catalog',
                    link: 'guide/catalog',
                    type: 'network-topology'
                },
                {
                    label: '菜单配置',
                    key: 'guide/menu',
                    link: 'guide/menu',
                    type: 'remote-command'
                },
                {
                    label: '路由配置',
                    key: 'guide/router',
                    link: 'guide/router',
                    type: 'angle-right-square'
                },
                {
                    label: '模板使用',
                    key: 'guide/tpl',
                    link: 'guide/tpl',
                    type: 'template'
                },
                {
                    label: '定制主题',
                    key: 'guide/theme',
                    link: 'guide/theme',
                    type: 'application-deployment'
                },
                {
                    label: '接口规范',
                    key: 'guide/specification',
                    link: 'guide/specification',
                    type: 'angle-right-square'
                },
                {
                    label: '数据请求',
                    key: 'guide/request',
                    link: 'guide/request',
                    type: 'angle-right-square'
                },
                {
                    label: '模拟数据',
                    key: 'guide/mockup',
                    link: 'guide/mockup',
                    type: 'angle-right-square'
                },
                {
                    label: '开发环境代理配置',
                    key: 'guide/proxy',
                    link: 'guide/proxy',
                    type: 'angle-right-square'
                },
                {
                    label: '构建部署',
                    key: 'guide/deploy',
                    link: 'guide/deploy',
                    type: 'angle-right-square'
                },
                {
                    label: '常见问题',
                    key: 'guide/qa',
                    link: 'guide/qa',
                    type: 'angle-right-square'
                }
            ]
        },
        // {
        //     label: '设计规范',
        //     key: 'basic',
        //     link: 'color/index',
        //     type: 'client',
        //     children: [
        //         {
        //             label: '色彩',
        //             key: 'color/index',
        //             link: 'color/index',
        //             type: 'dashboard'
        //         }
        //     ]
        // },
        {
            label: '业务组件',
            key: 'doc/component',
            link: 'doc/component/icon',
            type: 'th-large',
            children: [
                {
                    label: 'icon',
                    key: 'doc/component/icon',
                    link: 'doc/component/icon',
                    type: 'application-deployment'
                },
                {
                    label: '树组件',
                    key: 'doc/component/tree',
                    link: 'doc/component/tree',
                    type: 'tree'
                },
                {
                    label: '日历组件',
                    key: 'doc/component/date-picker',
                    link: 'doc/component/date-picker',
                    type: 'calendar'
                },
                {
                    label: '步骤组件',
                    key: 'doc/component/steps',
                    link: 'doc/component/steps',
                    type: 'dot-circle-o'
                },
                {
                    label: '标签组件',
                    key: 'doc/component/tag',
                    link: 'doc/component/tag',
                    type: 'tag'
                },
                {
                    label: '带行号的文本框',
                    key: 'doc/component/text-line',
                    link: 'doc/component/text-line',
                    type: 'console'
                },
                {
                    label: '条件搜索框',
                    key: 'doc/component/search',
                    link: 'doc/component/search',
                    type: 'search'
                },
                {
                    label: '值班表组件',
                    key: 'doc/component/dutyTable',
                    link: 'doc/component/dutyTable',
                    type: 'table'
                },
                {
                    label: '自定义弹出框组件',
                    key: 'doc/component/business/dialogTpl',
                    link: 'doc/component/business/dialogTpl',
                    type: 'ellipsis-small-square-o'
                },
                {
                    label: '自定义按钮组件',
                    key: 'doc/component/business/buttonTpl',
                    link: 'doc/component/business/buttonTpl',
                    type: 'ellipsis-small-square'
                },
                {
                    label: 'toggle切换组件',
                    key: 'doc/component/business/switchTpl',
                    link: 'doc/component/business/switchTpl',
                    type: 'deployment-change'
                },
                {
                    label: '列表组件',
                    key: 'doc/component/business/list',
                    link: 'doc/component/business/list',
                    type: 'list'
                },
                {
                    label: '图表组件',
                    key: 'doc/component/business/chart',
                    link: 'doc/component/business/chart',
                    type: 'place'
                },
                {
                    label: '趋势图组件',
                    key: 'doc/component/business/trend',
                    link: 'doc/component/business/trend',
                    type: 'device'
                }
                // {
                //     label: '对比趋势图组件',
                //     key: 'doc/component/business/constrastTrend',
                //     link: 'doc/component/business/constrastTrend',
                //     type: 'device'
                // }
                // ]
                // }
            ]
        },
        {
            label: '可视化组件',
            key: 'doc/visualComponent',
            link: 'doc/visualComponent/circle',
            type: 'th-large',
            children: [
                {
                    label: '仪表图',
                    key: 'doc/visualComponent/circle',
                    link: 'doc/visualComponent/circle',
                    type: 'saasvCircle'
                },
                {
                    label: '趋势图',
                    key: 'doc/visualComponent/trend',
                    link: 'doc/visualComponent/trend',
                    type: 'saasvTrend'
                },
                {
                    label: '面板',
                    key: 'doc/visualComponent/billboard',
                    link: 'doc/visualComponent/billboard',
                    type: 'saasvBillboard'
                },
                {
                    label: '报表',
                    key: 'doc/visualComponent/report',
                    link: 'doc/visualComponent/report',
                    type: 'saasvReport'
                },
                {
                    label: '事件流图',
                    key: 'doc/visualComponent/eventriver',
                    link: 'doc/visualComponent/eventriver',
                    type: 'saasvEventriver'
                }
            ]
        },
        {
            label: '模板',
            key: 'doc/template',
            link: 'doc/template/basic-table',
            type: 'template',
            children: [
                {
                    label: '表格模板',
                    key: 'doc/template/basic-table',
                    link: 'doc/template/basic-table',
                    type: 'template-o'
                },
                {
                    label: '表单模板',
                    key: 'doc/template/form',
                    link: 'doc/template/form',
                    type: 'overview'
                },
                {
                    label: '筛选表格模板',
                    key: 'doc/template/filter-table',
                    link: 'doc/template/filter-table',
                    type: 'filter'
                },
                {
                    label: '时序趋势图模板',
                    key: 'doc/template/trend',
                    link: 'doc/template/trend',
                    type: 'device'
                }
            ]
        },
        {
            label: '仪表盘',
            key: 'doc/view',
            link: 'doc/view/guide',
            type: 'dashboard',
            children: [
                {
                    label: '概述',
                    key: 'doc/view/guide',
                    link: 'doc/view/guide',
                    type: 'template-o'
                },
                {
                    label: '快速使用',
                    key: 'doc/view/quickstart',
                    link: 'doc/view/quickstart',
                    type: 'template-o'
                },
                {
                    label: 'API接口',
                    key: 'doc/view/api',
                    link: 'doc/view/api/api',
                    type: 'template-o',
                    children: [
                        {
                            label: '概述',
                            key: 'doc/view/api/api',
                            link: 'doc/view/api/api'
                        },
                        {
                            label: 'dashboardList',
                            key: 'doc/view/api/dashboardList',
                            link: 'doc/view/api/dashboardList'
                        },
                        {
                            label: 'dashboardCreate',
                            key: 'doc/view/api/dashboardCreate',
                            link: 'doc/view/api/dashboardCreate'
                        },
                        {
                            label: 'dashboardCopy',
                            key: 'doc/view/api/dashboardCopy',
                            link: 'doc/view/api/dashboardCopy'
                        },
                        {
                            label: 'dashboardDelete',
                            key: 'doc/view/api/dashboardDelete',
                            link: 'doc/view/api/dashboardDelete'
                        },
                        {
                            label: 'updateMeta',
                            key: 'doc/view/api/updateMeta',
                            link: 'doc/view/api/updateMeta'
                        },
                        {
                            label: 'widgetCreate',
                            key: 'doc/view/api/widgetCreate',
                            link: 'doc/view/api/widgetCreate'
                        },
                        {
                            label: 'widgetDelete',
                            key: 'doc/view/api/widgetDelete',
                            link: 'doc/view/api/widgetDelete'
                        },
                        {
                            label: 'widgetCopy',
                            key: 'doc/view/api/widgetCopy',
                            link: 'doc/view/api/widgetCopy'
                        },
                        {
                            label: 'dashboardUpdate',
                            key: 'doc/view/api/dashboardUpdate',
                            link: 'doc/view/api/dashboardUpdate'
                        },
                        {
                            label: 'widgetConfig',
                            key: 'doc/view/api/widgetConfig',
                            link: 'doc/view/api/widgetConfig'
                        },
                        {
                            label: 'widgetSave',
                            key: 'doc/view/api/widgetSave',
                            link: 'doc/view/api/widgetSave'
                        },
                        {
                            label: 'dashboardGet',
                            key: 'doc/view/api/dashboardGet',
                            link: 'doc/view/api/dashboardGet'
                        }
                    ]
                },
                {
                    label: '可视化组件UI配置',
                    key: 'doc/view/conf',
                    link: 'doc/view/conf',
                    type: 'template-o'
                }
            ]
        }
    ],
    hasBread: true,
    logo: {
        // 是否需要logo
        hasLogo: true,
        title: 'NoahV文档',
        src: logo
    },
    login: {
        hasLogin: false,
        url: ''
    },
    type: 'header-sidebar',
    separator: '/'
};
