<template>
    <div :class="getCls('scroll-tab-wrapper')" :ref="mirrorId">
        <!-- <div class="disabled" v-show="disabled"></div> -->
        <div :class="'scrollBox'+mirrorId">
            <i class="noahv-icon noahv-icon-angle-left" @click='preScroll'></i>
            <p
                v-for="(item,idx) in value"
                :class="tabIdx === idx ? 'tabChecked' : ''"
                @click.stop="tabCheck(idx)"
                :key="idx"
            >
                <span @dblclick.stop="changeLabel(idx)">{{item[label]}}</span>
                <i class="noahv-icon noahv-icon-close-small" :class="{disabled:disabled}" @click.stop="tabDelete($event,idx)"></i>
                <input @blur="blur($event,idx)" v-show="inputIdx===idx" :ref="`inputBox${idx}`" class="inputBox" type="text"  :value="item[label]">
            </p>
            <i class="noahv-icon noahv-icon-angle-right" @click='nextScroll'></i>
        </div>
        <span class="addList" :class="{disabled:disabled}" @click="addTab">+</span>
    </div>
</template>

<script>
import getClassName from '../utils.js';
export default {
    data() {
        return {
            tabIdx: 0,
            mirrorId: '',
            scrollBox: '',
            inputIdx: -1
        };
    },
    props: {
        value: {
            type: Array,
            default: []
        },
        label: {
            type: String,
            default: ''
        },
        scrollSpeed: {
            type: String,
            default: 'middle'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        maxLength: {
            type: Number,
            default: -1
        }
    },
    beforeCreate() {
        this.mirrorId = (new Date()).getTime() + '-' + Math.random();
    },
    mounted() {
        this.scrollBox = document.getElementsByClassName('scrollBox' + this.mirrorId)[0];
    },
    methods: {
        speed() {
            return parseInt(this.value.length / (this.scrollSpeed === 'fast' ? 10 : this.scrollSpeed === 'middle' ? 6 : 2), 10);
        },
        blur(event, idx) {
            const tabName = this.value[idx][this.label];
            const obj = this.value.find((item, index) => {
                return item[this.label] === event.currentTarget.value && index !== idx;
            });
            if (!event.currentTarget.value) {
                this.value[idx][this.label] = tabName;
                this.$emit('scrollTabError', '规则名称不能为空');
            }
            else if (obj) {
                this.value[idx][this.label] = tabName;
                this.$emit('scrollTabError', '规则名称重复');
            }
            else {
                this.value[idx][this.label] = event.currentTarget.value;
            }
            this.inputIdx = -1;
        },
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        // 双击支持更改label
        changeLabel(idx) {
            if (this.disabled) {
                return;
            }
            this.inputIdx = idx;
            this.$nextTick(() => {
                this.$refs[`inputBox${idx}`][0].select();
            });
        },
        // 删除当前tab标签页
        tabDelete(event, idx) {
            if (this.disabled) {
                return;
            }
            if (this.value.length <= 1) {
                return;
            }
            this.value.splice(idx, 1);
            this.$emit('deleteTab', idx);
        },
        // 切换tab
        tabCheck(idx) {
            if (this.tabIdx === idx) {
                return;
            }
            this.tabIdx = idx;
            this.$emit('checkTab', idx);
        },
        // 增加tab页
        addTab() {
            if (this.disabled) {
                return;
            }
            if (this.maxLength > 0 && this.value.length >= this.maxLength) {
                this.$emit('scrollTabError', `仅允许配置${this.maxLength}条提取规则，但规则较多时有可能导致采集性能下降`);
                return;
            }
            this.$emit('addTab', this.value.length);
            this.$nextTick(() => {
                this.scrollBox.scrollTo({left: this.scrollBox.scrollWidth - this.scrollBox.offsetWidth, behavior: 'smooth'});
                this.tabCheck(this.value.length - 1);
            });
        },
        // 向前滚动
        preScroll() {
            if (this.scrollBox.scrollLeft - this.scrollBox.scrollWidth / this.speed() < 0) {
                this.scrollBox.scrollTo({left: 0, behavior: 'smooth'});
                return;
            }
            this.scrollBox.scrollTo({left: this.scrollBox.scrollLeft - this.scrollBox.scrollWidth / this.speed(), behavior: 'smooth'});
        },
        // 向后滚动
        nextScroll() {
            if (this.scrollBox.scrollLeft + this.scrollBox.scrollWidth / this.speed() + this.scrollBox.offsetWidth > this.scrollBox.scrollWidth) {
                this.scrollBox.scrollTo({left: this.scrollBox.scrollWidth - this.scrollBox.offsetWidth, behavior: 'smooth'});
                return;
            }
            this.scrollBox.scrollTo({left: this.scrollBox.scrollLeft + this.scrollBox.scrollWidth / this.speed(), behavior: 'smooth'});
        }
    }
};
</script>

<style>

</style>
