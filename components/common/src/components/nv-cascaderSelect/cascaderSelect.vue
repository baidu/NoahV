<template>
    <div :class="prefixCls" v-clickoutside="close">
        <div class="input-wrapper" @click="toggle($event)">
            <Input v-model="showValue" :readonly="true" :placeholder="placeholder" :title="showValue" clearable></Input>
            <Icon class="arrow-btn" :type="drop ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>
        </div>
        <transition>
            <div v-show="drop" :class="{'sub-menu-open': this.selectedMenu.value}">
                <ul v-if="data && data.length" class="menu">
                    <li v-for="(item, i) in data" :key="item.value + '_' + i" :class="getMenuCls(item)" @click="menuClick(item)" @mouseenter="mouseEnter(item)">
                        <span :title="item.label">{{ item.label }}</span>
                        <Icon v-if="item.children && item.children.length" type="ios-arrow-right"></Icon>
                    </li>
                </ul>
                <Caspanel :data="activeMenu.children" @on-change="subMenuClick">
                </Caspanel>
            </div>
        </transition>
    </div>
</template>
<script>
import Caspanel from './caspanel';
import clickoutside from './cascaderSelect.js';

const prefixCls = 'noahv-cascader-select';
export default {
    name: 'CascaderSelect',
    components: { Caspanel },
    directives: { clickoutside },
    props: {
        data: {
            type: Array,
            default () {
                return [];
            }
        },
        trigger: {
            type: String,
            default: 'click',
            validator(val) {
                return ['click', 'hover'].indexOf(val) > -1;
            }
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        splitCharacter: {
            type: String,
            default: '/'
        }
    },
    data() {
        return {
            prefixCls: prefixCls,
            drop: false,
            activeMenu: {},
            selectedMenu: {},
            selectedKeys: [],
            selectedValues: [],
            showValue: ''
        };
    },
    mounted() {
        this.buildLink();
    },
    methods: {
        /**
         * 获取样式
         *
         * @param {Object} item 当前节点
         * @return 返回样式集合
         */
        getMenuCls(item) {
            return [
                'menu-item',
                {
                    'menu-item-active': item.active
                }
            ];
        },
        /**
         * 构建链式结构
         *
         */
        buildLink() {
            this.data.forEach(item => {
                item.parent = null;
                (item.children || []).forEach(subItem => {
                    subItem.parent = item.value;
                });
            })
        },
        /**
         * 展开收起面板
         *
         * @param {Object} event 当前事件对象
         */
        toggle(event) {
            const target = event.target;
            const className = target.className;
            if (className.indexOf('ivu-input-icon-clear') > -1) {
                this.clear();
                this.drop = false;
            } else {
                this.correctActive();
                this.drop = !this.drop;
            }
        },
        /**
         * 点击一级菜单处理逻辑
         *
         * @param {Object} activeItem 当前点击或hover一级节点
         */
        menuClick(activeItem) {
            // 重复点击active节点本身，直接返回
            if (this.activeMenu.value === activeItem.value) {
                return;
            }
            // 允许点击选中无子节点的一级菜单项，允许勾选选中二级菜单项
            // 场景1：选中的是无子节点的一级菜单项
            if (!activeItem.hasOwnProperty('children')) {
                this.data.forEach(item => {
                    this.$set(item, 'active', item.value === activeItem.value);
                    this.$set(item, 'selected', item.value === activeItem.value);
                    (item.children || []).forEach(subItem => {
                        this.$set(subItem, 'active', false);
                        this.$set(subItem, 'selected', false);
                    });
                });
            }
            // 场景2：选中的是有子节点的一级菜单项
            else {
                // do nothing
                // 选中的是有子节点的一级菜单项时，在勾选二级菜单项时，进行状态的更新和维护
                this.data.forEach(item => {
                    this.$set(item, 'active', item.value === activeItem.value);
                });
            }
            // 重新计算selectedKeys & selectedValues
            this.updateselectedKeys();
            // 注意选中和样式是分离的
            this.activeMenu = activeItem;
            if (activeItem.selected) {
                this.selectedMenu = activeItem;
            }
            // 如果当前选中为无子节点的菜单项，默认收起
            // 注意，不可以与前面的遍历merge
            if (!activeItem.hasOwnProperty('children')) {
                this.close();
            }
        },
        /**
         * 点击二级菜单处理逻辑
         *
         * @param {Object} subActive 当前点击或hover的二级节点
         */
        subMenuClick(subActive) {
            const parentMenuValue = subActive.parent;
            this.$set(subActive, 'selected', subActive.active);
            this.data.forEach(item => {
                if (item.value !== parentMenuValue) {
                    item.active = false;
                    item.selected = false;
                    (item.children || []).forEach(subItem => {
                        subItem.active = false;
                        subItem.selected = false;
                    });
                }
            });
            // 重新计算selectedKeys & selectedValues
            this.updateselectedKeys();
        },
        /**
         * 维护选中的项
         *
         */
        updateselectedKeys() {
            this.selectedKeys = [];
            this.selectedValues = [];
            this.data.forEach(item => {
                if (item.selected && !item.hasOwnProperty('children')) {
                    this.pushInto(this.selectedKeys, item.label);
                    this.pushInto(this.selectedValues, item.value);
                }
                else {
                    (item.children || []).forEach(subItem => {
                        if (subItem.selected) {
                            this.pushInto(this.selectedKeys, subItem.label);
                            this.pushInto(this.selectedValues, subItem.value);
                        }
                    });
                }
            });
        },
        /**
         * 打开面板时，修正菜单项激活状态，显示选中的项为初始态
         */
        correctActive() {
            let isContinue = true;
            for (let item of this.data) {
                if (!item.hasOwnProperty('children') && this.selectedValues.indexOf(item.value) > -1) {
                    this.activeMenu = item;
                    break;
                }
                for (let subItem of (item.children || [])) {
                    if (this.selectedValues.indexOf(subItem.value) > -1) {
                        isContinue = false;
                        this.activeMenu = item;
                        break;
                    }
                }
                if (!isContinue) {
                    break;
                }
            }
            this.data.forEach(item => {
                this.$set(item, 'active', item.value === this.activeMenu.value);
            });
        },
        /**
         * 数组的push操作
         *
         * @param {Array} array 操作的目标数组
         * @param {String} target 要放入的元素的某个属性值
         */
        pushInto(array, target) {
            if (array.indexOf(target) === -1) {
                array.push(target);
            }
        },
        /**
         * 数组的pop操作
         *
         * @param {Array} array 操作的目标数组
         * @param {String} target 要移除的元素的某个属性值
         */
        removeOut(array, target) {
            let index = array.indexOf(target);
            if (index > -1) {
                array.splice(index, 1);
            }
        },
        /**
         * 关闭面板
         *
         */
        close() {
            if (!this.drop) {
                return;
            }
            this.drop = false;
            this.showValue = this.selectedKeys.join(this.splitCharacter);
            this.$emit('on-change', this.selectedValues);
        },
        /**
         * 支持hover展开二级面板
         *
         * @param {Object} item hover的一级节点对象
         */
        mouseEnter(item) {
            if (this.trigger === 'click') {
                return;
            }
            if (item.children && item.children.length) {
                this.menuClick(item);
            }
        },
        /**
         * 清空信息
         *
         */
        clear() {
            this.data.forEach(item => {
                this.$set(item, 'active', false);
                this.$set(item, 'selected', false);
                if (item.children && item.children.length) {
                    item.children.forEach(subItem => {
                        this.$set(subItem, 'active', false);
                        this.$set(subItem, 'selected', false);
                    });
                }
            });
            this.activeMenu = {};
            this.selectedMenu = {};
            this.selectedValues = [];
            this.selectedKeys = [];
            this.$emit('on-change', []);
        },
        /**
         * 对外暴露接口，获取选中的项
         *
         * @return 返回选中的项
         */
        getActiveItems() {
            return this.selectedValues;
        }
    }
};

</script>

