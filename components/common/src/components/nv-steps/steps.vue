<template>
    <div :class="getCls('steps-wrapper')">
        <div :class="getCls('steps-header-wrapper')">
            <span v-if="isPrevBtnShow" :class="getCls('steps-prev-btn')" @click="prevClickHandler"></span>
            <div v-if="ready" :class="getCls('steps-steps-wrapper')">
                <div v-for="(item, key) in items" :key="key" :class="getStepWrapperCls(item)">
                    <span v-if="isPrevLineShow(item)" :class="getPrevStepLineCls(item)"></span>
                    <span v-if="item.status === 'finished'" class="step-icon">
                        <img src="../../assets/img/nv-steps/finished.png"/>
                        <span
                            :style="getStepTextStyle(item)"
                            :class="getStepTextCls(item)"
                            @click="stepTextClickHandler(item)"
                        >
                            {{item.name}}
                        </span>
                    </span>
                    <span v-else-if="item.status === 'running'" class="step-icon">
                        <img src="../../assets/img/nv-steps/running-inner.png"/>
                        <img class="running-outer" src="../../assets/img/nv-steps/running-outer.png"/>
                        <span
                            :style="getStepTextStyle(item)"
                            :class="getStepTextCls(item)"
                            @click="stepTextClickHandler(item)"
                        >
                            {{item.name}}
                        </span>
                    </span>
                    <span v-else-if="item.status === 'pause'" class="step-icon">
                        <img src="../../assets/img/nv-steps/running-inner.png"/>
                        <span
                            :style="getStepTextStyle(item)"
                            :class="getStepTextCls(item)"
                            @click="stepTextClickHandler(item)"
                        >
                            {{item.name}}
                        </span>
                    </span>
                    <span v-else class="step-icon">
                        <span class="step-icon-ready"></span>
                        <span
                            :style="getStepTextStyle(item)"
                            :class="getStepTextCls(item)"
                            @click="stepTextClickHandler(item)"
                        >
                            {{item.name}}
                        </span>
                    </span>
                    <span v-if="isStepLineShow(item)" :class="getStepLineCls(item)"></span>
                    <span v-if="isBackLineShow(item)" :class="getBackStepLineCls(item)"></span>
                </div>
            </div>
            <span v-if="isBackBtnShow" :class="getCls('steps-back-btn')" @click="backClickHandler"></span>
        </div>
        <div v-if="panelShow && ready" :class="getCls('steps-steps-body-wrapper')">
            <div :style="stepsBodyNavStyle" class="nav nav-border"></div>
            <div :style="stepsBodyNavStyle" class="nav nav-background"></div>
            <div class="detail-wrapper">
                <slot name="detail"></slot>
            </div>
        </div>
        <p class="steps-compute-container"></p>
    </div>
</template>

<script>
import stepsUtils from './steps.js';
import getClassName from '../utils.js';

// 组件样式前缀名，兼容新旧版本样式
const saasvPrefixCls = 'saasv-steps';
const noahvPrefixCls = 'noahv-steps';

export default {
    name: 'NvSteps',
    data() {
        return {
            // 样式前缀
            saasvPrefixCls: saasvPrefixCls,
            noahvPrefixCls: noahvPrefixCls,
            // 数据集合
            items: [],
            // 是否挂载
            ready: false,
            // 当前指向阶段
            detailStage: 0,
            // 当前显示的第一个阶段
            firstStage: 0,
            // 文本宽度测量容器
            computeContainer: '',
            // 当前是否显示面板详情
            isPanelNavShow: true,
            // 当前可视区域内是否干预过
            isInterposeClick: false
        };
    },
    props: {
        // 阶段配置数据
        datas: Array,
        // 数据过多时，滑动幅度
        step: {
            type: Number,
            default: 1
        },
        // 同时显示的阶段数
        distance: {
            type: Number,
            default: 7
        },
        // 是否需要开启详情面板
        panelShow: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.ready = true;
        // 监听屏幕调整，以重新计算详情框的箭头位置
        window.addEventListener('resize', this.resizeHandler);
    },
    beforeDestroy() {
        // 实例离开时，解除事件绑定
        window.removeEventListener('resize', this.resizeHandler);
    },
    watch: {
        datas: {
            deep: true,
            immediate: true,
            handler() {
                this.init();
                if (!this.isInterposeClick) {
                    // 更新当前指向阶段，会自动触发computed中的指向位置计算
                    this.updateDetailStage();
                }
            }
        }
    },
    computed: {
        /**
         * 步进的幅度
         */
        steps() {
            return Math.min(this.step, this.distances);
        },
        /**
         * 展示的跨度
         */
        distances() {
            return Math.max(7, this.distance);
        },
        /**
         * 是否显示向前滑动按钮
         *
         * @param {Object} item 当前步骤对象
         */
        isPrevBtnShow() {
            return this.items
            && this.items.length
            && this.items[this.items.length - 1].rawInx !== this.datas.length - 1;
        },
        /**
         * 是否显示向后滑动按钮
         *
         * @param {Object} item 当前步骤对象
         */
        isBackBtnShow() {
            return this.firstStage;
        },
        /**
         * 获取显示面板的箭头style
         *
         *
         * @return {Number} style集合
         */
        stepsBodyNavStyle() {
            let style = {};
            let stepsWrapper = document.body.querySelector('.' + this.saasvPrefixCls + '-wrapper')
                            || document.body.querySelector('.' + this.noahvPrefixCls + '-wrapper');
            if (stepsWrapper) {
                let bodyWrapperWidth = stepsWrapper['offsetWidth']
                                    || this.getComputedAttribute(stepsWrapper, 'offsetWidth');
                if (this.detailStage > -1) {
                    let offset = bodyWrapperWidth * 0.9 * 0.155 * this.detailStage + bodyWrapperWidth * 0.05;
                    let detailStatus = this.items[this.detailStage].status;
                    if (detailStatus !== 'finished' && detailStatus !== 'running') {
                        offset -= 12;
                    }
                    style['left'] = offset + 'px';
                    this.isPanelNavShow = true;
                }
                else {
                    style['display'] = 'none';
                    this.isPanelNavShow = false;
                }
            }
            return style;
        }
    },
    methods: {
        /**
         * 初始化处理
         *
         */
        init() {
            if (this.datas && this.datas.length > 0) {
                this.items = stepsUtils.getShownDatas(this.datas, this.distances, this.firstStage);
            }
        },
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
         * 获取链接线的样式
         *
         * @param {Object} item 当前步骤对象
         */
        getStepLineCls(item) {
            return [
                'step-line',
                {
                    'finished': item.status === 'finished',
                    'unfinished': item.status !== 'finished'
                }
            ];
        },
        /**
         * 获取向前延展线的样式
         *
         * @param {Object} item 当前步骤对象
         */
        getPrevStepLineCls(item) {
            return [
                'step-prev-line',
                {
                    'finished': item.status === 'finished',
                    'unfinished': item.status !== 'finished'
                }
            ];
        },
        /**
         * 获取向后延展线的样式
         *
         * @param {Object} item 当前步骤对象
         */
        getBackStepLineCls(item) {
            return [
                'step-back-line',
                {
                    'finished': item.status === 'finished',
                    'unfinished': item.status !== 'finished'
                }
            ];
        },
        /**
         * 获取步骤文本样式
         *
         * @param {Object} item 当前步骤对象
         */
        getStepTextCls(item) {
            return [
                'step-text',
                {
                    'text-finished': item.status === 'finished',
                    'text-running': item.status === 'running',
                    'text-paused': item.status === 'pause',
                    'text-unfinished': item.status === 'ready'
                }
            ];
        },
        /**
         * 获取步骤项样式
         *
         * @param {Object} item 当前步骤对象
         */
        getStepWrapperCls(item) {
            return {
                'step-wrapper': !item.lastShown,
                'step-last-shown': item.lastShown
            };
        },
        /**
         * 获取步骤文本style
         *
         * @param {Object} item 当前步骤对象
         * @return {Object} 返回style集合
         */
        getStepTextStyle(item) {
            if (!this.computeContainer) {
                this.computeContainer = document.body.querySelector('.steps-compute-container');
            }
            let width = this.getComputedStyle(this.computeContainer, 'offsetWidth', item.name) + 1 || 33;
            return {
                width: width + 'px'
            };
        },
        /**
         * 是否显示向前延展线
         *
         * @param {Object} item 当前步骤对象
         */
        isPrevLineShow(item) {
            return item.rawInx && item.rawInx === this.firstStage;
        },
        /**
         * 是否显示向后延展线
         *
         * @param {Object} item 当前步骤对象
         */
        isBackLineShow(item) {
            return item.lastShown && item.rawInx < this.datas.length - 1;
        },
        /**
         * 是否显示连接线，默认位置在icon后面
         *
         * @param {Object} item 当前步骤对象
         */
        isStepLineShow(item) {
            return !item.lastShown;
        },
        /**
         * 点击向前按钮处理
         *
         */
        prevClickHandler() {
            let max = this.datas.length;
            this.firstStage += this.steps;
            if (this.firstStage < max) {
                this.init();
                this.updateDetailStage();
                this.isInterposeClick = false;
            }
            else {
                this.firstStage -= this.steps;
            }
        },
        /**
         * 点击向后按钮处理
         *
         */
        backClickHandler() {
            this.firstStage -= this.steps;
            if (this.firstStage > -1) {
                this.init();
                this.updateDetailStage();
                this.isInterposeClick = false;
            }
            else {
                this.firstStage += this.steps;
            }
        },
        /**
         * 获取某个元素的属性样式
         *
         * @param {Object} element 要计算的html元素
         * @param {String} attr 属性名字
         * @param {String} text 元素内容
         *
         * @return {Number} 属性值
         */
        getComputedStyle(element, attr, text) {
            let result = 0;
            if (element) {
                element.innerHTML = text;
                result = element[attr];
                if (!result) {
                    result = this.getComputedAttribute(element, attr);
                }
            }
            return result;
        },
        /**
         * 获取某个元素的计算值
         *
         * @param {Object} element 要计算的html元素
         * @param {String} attr 属性名字
         *
         * @return {Number} 属性值
         */
        getComputedAttribute(element, attr) {
            let result = 0;
            if (element.getComputedStyle) {
                // chrome、ff、safari
                result = document.body.getComputedStyle(element, null)[attr];
            }
            else {
                // 兼容ie10+
                result = element.currentStyle[attr];
            }
            return result;
        },
        /**
         * 设置显示面板的箭头style
         *
         * @param {Number} inx 需要指向的阶段，在可视区域集合里的下标
         * @return {Number} style集合
         */
        setStepsBodyNavStyle(inx) {
            if (this.isPanelNavShow) {
                let stepsWrapper = document.body.querySelector('.' + this.saasvPrefixCls + '-wrapper')
                                || document.body.querySelector('.' + this.noahvPrefixCls + '-wrapper');
                let stepsBodyNavs = stepsWrapper ? stepsWrapper.querySelectorAll('.nav') : '';
                if (stepsWrapper && stepsBodyNavs && stepsBodyNavs.length === 2) {
                    let bodyWrapperWidth = stepsWrapper['offsetWidth']
                                        || this.getComputedAttribute(stepsWrapper, 'offsetWidth');
                    if (inx > -1) {
                        let offset = bodyWrapperWidth * 0.9 * 0.155 * inx + bodyWrapperWidth * 0.05;
                        let detailStatus = this.items[inx].status;
                        if (detailStatus !== 'finished' && detailStatus !== 'running') {
                            offset -= 12;
                        }
                        stepsBodyNavs[0].style.left = offset + 'px';
                        stepsBodyNavs[1].style.left = offset + 'px';
                        this.isPanelNavShow = true;
                    }
                }
            }
        },
        /**
         * 更新当前指向的步骤处理逻辑
         *
         *
         */
        updateDetailStage() {
            if (this.panelShow) {
                let activeStageInx = stepsUtils.getActiveStageInx(this.items);
                this.detailStage = activeStageInx > -1 ? activeStageInx : 0;
                this.$emit('on-change', this.items[this.detailStage]);
            }
        },
        /**
         * 文本点击处理逻辑
         *
         *
         * @param {Object} item 步骤项
         */
        stepTextClickHandler(item) {
            this.isInterposeClick = true;
            let stageInx = stepsUtils.getStageInx(this.items, item);
            this.detailStage = stageInx > -1 ? stageInx : 0;
            this.$emit('on-change', item);
            this.$emit('on-click', item);
        },
        /**
         * 根据屏幕变化调整箭头位置
         *
         */
        resizeHandler() {
            // 函数节流处理，优化性能
            stepsUtils.throttle(this.setStepsBodyNavStyle(this.detailStage), 300);
        }
    }
};
</script>

