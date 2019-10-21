<template>
    <div class="nv-map">
        <div class="nv-map-title">{{title}}</div>
        <div class="nv-map-content" ref="map" v-if="!isShowError"></div>
        <div class="nv-map-error-tip" v-if="isShowError">{{errorTip}}</div>
    </div>
</template>

<script>
import _ from 'underscore';
import echarts from 'echarts';
import chinaMap from 'echarts/map/js/china';
import mdutil from '../util/util';
const ERRORCONFIG = '加载失败';
const MAP_OPTIONS = {
    tooltip: {
        backgroundColor: '#fff',
        trigger: 'item',
        padding: [10, 20, 10, 10],
        textStyle: {
            color: '#666',
            fontSize: 12
        },
        axisPointer: {
            lineStyle: {
                color: '#3a62ca'
            }
        },
        extraCssText: 'border-radius:0;'
            + 'padding:0;'
            + 'background-color:rgba(255,255,255,.95);'
            + 'box-shadow:2px 2px 4px 2px rgba(58,98,202,.3);',
        formatter(params) {
            let seriesTooltip = [];
            let html = `<dd style="padding: 3px 15px;color: #666;font-size: 12px;">
                ${params.seriesName}
                : <span style="display: block;float: right;color: #333;">
                ${params.value ? params.value * 100 + '%' : '无数据'}
                </span></dd>`;
            seriesTooltip.push(html);
            if (params.data && params.data.toolTipData) {
                _.each(params.data.toolTipData, function (item) {
                    seriesTooltip.push(`<dd style="padding: 3px 15px;color: #666;font-size: 12px;">
                    ${item.name}
                    : <span style="display: block;float: right;color: #333;">
                    ${item.value + (item.unit ? item.unit : '')}
                    </span></dd>`);
                });
            }
            return '<dl style="min-width: 180px;padding-bottom: 10px">'
                + '<dt style="padding: 10px 15px 5px 15px;color: #333;margin-bottom: 3px;font-size:13px;">'
                + params.name
                + '</dt>'
                + seriesTooltip.join('')
                + '</dl>';
        }
    },
    visualMap: {
        type: 'piecewise',
        itemWidth: 14,
        itemHeight: 14,
        calculable: true,
        min: 0,
        max: 1,
        inRange: {
            color: ['#FF8282', '#FFD6A1', '#5ABDED', '#89E4BB']
        },
        pieces: [
            {min: 0, max: 0.2, label: '0% ~ 20%'},
            {min: 0.2, max: 0.5, label: '20% ~ 50%'},
            {min: 0.5, max: 0.8, label: '50% ~ 80%'},
            {min: 0.8, label: '> 80%'}

        ],
        itemSymbol: 'rect',
        bottom: 10,
        left: 10,
        orient: 'horizontal',
        itemGap: 20
    },
    series: [
        {
            name: '异常率',
            type: 'map',
            map: 'china',
            selectedMode : 'multiple',
            label: {
                normal: {
                    // show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#F0EFF0',
                    borderColor: '#FFF'
                },
                // emphasis: {
                //     areaColor: '#09f'
                // }
            },
            emphasis: {
                itemStyle: {
                    // areaColor: '#F0EFF0',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data:[
                // {name:'广东', value: 1},
                // {name:'西藏', value: 0},
                {name:'黑龙江', value: 0, toolTipData: [
                    {
                        name: '可用率',
                        value: 0,
                        unit: '%'
                    },
                    {
                        name: '响应时间',
                        value: 1000,
                        unit: 'ms'
                    }
                ]},
                {name:'河北', value: 0.9},
                // {name:'南海诸岛', value: 1}
            ]
        }
    ]
};


export default {
    props: {
        title: {
            type: String,
            default: '地图'
        },
        url: {
            type: String,
            required: false
        },
        params: {
            type: Object,
            required: false,
            default: () => {}
        },
        method: {
            type: String,
            required: false,
            default: 'post'
        },
        options: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    data() {
        return {
            isLoading: false,
            isShowError: false
        }
    },
    mounted() {
        this.renderChart();
        // 处理resize事件，IE只兼容IE9及以上
        this.resizeHandler = _.debounce(this.resizeMap, 200);
        window.addEventListener('resize', this.resizeHandler);
    },
    created() {
        // 如果有URL配置
        if (this.url) {
            this.getMapData();
        }
        this.map = null;
    },
    methods: {
        getInstance() {
            return this.map;
        },
        renderChart() {
            this.isLoading = true;
            this.map = echarts.init(this.$refs.map);
            Object.assign(MAP_OPTIONS, this.options);
            if (this.url) {
                this.getMapData();
            }
            else {
                this.map.setOption(MAP_OPTIONS);
            }
        },
        resizeMap() {
            if (this.map && typeof this.map.resize === 'function') {
                this.map.resize()
            }
        },
        // 获取数据
        getMapData() {
            this.$wRequest({
                url: this.url,
                params: this.params,
                method: this.method
            }).then((data) => {
                MAP_OPTIONS.series[0].data = data.data.data;
                this.map.setOption(MAP_OPTIONS);
            });
        },
        isInScreen() {
            const main = this.$refs.map;
            let top = mdutil.getScrollTop();
            let height = mdutil.getViewHeight();
            let offset = mdutil.getOffset(main);
            if (offset && offset.top < top + height && offset.bottom > top) {
                return true;
            }
            return false
        },
        scrollTop() {
            if (!this.isLoading
                && this.isInScreen()) {
                try {
                    this.renderChart();
                }
                catch (e) {
                    this.showError(ERRORCONFIG);
                }
            }
        },
        showError(errorInfo) {
            this.isLoading === true;
            this.errorTip = errorInfo;
            this.isShowError = true;

        }
    },
    beforeDestroy() {
        if (this.map) {
            this.map.dispose();
        }
        // 解绑事件
        window.removeEventListener('resize', this.resizeHandler);
    }
};
</script>

