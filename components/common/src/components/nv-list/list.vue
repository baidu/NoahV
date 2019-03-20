<template>
    <div :class="listStyle">
        <div v-for="(item, index) in list" :key="index" :class="getCls('list-card')">
            <Card @click.native="click(item)">
                <p>
                    <span>{{item.name}}</span>
                </p>
                <p>
                    <i class="noahv-icon noahv-icon-clock"></i>
                    <span>{{item.time}}</span>
                </p>
                <p>
                    <i class="noahv-icon noahv-icon-template"></i>
                    <span>{{item.detail}}</span>
                </p>
            </Card>
            <div class="process-icon">
                <i class="noahv-icon noahv-icon-caret-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'underscore';
import getClassName from '../utils.js';

export default {
    name: 'NvList',
    props: {
        action: {
            type: Object,
            required: true
        },
        templates: Object,
        type: String,
        data: Array
    },
    data() {
        return {
            list: []
        };
    },
    computed: {
        listStyle() {
            let classConfig = [
                {
                    postfix: 'list-process-list',
                    condition: this.type === 'process'
                },
                {
                    postfix: 'list-flat-list',
                    condition: this.type !== 'process'
                }
            ];
            return getClassName.getConditionCls(classConfig);
        }
    },
    async mounted() {
        let data = this.data || await this.getData();
        this.initData(data);
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
        async getData() {
            let action = this.action;
            let config = {
                url: action.url
            };
            let method = 'post';
            if (action.method) {
                method = action.method.toLowerCase();
            }
            config.method = method;

            if (method === 'get') {
                config.params = action.params;
            }
            else {
                config.data = action.params;
            }
            let res = await this.$request(config);
            let data = res.data;
            return data.success ? data.data : [];
        },
        click(item) {
            if (item && item.link) {
                window.location.href = item.link;
            }
        },
        initData(data) {
            if (!this.templates) {
                return;
            }

            this.list = data.map(i => this.convertListItem(i));
        },
        convertListItem(data) {
            let item = {};
            _.templateSettings = {
                interpolate: /\$\{(.+?)\}/g
            };
            Object.keys(this.templates).forEach(key => {
                let compiled = _.template(this.templates[key]);
                item[key] = compiled(data);
            });
            return item;
        },
        setList(list, append) {
            list = this.convertListItem(list);
            if (append) {
                this.list.push(list);
            }
            else {
                this.list = [list];
            }
        }
    }
};
</script>

