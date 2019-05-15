/**
 * @file 常量
 * @author tanrich@foxmail.com
 */

export const COLORS = ['#108CEE', '#8A58BC', '#545FC8', '#F38800', '#EA2E2E', '#5FB333', '#FBBE04', '#04C1BA'];
export const DEFAULT_POINT = {} || {
    // 严重异常点
    ErrorList: [],

    // 轻度异常点
    WarningList: [],

    // 普通点
    NormalList: [],

    // 对角线点
    DiagonalList: [],

    // 严重异常普通点
    AreaErrorList: [],

    // 轻度异常对角线点
    AreaWarningList: [],

    // 过滤严重异常普通点
    filterErrorList: [],

    // 过滤轻度异常普通点
    filterWarningList: [],

    // 过滤严重异常对角线点
    filterAreaErrorList: [],

    // 过滤轻度异常对角线点
    filterAreaWarningList: []
};
export const LEGEND_STATUS = [
    {
        name: '正常',
        color: '#3a62ca'
    },
    {
        name: '延迟异常',
        color: '#ef8700'
    },
    {
        name: '丢包异常',
        color: '#f62626'
    }
];
