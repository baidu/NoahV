<template>
    <div :class="getCls('form')">
        <Form
            :ref="ref"
            :model="formtpl"
            :inline="inline"
            :label-position="labelPosition"
        >
            <FormItem
                v-for="(item, index) in itemsData"
                :key="index"
                :label="item.title"
                :prop="item.name"
                :label-width="item.labelwidth !== undefined ? item.labelwidth : labelWidth"
                :rules="getValidatorRules(item)">
                <Row>
                    <Col
                        :span="item.inline"
                        v-if="item.type.toUpperCase() === 'INPUT'"
                    >
                        <Input
                            :placeholder="item.placeholder"
                            v-model="formtpl[item.name]"
                            :type="item.types"
                            :style="item.style"
                            :rows="item.rows"
                            :disabled="item.disabled"
                            :readonly="item.readonly"
                        >
                        </Input>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'SELECT'"
                    >
                        <Select
                            v-model="formtpl[item.name]"
                            :placeholder="item.placeholder"
                            :style="item.style"
                            :disabled="item.disabled"
                            @on-change="selectChange($event, item)"
                        >
                            <Option v-for="(list, i) in item.option"
                                :key="i"
                                :value="list.value"
                                :title="list.title"
                            >
                                {{list.name}}
                            </Option>
                        </Select>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'SEARCH'"
                    >
                       <NvSearch
                            v-model="formtpl[item.name]"
                            :data="item.data"
                            :cascader="item.cascader"
                            :clearable="item.clearable"
                            :placeholder="item.placeholder"
                       >
                       </NvSearch>
                       <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'CHECKBOX'"
                    >
                        <Checkbox
                            v-model="formtpl[item.name]"
                            :disabled="item.disabled"
                        >
                            {{item.label}}
                        </Checkbox>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'TIME'"
                    >
                        <DatePicker
                            type="datetime"
                            v-model="formtpl[item.name]"
                            placeholder="选择日期和时间"
                            :style="item.style"
                            :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
                            :options="item.options ? item.options : timeShortcuts"
                            :disabled="item.disabled"
                            :readonly="item.readonly"
                        >
                        </DatePicker>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'TIMERANGE'"
                    >
                        <DatePicker
                            type="datetimerange"
                            v-model="formtpl[item.name]"
                            placeholder="选择日期和时间"
                            :style="item.style"
                            :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
                            :options="item.options ? item.options : timeRangeShortcuts"
                            :disabled="item.disabled"
                            :readonly="item.readonly"
                            @on-clear="timerangeClear(item.name)"
                        >
                         </DatePicker>
                         <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'NVTIME'"
                    >
                        <NvDatePicker
                            :theme="item.theme ? item.theme : 'console'"
                            :language="item.language ? item.language : 'cn'"
                            :width="item.width ? item.width : 350"
                            :type="item.nvType ? item.nvType : 'date'"
                            :options="item.options ? item.options : {}"
                            :dateFormat="item.dateFormat ? item.dateFormat : 'YYYY-MM-DD'"
                            :ref="item.ref ? item.ref : 'nvDatePicker'"
                            v-model="formtpl[item.name]"
                            @on-change="formtpl[item.name] = $event"
                        >
                        </NvDatePicker>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'NVTIMERANGE'"
                    >
                        <NvDatePicker
                            v-model="formtpl[item.name]"
                            :theme="item.theme ? item.theme : 'console'"
                            :language="item.language ? item.language : 'cn'"
                            :width="item.width ? item.width : 350"
                            :type="item.nvType ? item.nvType : 'daterange'"
                            :options="item.options ? item.options : {}"
                            :dateFormat="item.dateFormat ? item.dateFormat : 'YYYY-MM-DD'"
                            :ref="item.ref ? item.ref : 'nvDatePicker'"
                            @on-change="formtpl[item.name] = $event"
                        >
                        </NvDatePicker>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'CHECKBOXGROUP'"
                    >
                        <CheckboxGroup
                            v-model="formtpl[item.name]"
                        >
                            <Checkbox
                                v-for="(list, i) in item.option"
                                :key="i"
                                :label="list.name"
                                :disabled="item.disabled || list.disabled"
                            >
                            </Checkbox>
                        </CheckboxGroup>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'RADIOGROUP'"
                    >
                        <RadioGroup
                            :vertical="item.vertical"
                            :type="item.types"
                            v-model="formtpl[item.name]"
                        >
                            <Radio
                                v-for="(list, i) in item.option"
                                :key="i"
                                :label="list.value"
                                :disabled="item.disabled || list.disabled"
                            >
                                {{list.name}}
                            </Radio>
                        </RadioGroup>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'CASCADER'"
                    >
                        <Cascader
                            :data="item.data"
                            v-model="formtpl[item.name]"
                            :disabled="item.disabled"
                        >
                        </Cascader>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'INPUTNUMBER'"
                    >
                        <InputNumber
                            :max="item.max"
                            :min="item.min"
                            :step="item.step"
                            v-model="formtpl[item.name]"
                            :disabled="item.disabled"
                            :readonly="item.readonly"
                        >
                        </InputNumber>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col
                        :span="item.inline"
                        v-else-if="item.type.toUpperCase() === 'SWITCH'"
                    >
                        <i-switch
                            v-model="formtpl[item.name]"
                            :disabled="item.disabled"
                            :size="item.size"
                            :true-value="item.trueValue === undefined ? true : item.trueValue"
                            :false-value="item.falseValue === undefined ? false : item.falseValue"
                        >
                            <span slot="open" v-if="item.openLable || item.openLabel">
                                {{item.openLable || item.openLabel}}
                            </span>
                            <span slot="close" v-if="item.closeLable || item.closeLabel">
                                {{item.closeLable || item.closeLabel}}
                            </span>
                        </i-switch>
                        <slot v-if="item.slot" :name="item.name"></slot>
                    </Col>
                    <Col span="8" v-else>
                    </Col>
                </Row>
            </FormItem>
            <FormItem class="btn-list">
                <Button
                    v-for="(list, i) in action"
                    :key="i"
                    :type="list.type"
                    @click="handleBtnEvent(list)"
                >
                    {{list.title}}
                </Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import u from 'underscore';
import m from 'moment';
import getClassName from '../utils.js';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';
const REF = 'formtpl';
const FORMTYPE = {
    input: 'string',
    select: 'string',
    checkbox: 'boolean',
    time: 'date',
    timerange: 'array',
    search: 'object',
    nvtime: 'date',
    nvtimerange: 'array',
    checkboxgroup: 'array',
    radiogroup: 'string',
    switch: 'boolean',
    inputnumber: 'number',
    cascader: 'array'
};
const initValue = item => {
    if (item.value) {
        return item.value;
    }
    return FORMTYPE[item.type.toLowerCase()] === 'array' ? []
        : FORMTYPE[item.type.toLowerCase()] === 'boolean' ? false
            : FORMTYPE[item.type.toLowerCase()] === 'number' ? 0
                : FORMTYPE[item.type.toLowerCase()] === 'object' ? {}
                    : '';
};

export default {
    props: {
        items: {
            type: Array,
            default: () => []
        },
        action: {
            type: Array,
            default: () => []
        },
        layout: String,
        position: String,
        labelwidth: [String, Number],
        url: String,
        // 获取默认数据时的额外参数
        args: Object,
        // 提交数据时的额外参数
        params: Object,
        method: String,
        data: Object,
        showLoading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        let items = this.items;
        this.formTemp = {};
        items.forEach(item => {
            this.formTemp[item.name] = initValue(item);
        });
        return {
            // 时间组件快捷选择
            timeShortcuts: {
                shortcuts: [
                    {
                        text: '今天',
                        value() {
                            return new Date();
                        }
                    },
                    {
                        text: '昨天',
                        value() {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            return date;
                        }
                    },
                    {
                        text: '一周前',
                        value() {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            return date;
                        }
                    }
                ]
            },
            // 时间区间组件快捷选择
            timeRangeShortcuts: {
                shortcuts: [
                    {
                        text: '2小时',
                        value() {
                            return [
                                m().subtract(2, 'h').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '12小时',
                        value() {
                            return [
                                m().subtract(12, 'h').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '1天',
                        value() {
                            return [
                                m().subtract(1, 'd').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '7天',
                        value() {
                            return [
                                m().subtract(7, 'd').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '15天',
                        value() {
                            return [
                                m().subtract(15, 'd').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        text: '30天',
                        value() {
                            return [
                                m().subtract(30, 'd').toDate(),
                                m().toDate()
                            ];
                        }
                    }
                ]
            },
            // 当前组件的ref
            ref: REF,
            // FormItem的数据
            formtpl: this.formTemp,
            // 是否inline展示表单
            inline: this.layout === 'inline',
            // FormItem的数据类型
            formType: FORMTYPE,
            // 表单名称展示位置
            labelPosition: this.position || this.layout === 'inline' ? 'left' : 'right',
            // 表单名称所占宽度
            labelWidth: this.position === 'top' ? ''
                : this.labelwidth ? this.labelwidth : 80
        };
    },
    computed: {
        itemsData() {
            u.each(this.items, item => {
                item.inline = this.layout === 'inline' ? 24
                    : item.width === '100%' ? 24 : 8;
                item.style = {width: item.width ? item.width : '300px'};
            });
            return this.items;
        }
    },
    created() {
        if (this.url || this.data) {
            this.initDefaultValue(
                this.url,
                this.args,
                this.method,
                data => {
                    u.each(this.formTemp, (value, key) => {
                        this.formTemp[key] = data[key] || value;
                    });
                }
            );
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
        /**
         * 获取表单某项的校验规则
         *
         * @param {Object} item 该项的配置信息
         * @return {Object} 返回校验规则对象
         */
        getValidatorRules(item) {
            if (item.type.toUpperCase() === 'NVTIMERANGE') {
                if (item.required) {
                    return {
                        type: 'array',
                        required: true,
                        len: 2,
                        fields: {
                            0: {type: 'date', required: true, message: item.title + '不能为空'},
                            1: {type: 'date', required: true, message: item.title + '不能为空'}
                        }
                    };
                }
            }
            else if (item.type.toUpperCase() === 'SEARCH') {
                if (item.required) {
                    if (item.cascader) {
                        return {
                            type: 'object',
                            required: true,
                            fields: {
                                searchName: {type: 'array', required: true, min: 1, message: item.title + '不能为空'},
                                searchValue: {type: 'string', required: true, message: item.title + '不能为空'}
                            }
                        };
                    }
                    else {
                        return {
                            type: 'object',
                            required: true,
                            fields: {
                                searchName: {type: 'string', required: true, message: item.title + '不能为空'},
                                searchValue: {type: 'string', required: true, message: item.title + '不能为空'}
                            }
                        };
                    }
                }
            }
            else if (item.required) {
                return {
                    required: true,
                    type: item.validateType || this.formType[item.type.toLowerCase()] || 'string',
                    message: item.title + '不能为空',
                    trigger: item.type.toLowerCase() === 'input' ? 'blur' : 'change'
                };
            }
        },
        /**
         * 初始化表单默认数据，通过url获取信息，使用name作为可以从url返回数据中去默认数据
         *
         * @param {string} url 获取默认数据的url，来自用户指定
         * @param {string} args 获取默认数据时指定的参数，来自用户指定
         * @param {string} method 请求方法，来自用户指定
         * @param {function} callback 回调方法
         */
        initDefaultValue(url, args, method, callback) {
            if (this.data) {
                return callback(this.data);
            }
            method = method ? method.toLowerCase() : 'post';
            this.$request({
                url: url,
                method: method,
                data: (method === 'post'
                    || method === 'put'
                    || method === 'patch') ? args : '',
                params: (method === 'get' || method === 'delete') ? args : ''
            }).then(response => {
                if (response.data.success) {
                    callback(response.data.data);
                }
                else {
                    this.$Message.error(response.data.message);
                }
            });
        },

        /**
         * 查找提交的数据别名，可以通过submitAlias设置提交别名
         *
         * @param {string} key 数据列的name
         *
         * @return {Array|undefined} 找到的提交别名，如果没有设置，则返回undefined
         */
        findSubmitAlias(key) {
            let submitAlias;
            u.find(this.items, item => {
                if (item.name === key) {
                    submitAlias = item.submitAlias;
                    return true;
                }
            });
            return submitAlias;
        },

        /**
         * 获得表单数据，不校验
         *
         * @return {Object} 表单数据
         */
        getItemValues() {
            this.submitData = {};
            u.each(this.formtpl, (value, key) => {
                let submitAlias = this.findSubmitAlias(key);
                if (value instanceof Date === true) {
                    if (submitAlias !== undefined) {
                        this.submitData[submitAlias] = m(value).format(FORMAT);
                    }
                    else {
                        this.submitData[key] = m(value).format(FORMAT);
                    }
                }
                else if (Array.isArray(value)) {
                    let tempValue = [];
                    u.each(value, (item, i) => {
                        if (value[i] instanceof Date === true) {

                            tempValue[i] = m(value[i]).format(FORMAT);
                        }
                        else {
                            tempValue[i] = value[i];
                        }
                    });
                    if (submitAlias !== undefined) {
                        if (Array.isArray(submitAlias)) {
                            if (submitAlias.length === 0) {
                                this.submitData[key] = tempValue;
                            }
                            u.each(submitAlias, (name, i) => {
                                this.submitData[name] = tempValue[i];
                            });
                        }
                        else {
                            this.submitData[submitAlias] = tempValue;
                        }
                    }
                    else {
                        this.submitData[key] = tempValue;
                    }
                }
                else if (submitAlias !== undefined) {
                    this.submitData[submitAlias] = value;
                }
                else {
                    this.submitData[key] = value;
                }
            });
            return this.submitData;
        },

        /**
         * 处理按钮事件，主要支持reset和submit
         *
         * @param {string} item 当前按钮的配置
         */
        handleBtnEvent(item) {
            if (item.name === 'reset') {
                this.$refs[this.ref].resetFields();
                if (item.callback && typeof item.callback === 'function') {
                    item.callback(item);
                }
                // 兼容link和linkTo写法
                if (item.link || item.linkTo) {
                    const Link = item.link || item.linkTo;
                    window.location.href = Link;
                }
            }
            else if (item.name === 'submit') {
                this.submitItem = item;
                this.fireSubmitEvent();
            }
            else {
                if (item.callback && typeof item.callback === 'function') {
                    item.callback(item);
                }
                // 兼容link和linkTo写法
                if (item.link || item.linkTo) {
                    const Link = item.link || item.linkTo;
                    window.location.href = Link;
                }
            }
        },

        /**
         * 查找当前的提交配置
         *
         * @return {Object} submit配置
         *
         */
        findSubmitItem() {
            if (this.action && this.action.length) {
                u.find(this.action, item => {
                    if (item.name === 'submit') {
                        this.submitItem = item;
                        return true;
                    }
                });
                if (!this.submitItem) {
                    this.$Message.error('没有action配置信息');
                    return null;
                }
                return this.submitItem;
            }
            else {
                this.$Message.error('没有action配置信息');
                return null;
            }
        },

        /**
         * 触发提交事件，校验输入
         *
         * @param {string} item 当前按钮的配置
         * @param {Object} args 额外的参数
         */
        fireSubmitEvent(args) {
            const item = this.submitItem || this.findSubmitItem();
            this.$refs[this.ref].validate(valid => {
                if (valid) {
                    this.submitData = this.getItemValues();
                    // 处理默认参数
                    if (this.params) {
                        Object.assign(this.submitData, this.params);
                    }
                    // fire接受参数
                    if (args && args instanceof Object) {
                        Object.assign(this.submitData, args);
                    }
                    this.submitHanlder(item, this.submitData);
                }
            });
        },

        /**
         * 校验表单
         *
         * @param {Boolean} 是否通过校验
         */
        validateForm() {
            let validResult = false;
            this.$refs[this.ref].validate(valid => {
                if (valid) {
                    validResult = true;
                }
            });
            return validResult;
        },
        /**
         * 提交处理逻辑
         *
         * @param {string} item submit按钮的配置
         * @param {string} submitData 表单数据
         */
        submitHanlder(item, submitData) {
            // 如果没有配置信息，直接返回
            if (!item) {
                return;
            }
            if (item.submitUrl) {
                if (typeof item.beforeXhr === 'function') {
                    item.beforeXhr();
                }
                if (typeof item.filterData === 'function') {
                    submitData = item.filterData(submitData);
                }
                let params = {};
                Object.assign(params, submitData, item.args);
                let method = item.method || this.method || 'post';
                method = method.toLowerCase();
                const conf = {
                    method: method,
                    url: item.submitUrl,
                    data: (method === 'post' || method === 'put' || method === 'patch') ? params : '',
                    params: (method === 'get' || method === 'delete') ? params : '',
                    showLoading: this.showLoading !== false
                };
                this.$request(conf).then(response => {
                    if (response.data.success) {
                        if (response.data.redirect) {
                            this.$Message.success(item.successTip || '提交成功, 即将跳转');
                            setTimeout(() => {
                                window.location.href = response.data.redirect;
                            }, 1000);
                            return;
                        }
                        if (item.linkTo || item.link) {
                            this.$Message.success(item.successTip || '提交成功, 即将跳转');
                            setTimeout(() => {
                                const linkInfo = item.linkTo || item.link;
                                window.location.href = linkInfo;
                            }, 1000);
                        }
                        else if (item.callback) {
                            item.callback(submitData, response.data);
                        }
                        else {
                            this.$Message.success(item.successTip || '提交成功');
                        }
                    }
                    else {
                        this.$Message.error(response.data.message ? response.data.message : 'Submit Error!');
                        if (item.errorCallBack instanceof Function) {
                            item.errorCallBack(response.data);
                        }
                    }
                }).catch(error => {
                    // 统一在util中提示错误的状态码
                    if (item.errorCallBack instanceof Function) {
                        item.errorCallBack(error);
                    }
                });
            }
            else if (item.callback instanceof Function) {
                item.callback(submitData);
            }
            else {
                this.$Message.error('请定义表单提交的URL或者定义回调函数');
            }
        },

        /**
         * 保证时间区间组件的校验功能可用
         *
         * @param {string} name 当前item的名称
         */
        timerangeClear(name) {
            this.formtpl[name] = [];
        },

        /**
         * 下拉框option变更处理方法
         *
         * @param {string} name 当前item的名称
         */
        selectChange(e, item) {
            if (item.event && item.event.onChange && typeof item.event.onChange === 'function') {
                item.event.onChange(e);
            }
        },

        /**
         * 设置form表单数据
         * @param {Object} obj 设置表单的数据
         */
        setFormValue(obj) {
            u.each(this.formTemp, (value, key) => {
                this.formTemp[key] = obj[key] || value;
            });
        },

        /**
         * 还原form表单
         */
        reset() {
            this.items.forEach(item => {
                this.formTemp[item.name] = initValue(item);
            });
        }
    },
    watch: {
        items: {
            handler(data) {
                data.forEach(item => {
                    this.formTemp[item.name] = initValue(item);
                });
            },
            deep: true
        }
    }
};
</script>

