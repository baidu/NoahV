<template>
    <div>
        <div :class="getCls('contrast-trend')">
            <NvForm
                :items="items"
                :layout="layout"
                :action="action"
            />
            <div v-for="item in trendItems">
                <h3>{{item.resTitle}}</h3>
                <nv-trend
                    :options="item.options"
                    :title="title"
                    :url="url"
                    :params="params"
                    :show-loading="showLoading"
                />
            </div>

        </div>
    </div>
</template>

<script>
import getClassName from '../utils.js';

export default {
    name: 'NvContrastTrend',
    props: {
        title: String,
        url: {
            type: String,
            required: true
        },
        params: Object,
        options: Object,
        showLoading: String,
        items: Array,
        layout: String
    },
    data() {
        return {
            resTitle: this.title ? this.title : '',
            trendItems: [],
            action: [
                {
                    name: 'submit',
                    type: 'primary',
                    title: '确定',
                    callback: FieldsValue => {
                        const items = this.items;
                        let params = {};
                        let fields = [];
                        items.forEach(item => {
                            if (item.contrast === true) {
                                fields.push({
                                    name: item.name,
                                    value: FieldsValue[item.name]
                                });
                            }
                            else {
                                params[item.name] = FieldsValue[item.name];
                            }
                        });
                        if (fields.length > 0) {
                            if (Array.isArray(fields[0].value) === false) {
                                this.$Notice.warning({
                                    desc: '请在多选框组中配置contrast属性'
                                });
                                return;
                            }
                            this.trendItems = [];
                            fields[0].value.forEach(name => {
                                if (this.nameList.indexOf(name) === -1) {
                                    this.nameList.push(name);
                                    this.$request.post(this.url, Object.assign(FieldsValue, {[fields[0].name]: name}))
                                        .then( response => {
                                            const data = response.data.data;
                                            this.resTitle = name ? name : data.title;
                                            this.trendItems.push({
                                                options: {
                                                    series: data.data
                                                },
                                                resTitle: this.resTitle
                                            });
                                        });
                                }
                            });
                        }
                        else {
                            this.$Notice.warning({
                                desc: '请配置contrast属性'
                            });
                        }
                    }
                }
            ],
            nameList: []
        };
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
        }
    }
};
</script>

