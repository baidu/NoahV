<template>
    <div class="choose-origin-div">
         <ul>
            <li class="expression">
                <span>列计算</span>
                <Dropdown
                    class="alias-dropdown"
                    placement="bottom-start"
                    trigger="custom"
                    :visible="visible"
                    @on-visible-change="closeDropDown"
                >
                    <a class="alias-trigger" href="javascript:void(0)" @click="openDropDown">
                        列别名
                        <i class="tip ivu-icon ivu-icon-arrow-down-b"></i>
                    </a>
                    <DropdownMenu slot="list">
                        <div @mouseleave="leaveDropdown">
                            <ul class="alias-list clearfix">
                                <li v-for="alias in aliasList" @click="chooseAlias(alias)">
                                    {{ alias }}
                                </li>
                            </ul>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </li>
            <li>
                <Dropdown class="operator-dropdown" placement="bottom-start" @on-click="chooseOperator">
                    <a class="operator-trigger" href="javascript:void(0)" >
                        运算符
                        <i class="ivu-icon ivu-icon-arrow-down-b"></i>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem
                            v-for="item in operatorList"
                            :key="item.value"
                            :name="item.value"
                        >
                            {{ item.value }}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </li>
        </ul>
        <Input
            class="expression-input"
            :class="{'error-tip': errorStatus}"
            v-model="expression"
            type="textarea"
            :rows="4"
            placeholder="列计算之间可以进行四则运算，如：（别名1+别名2）* 别名3"
        ></Input>
        <span v-if="errorStatus" class="error-msg">请设置“列别名”，进行“列计算”</span>
    </div>
</template>
<script>
export default {
    props: {
        originColumn: Array,
        metric: String
    },
    data() {
        return {
            operator: '',
            operatorList: [
                {
                    value: '+'
                }, {
                    value: '-'
                }, {
                    value: '*'
                }, {
                    value: '/'
                }, {
                    value: '('
                }, {
                    value: ')'
                }
            ],
            metricList: [],
            visible: false,
            errorStatus: false,
            expression: this.metric || ''
        };
    },
    computed: {
        aliasList() {
            return this.originColumn;
        }
    },
    watch: {
        metric(val) {
            this.expression = val || '';
        }
    },
    methods: {
        closeDropDown(visible) {
            if (!visible) {
                this.metricList = [];
            }
        },
        /**
         * 鼠标离开dropdown
         */
        leaveDropdown() {
            this.visible = false;
        },

        /**
         * 展开监控项选择
         */
        openDropDown() {
            this.visible = !this.visible;
        },
        /**
         * 选择运算符
         *
         * @param  {[type]} operatorStr [description]
         * @return {[type]}             [description]
         */
        chooseOperator(operatorStr) {
            this.errorStatus = false;
            this.expression = this.expression + operatorStr;
        },

        /**
         * 选择列别名
         *
         * @param  {[type]} alias [description]
         */
        chooseAlias(alias) {
            this.expression = this.expression + ' #{' + alias + '}';
            this.visible = false;
            this.errorStatus = false;
        },

        /**
         * 重置表达式
         *
         * @return {[type]} [description]
         */
        resetExpress() {
            this.expression = '';
        },

        /**
         * 获取表达式值
         *
         * @return {[type]} [description]
         */
        getExpression() {
            if (!this.expression) {
                this.errorStatus = true;
            }
            return this.expression;
        }
    }
};
</script>
<style lang="less">
    .choose-origin-div {
        ul {
            li {
                float: left;
                .expression-trigger,
                .operator-trigger {
                    padding: 4px 10px;
                    background: #fff;
                    border: 1px solid #e2e2e2;
                    border-radius: 2px;
                    color: #666;
                    i {
                        margin-left: 35px;
                        font-size: 12px;
                        color: #55abf9;
                        &.ivu-icon {
                            display: inline;
                        }
                    }
                }
                &.expression {
                    margin-right: 4px;
                    & > span {
                        background: #e6f0ff;
                        padding: 4px 7px;
                        border-radius: 3px 0 0 3px;
                        border: 1px solid #e2e2e2;
                        border-right: none;
                    }
                    .ivu-dropdown {
                        margin-left: -5px;
                        .expression-trigger {
                            border-left: none;
                            i {
                                margin-left: 226px;
                            }
                        }
                    }
                }
            }
        }
        .expression-input {
            margin-top: 7px;
            margin-left: 49px;
            width: 404px;
            .ivu-input {
                font-size: 12px;
            }
            &.error-tip {
                border: 1px solid #ff9c51;
            }
        }
        .error-msg {
            display: block;
            margin-left: 49px;
            margin-bottom: -10px;
            line-height: 26px;
            color: #ff9c51;
        }
        .ivu-dropdown {
            .ivu-dropdown-item {
                width: 100%;
            }
            &.operator-dropdown {
                text-align: center;
                .ivu-dropdown-menu {
                    min-width: 108px;
                }
            }
            &.alias-dropdown {
                .alias-trigger {
                    display: block;
                    height: 26px;
                    padding: 0 10px;
                    background: #fff;
                    line-height: 25px;
                    border: 1px solid #e2e2e2;
                    border-left: none;
                    color: #666;
                    i {
                        padding-left: 228px;
                        color: #55abf9;
                    }
                }
                .alias-list {
                    width: 295px;
                    height: 200px;
                    overflow: auto;
                    li {
                        display: block;
                        float: none;
                        padding: 0px 15px;
                        line-height: 22px;
                        cursor: pointer;
                        &:hover {
                            color: #fff;
                            background: #2389ff;
                        }
                    }
                }
            }
        }
    }
</style>
