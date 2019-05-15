<template>
    <div class="mdbubble" ref="mdbubble" :style="style"></div>
</template>

<script>
import echarts from 'echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import _ from 'underscore';
import $ from 'jquery';

import mdutil from '../util/util';
import {COLORS, DEFAULT_POINT, LEGEND_STATUS} from './CONSTANTS';

export default {
    name: 'mdbubble',
    props: {
        // 坐标轴展示内容
        axis: {
            type: Object,
            default: () => ({}),
            required: false
        },

        // 坐标轴状态内容
        axisStatus: {
            type: Object,
            default: () => ({}),
            required: false
        },

        // 过滤坐标点
        axisFilterLists: {
            type: Array,
            default: () => ([]),
            required: false
        },

        // 状态 key 名
        statusKey: {
            type: String,
            default: 'status',
            required: false
        },

        tooltip: {
            type: Function,
            default: () => false,
            required: false
        },

        showTooltips: {
            type: Boolean,
            default: false,
            required: false
        },

        groupsColors: {
            type: Array,
            default: () => (mdutil.deepClone(COLORS)),
            required: false
        },

        extraOptions: {
            type: Object,
            default: () => ({}),
            required: false
        },

        legendStatus: {
            type: Array,
            default: () => LEGEND_STATUS,
            required: false
        }
    },
    data() {
        return {
            // 包含颜色风格的坐标轴内容
            axisWithStyle: [],

            point: mdutil.deepClone(DEFAULT_POINT),

            mdbubble: '',

            series: []
        };
    },
    mounted() {
        this.renderCore();
        $(window).on('resize', _.throttle(this.resize, 200));
    },
    computed: {
        // 用于监听改变的对象，用于重新计算
        watchObj() {
            return [this.axis, this.axisStatus, this.axisFilterLists, this.statusKey, this.tooltip, this.showTooltips];
        },
        style() {
            let count = 0;
            Object.entries(this.axis).forEach(item => {
                count += item[1].length;
            });
            return {height: count * 32 + 100 + 'px'};
        }
    },
    methods: {
        renderCore() {
            if (mdutil.isEmpty(this.axis)) {
                return;
            }
            this.initAreaColor();
            this.pointClassification();
            const option = this.initOption();

            if (!this.mdbubble) {
                this.mdbubble = echarts.init(this.$refs.mdbubble);
                this.mdbubble.on('click', ({data}) => {
                    if (data && data.length >= 2) {
                        const source = this.axisWithStyle[data[1]];
                        const destination = this.axisWithStyle[data[0]];
                        this.$emit('toDetail', {source: source.value, destination: destination.value});
                    }
                });
                if (this.showTooltips) {
                    this.mdbubble.on('mouseover', () => {
                        this.mdbubble.setOption({tooltip: {show: true}});
                    });
                    this.mdbubble.on('mouseout', () => {
                        this.mdbubble.setOption({tooltip: {show: false}});
                    });
                }
            }
            this.mdbubble.setOption(option);
            if (this.extraOptions) {
                this.mdbubble.setOption(this.extraOptions);
            }
            this.resize();
        },

        /**
         * 初始化地域列表颜色
         */
        initAreaColor() {
            let axisWithStyle = [];
            let groupsColors = this.groupsColors.slice();
            for (let groupName in this.axis) {
                if (this.axis.hasOwnProperty(groupName)) {
                    let groupWithStyle = [];
                    const color = groupsColors.shift()
                        || (groupsColors = this.groupsColors.slice())
                        && groupsColors.shift();
                    this.axis[groupName].forEach(value => {
                        const groupItem = {
                            value,
                            textStyle: {color}
                        };
                        if (this.axisFilterLists && this.axisFilterLists.indexOf(value) !== -1) {
                            groupItem.textStyle.fontWeight = 'lighter';
                        }
                        groupWithStyle.push(groupItem);
                    });
                    axisWithStyle = axisWithStyle.concat(groupWithStyle);
                }
            }
            this.axisWithStyle = axisWithStyle;
        },

        /**
         * 分类各种种类的点
         */
        pointClassification() {
            const point = mdutil.deepClone(DEFAULT_POINT);
            this.axisWithStyle.forEach((yAxisItem, yAxisIndex) => {
                let filterFlag = false;
                if (this.axisFilterLists.includes(yAxisItem.value)) {
                    filterFlag = true;
                }
                this.axisWithStyle.forEach((xAxisItem, xAxisIndex) => {
                    if (filterFlag || this.axisFilterLists.includes(xAxisItem.value)) {
                        this.classificationCore(xAxisItem, yAxisItem, xAxisIndex, yAxisIndex, point, 'filter');
                    }
                    else {
                        this.classificationCore(xAxisItem, yAxisItem, xAxisIndex, yAxisIndex, point);
                    }
                });
            });
            this.point = point;
        },

        /**
         * 分类核心函数
         *
         * @param {Object} xAxisItem x 坐标点内容
         * @param {Object} xAxisIndex x 坐标点 index 值
         * @param {Object} yAxisItem y 坐标点内容
         * @param {Object} yAxisIndex y 坐标点 index 值
         * @param {Array} point 坐标点对象
         * @param {string} target 目标坐标数组
         */
        classificationCore(xAxisItem, yAxisItem, xAxisIndex, yAxisIndex, point, target = '') {
            if (this.axisStatus[xAxisItem.value] && this.axisStatus[xAxisItem.value][this.statusKey]) {
                const errorStatusList = this.axisStatus[xAxisItem.value][this.statusKey];

                this.legendStatus.forEach(legendItem => {
                    if (errorStatusList[yAxisItem.value] === legendItem.type) {
                        // 对角线上的点命名为 {target}Diagonal{type}List
                        let key = '';
                        if (xAxisIndex === yAxisIndex) {
                            key = `${target}Diagonal${mdutil.upFirstWord(legendItem.type)}List`;
                            if (!mdutil.isArray(point[key])) {
                                point[key] = [];
                            }
                            point[key].push([xAxisIndex, yAxisIndex]);
                        }
                        else {
                            key = `${target}${legendItem.type}List`;
                            if (!mdutil.isArray(point[key])) {
                                point[key] = [];
                            }
                            point[key].push([xAxisIndex, yAxisIndex]);
                        }
                        this.initSeries(legendItem, key, point);
                    }
                });
            }
        },

        /**
         * 初始化 echarts 配置文件
         *
         * @return {object} 配置文件
         */
        initOption() {
            return {
                color: this.groupsColors,
                grid: {
                    show: false,
                    containLabel: true,
                    top: 15,
                    left: 10,
                    right: 25,
                    bottom: 25,
                    y2: 30
                },
                tooltip: {
                    show: this.showTooltips,
                    trigger: 'item',
                    padding: 0,
                    formatter: params => {
                        const axisWithStyle = this.axisWithStyle;
                        const axisStatus = this.axisStatus;
                        const tooltip = ['进入{tip}单元', '查看{tip}连通性'];

                        // 采用外部配置的 tooltip
                        const extraTooltip = this.tooltip(params, axisWithStyle, axisStatus);
                        if (extraTooltip) {
                            return extraTooltip;
                        }

                        if (params.data) {
                            const yAxisItem = axisWithStyle[params.data[1]].value;
                            const xAxisItem = axisWithStyle[params.data[0]].value;
                            const drillDownLists = axisStatus[yAxisItem].drillDownLists;
                            let content = '';

                            if (params.data[0] === params.data[1]) {
                                if (drillDownLists && drillDownLists.length) {
                                    content = drillDownLists.map(item => (`<li>${item}</li>`)).join('\n');
                                }
                                else {
                                    content = `<li>${tooltip[0].replace('{tip}', ` ${params.name} `)}</li>`;
                                }
                            }
                            else {
                                content = `<li>${tooltip[1].replace('{tip}',
                                    ` ${yAxisItem} 到 ${xAxisItem}`)}</li>`;
                            }
                            return `<ul class="diy-tooltips">${content}</ul>`;
                        }
                        return false;
                    },
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: 'rgba(255, 0, 0, .3)',
                            type: 'solid',
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0)',
                                fontSize: 0
                            }
                        },
                        label: {
                            show: false
                        }
                    }
                },
                legend: {
                    show: false,
                    top: 10,
                    right: 0
                },
                yAxis: {
                    boundaryGap: false,
                    data: this.axisWithStyle,
                    inverse: true,
                    axisLabel: {
                        margin: 22,
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'Microsoft Yahei'
                        }
                    },
                    axisTick: {
                        length: 15,
                        lineStyle: {
                            color: '#e6e6e6',
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#414d5d'
                        }
                    },
                    axisPointer: {
                        snap: true
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#e6e6e6',
                            type: 'dashed'
                        }
                    }
                },
                xAxis: {
                    position: 'top',
                    boundaryGap: false,
                    data: this.axisWithStyle,
                    axisLabel: {
                        margin: 25,
                        interval: 0,
                        rotate: 25,
                        formatter: val => {
                            // 文字过长换行显示
                            return val.split('_').join('\n');
                        },
                        textStyle: {
                            fontSize: 12,
                            align: 'center',
                            fontFamily: 'Microsoft Yahei'
                        }
                    },
                    axisTick: {
                        length: 15,
                        lineStyle: {
                            color: '#e6e6e6',
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#414d5d'
                        }
                    },
                    axisPointer: {
                        snap: true
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#e6e6e6',
                            type: 'dashed'
                        }
                    }
                },
                series: this.series
            };
        },

        initSeries(legendItem, key, point) {
            const hasSeriesItem = this.series.some(seriesItem => seriesItem && seriesItem.dataKey === key);
            if (!hasSeriesItem) {
                this.series.push({
                    dataKey: key,
                    name: legendItem.typeName || legendItem.name,
                    type: 'scatter',
                    symbol: legendItem.typeSymbol || 'circle',
                    symbolSize: +legendItem.typeSymbolSize || 14,
                    itemStyle: {
                        normal: {
                            color: legendItem.color,
                            borderColor: legendItem.color
                        }
                    },
                    data: point[key]
                });
            }
        },

        resize() {
            this.$nextTick(() => this.mdbubble.resize());
        }
    },
    watch: {
        watchObj: {
            handler() {
                this.renderCore();
            },
            deep: true
        }
    },
    beforeDestroy() {
        typeof this.mdbubble.dispose === 'function' ? this.mdbubble.dispose() : '';
    },
    destroyed() {
        $(window).off('resize');
    }
};
</script>

<style lang="less">
    .mdbubble {
        .diy-tooltips {
            padding: 2px 10px;
            background: #fff;
            border: 1px solid #ddd;
            box-shadow: 0 1px 4px 0 rgba(11, 32, 86, .20);

            li {
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                color: #666;
            }
        }
    }
</style>
