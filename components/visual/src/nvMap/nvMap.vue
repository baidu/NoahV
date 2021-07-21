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

import {t} from '../locale';

const ERRORCONFIG = t('nvMap.loadError');
const MAP_OPTIONS = {
    tooltip: {
        backgroundColor: '#aaaabb',
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
                ${params.value ? params.value * 100 + '%' : t('nvMap.noData')}
                </span></dd>`;
            if (params.data && params.data.toolTipData) {
                _.each(params.data.toolTipData, item => {
                    seriesTooltip.push(`<dd style="padding: 3px 15px;color: #666;font-size: 12px;">
                    ${item.name}
                    : <span style="display: block;float: right;color: #333;">
                    ${item.value + (item.unit ? item.unit : '')}
                    </span></dd>`);
                });
            }
            else {
                seriesTooltip.push(html);
            }
            return '<dl style="min-width: 180px;padding-bottom: 10px">'
                + '<dt style="padding: 10px 15px 5px 15px;color: #333;margin-bottom: 3px;font-size:13px;">'
                + params.name
                + '</dt>'
                + seriesTooltip.join('')
                + '</dl>';
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#F0EFF0',
                borderColor: '#FFF'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
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
            name: '',
            type: 'map',
            map: 'china',
            selectedMode: false,
            backgroundColor: '#aaaabb',
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
                emphasis: {
                    areaColor: '#09f'
                }
            },
            emphasis: {
                itemStyle: {
                    areaColor: false,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: []
        }
    ]
};


export default {
    props: {
        title: {
            type: String,
            default() {
                return t('nvMap.title');
            }
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
        },
        mapData: {
            type: Array,
            required: false,
            default: () => []
        },
        seriesName: {
            type: String,
            required: false,
            default() {
                return t('nvMap.metricName');
            }
        },
        dataFilter: {
            type: Function,
            required: false
        }
    },
    data() {
        return {
            map: null,
            isLoading: false,
            isShowError: false
        };
    },
    watch: {
        mapData: {
            handler() {
                if (!this.map) {
                    return;
                }
                MAP_OPTIONS.series[0].data = this.mapData;
                this.map.setOption(MAP_OPTIONS);
            },
            deep: true
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
    },
    methods: {
        getInstance() {
            return this.map;
        },
        renderChart() {
            this.isLoading = true;
            this.map = echarts.init(this.$refs.map);
            this.map.on('click', 'series', data => {
                this.$emit('on-series-click', {
                    name: data.name,
                    data: data.data
                });
            });
            Object.assign(MAP_OPTIONS, this.options);
            if (this.seriesName) {
                MAP_OPTIONS.series[0].name = this.seriesName;
            }
            if (this.url) {
                this.getMapData();
            }
            else {
                if (this.mapData) {
                    MAP_OPTIONS.series[0].data = this.mapData;
                }
                this.map.setOption(MAP_OPTIONS);
            }
        },
        resizeMap() {
            if (this.map && typeof this.map.resize === 'function') {
                this.map.resize();
            }
        },
        // 获取数据
        getMapData() {
            this.$wRequest({
                url: this.url,
                params: this.params,
                method: this.method
            }).then(data => {
                let mapData = data.data.data;
                if (dataFilter && typeof dataFilter === 'function') {
                    mapData = dataFilter(mapData);
                }
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
            return false;
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

