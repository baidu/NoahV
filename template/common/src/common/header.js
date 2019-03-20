/**
 * @file header config
 */

export default {
    header: [
        {
            label: '模板示例',
            key: 'tplDemo',
            children: [
                {
                    label: '表格示例',
                    key: 'tableDemo',
                    link: 'tableDemo'
                },
                {
                    label: '表单示例',
                    key: 'formDemo',
                    link: 'formDemo'
                },
                {
                    label: '筛选表格示例',
                    key: 'filterTableDemo',
                    link: 'filterTableDemo'
                }
            ]
        },
        {
            label: '图表示例',
            key: 'chart',
            children: [
                {
                    label: '图表示例',
                    key: 'chartDemo',
                    link: 'chartDemo'
                },
                {
                    label: '时序趋势图示例',
                    key: 'demo/chart/trend',
                    selected: true,
                    link: 'demo/chart/trend'
                }
            ]
        },
        {
            label: '主题示例',
            key: 'themes',
            children: [
                {
                    label: '按钮示例',
                    key: 'theme/button',
                    link: 'theme/button'
                },
                {
                    label: '表格示例',
                    key: 'theme/table',
                    link: 'theme/table'
                },
                {
                    label: '输入框示例',
                    key: 'input',
                    link: 'theme/input'
                },
                {
                    label: '单选按钮示例',
                    key: 'radio',
                    link: 'theme/radio'
                },
                {
                    label: '复选按钮示例',
                    key: 'checkbox',
                    link: 'theme/checkbox'
                },
                {
                    label: '浮窗示例',
                    key: 'toast',
                    link: 'theme/toast'
                },
                {
                    label: '提示说明示例',
                    key: 'tooltip',
                    link: 'theme/tooltip'
                },
                {
                    label: '弹窗示例',
                    key: 'modal',
                    link: 'theme/modal'
                },
                {
                    label: '标签示例',
                    key: 'tabs',
                    link: 'theme/tabs'
                },
                {
                    label: '分页示例',
                    key: 'page',
                    link: 'theme/page'
                },
                {
                    label: '下拉菜单示例',
                    key: 'select',
                    link: 'theme/select'
                },
                {
                    label: '开关示例',
                    key: 'switch',
                    link: 'theme/switch'
                // },
                // {
                //     label: '搜索框示例',
                //     key: 'find',
                //     link: 'theme/find'
                }
            ]
        }
    ],
    hasBread: true,
    logo: {
        // 是否需要logo
        hasLogo: true,
        title: 'NoahV',
        // eslint-disable-next-line no-undef
        src: require('common/assets/img/logo.png')
    },
    login: {
        hasLogin: true,
        url: '/api/user',
        logout: '/api/logout'
    },
    type: 'header',
    separator: '/'
};
