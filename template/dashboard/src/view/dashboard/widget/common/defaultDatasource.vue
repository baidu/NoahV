<template>
    <div class="default-datasource">
        <Form :model="datasource" :label-width="60">
            <FormItem label="请求地址" class="input-item">
                <Input
                    type="textarea"
                    class="input-box request"
                    v-model="datasource.api"
                    placeholder="请填写获取组件数据的API地址"
                    @on-blur="itemChange"
                />
            </FormItem>
            <FormItem label="请求方法" class="input-item">
                <Select class="input-box method" v-model="datasource.method" @on-change="itemChange">
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                </Select>
            </FormItem>
            <FormItem label="请求参数" class="input-item">
                <Input
                    type="textarea"
                    class="input-box params"
                    v-model="datasource.params"
                    :rows="1"
                    placeholder='{"key1": "value1", "key2": "value2"}'
                    @on-blur="itemChange"
                />
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    name: 'default-data',
    data() {
        return {
        };
    },
    methods: {
        itemChange() {
            this.datasource = Object.assign({}, this.datasource);
        }
    },
    computed: {
        datasource: {
            get() {
                let data = this.$store.state.dashboard.widgetConfig.datasource || {
                    api: '',
                    method: 'GET',
                    params: ''
                };
                try {
                    if (typeof data.params === 'object') {
                        data.params = JSON.stringify(data.params);
                    }
                }
                catch (err) {
                    // handle err
                }
                return data;
            },
            set(data) {
                try {
                    data.params = JSON.parse(data.params);
                }
                catch (err) {
                    // handle err
                }
                this.$store.commit('UPDATE_CONFIG', {datasource: data});
            }
        }
    }
};
</script>

<style lang="less">
.default-datasource {
    margin-top: 20px;
    .ivu-select-item {
        line-height: 1;
        font-size: 12px;
    }
    .input-item {
        font-size: 12px;
        color: #262626;
        margin-bottom: 10px;
        .input-box {
            &.request {
                width: 340px;
                vertical-align: text-top;
                .ivu-input {
                    line-height: 1;
                    font-size: 12px;
                }
            }
            &.method {
                width: 100px;
                font-size: 12px;
                &.ivu-select-single .ivu-select-selection {
                    height: 25px;
                    font-size: 12px;
                    &.ivu-select-selected-value {
                        font-size: 12px;
                    }
                }
            }
            &.params {
                width: 340px;
                .ivu-input {
                    line-height: 1;
                    min-height: 25px;
                    font-size: 12px;
                }
            }
            display: inline-block;
            margin-left: 10px;
        }
    }
}
</style>
