<template>
    <div :class="getCls('scroll-tab-wrapper')" :ref="mirrorId">
        <div :class="'scrollBox'+mirrorId">
            <i class="noahv-icon noahv-icon-angle-left" @click='preScroll'></i>
            <p
                v-for="(item,idx) in value"
                :class="tabIdx === idx ? 'tabChecked' : ''"
                @click.stop="tabCheck(item,idx)"
                @dblclick.stop="changeLabel(idx)"
                :key="idx"
            >
                <span>{{item[label]}}</span>
                <i class="noahv-icon noahv-icon-close-small" @click.stop="tabDelete($event,idx)"></i>
                <input @blur="blur($event,idx)" v-show="inputIdx===idx" :ref="`inputBox${idx}`" class="inputBox" type="text"  :value="item[label]">
            </p>
            <i class="noahv-icon noahv-icon-angle-right" @click='nextScroll'></i>
        </div>
        <span class="addList" @click="addTab">+</span>
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
            this.value[idx][this.label] = event.currentTarget.value;
            this.inputIdx = -1;
        },
        getCls(postfix) {
            return getClassName.getComponentWrapperCls(postfix);
        },
        // 双击支持更改label
        changeLabel(idx) {
            this.inputIdx = idx;
            this.$nextTick(() => {
                this.$refs[`inputBox${idx}`][0].select();
            });
        },
        // 删除当前tab标签页
        tabDelete(event, idx) {
            this.value.splice(idx, 1);
        },
        // 切换tab
        tabCheck(item, idx) {
            this.tabIdx = idx;
            this.$emit('checkTab', item);
        },
        // 增加tab页
        addTab() {
            const obj = {};
            obj[this.label] = `rule${this.value.length + 1}`;
            this.value.push(obj);
            this.$nextTick(() => {
                this.scrollBox.scrollTo({left: this.scrollBox.scrollWidth - this.scrollBox.offsetWidth, behavior: 'smooth'});
                this.tabCheck(this.value[this.value.length - 1], this.value.length - 1);
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
