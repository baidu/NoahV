<template>
    <div :class="getCls('chart')">
        <h3>{{resTitle}}</h3>
        <vue-echarts :options="curOptions" ref="chart"></vue-echarts>
    </div>
</template>

<script>
import _ from 'lodash';
import vueEcharts from './vueEcharts';
import getClassName from '../utils.js';
import options from './options';
import chartUtil from './chartUtil';

export default {
    name: 'NvChart',
    props: {
        title: String,
        url: {
            type: String,
            required: true
        },
        params: Object,
        options: Object,
        type: String,
        showLoading: String,
        dataFilter: Function,
        method: String
    },

    components: {
        vueEcharts
    },
    data() {
        return {
            resTitle: this.title || '',
            curOptions: this.options
                ? chartUtil.deepAssign({}, this.defaultOptions(), this.options)
                : chartUtil.deepAssign({}, this.defaultOptions())
        };
    },
    mounted() {
        this.getData();
    },
    watch: {
        // params数据监听，变化的时候处理
        params: {
            handler() {
                this.getData();
            },
            deep: true
        }
    },
    methods: {
        /**
         * 获取类名
         *
         * @param {String} postfix 后缀名称
         * @return {Object} 样式集合
         */
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        getInstance() {
            return this.$refs.chart.getChart();
        },
        getData() {

            let config = {
                url: this.url
            };

            if (typeof this.showLoading !== 'undefined') {
                this.$refs.chart.showLoading(this.showLoading);
                config.showLoading = false;
            }

            let method = 'post';
            if (this.method) {
                method = this.method.toLowerCase();
            }
            config.method = method;

            if (method === 'get') {
                config.params = this.params;
            }
            else {
                config.data = this.params;
            }

            this.$request(config).then(response => {
                let data = response.data.data;

                if (typeof this.showLoading !== 'undefined') {
                    this.$refs.chart.hideLoading();
                }
                // set the title
                this.resTitle = this.title ? this.title : data.title;
                // set the series
                if (this.dataFilter && typeof this.dataFilter === 'function') {
                    // 自定义处理数据
                    data = this.dataFilter(data);
                }
                _.each(data.data, item => {
                    item.type = this.type || 'line';
                    // 兼容处理柱状图命名问题
                    if (item.type === 'column') {
                        item.type = 'bar';
                    }
                });


                let curOptions = _.cloneDeep(this.curOptions);

                if (this.type === 'pie') {
                    let pieData;
                    if (Array.isArray(data.data) && data.data.length > 0) {
                        pieData = data.data[0];
                    }
                    else {
                        pieData = data.data;
                    }

                    _.each(pieData.data, item => {
                        if (item.y !== undefined && item.value === undefined) {
                            item.value = item.y;
                        }
                    });
                    curOptions.series = pieData;
                    curOptions.series.radius = curOptions.series.radius || [0, '50%'];
                    if (this.options.series && this.options.series.label === true){
                        curOptions.series.label = {
                            show: true
                        };
                    }
                    else {
                        curOptions.series.label = {
                            show: false
                        };
                    }
                }
                else {
                    // set the categories and data
                    curOptions.series = data.data;
                    curOptions.xAxis.data = data.categories;
                    curOptions.chartNotMerge = true;
                }
                this.curOptions = Object.assign({}, curOptions);
            });
        },
        defaultOptions() {
            const type = this.type || 'line';
            return options[type + 'Chart'];
        }
    }
};
</script>

