<template>
    <div class="nv-demo" ref="scrollContainer">
        <Card :dis-hover="true">
            <slot name="title" slot="title"></slot>
            <slot name="source"></slot>
            <div class="nv-code">
                <div class="btn-group-box">
                    <div class="btn-group" :class="{active: isActive}" ref="actionBtn">
                        <div class="btn" @click="lookMore()">{{tip}}</div>
                        <div class="btn" @click="copy()">{{copyTip}}</div>
                    </div>
                </div>
                <transition name="slide" v-show="isActive">
                    <div v-show="isActive" ref="code">
                        <slot name="code"></slot>
                    </div>
                </transition>

            </div>
        </Card>
    </div>

</template>
<script>
import hljs from 'highlight.js';
import clipboard from 'clipboard-polyfill';
function unescapeHtml(str) {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
export default {
    props: {
        title: String,
        closeTitle: String,
        copyTitle: String
    },
    mounted(){
        let blocks = this.$refs.code ? this.$refs.code.firstChild.firstChild : null;
        this.content = unescapeHtml(blocks.innerHTML);
        hljs.highlightBlock(blocks);
        // [].forEach.call(blocks, hljs.highlightBlock);
        this.scrollEle = document.querySelector('.noahv-layout');
        this.width = this.$refs.actionBtn.offsetWidth;
    },
    data() {
        this.looktip = this.title ? this.title : '查看示例代码';
        this.copyTip = this.copyTitle ? this.copyTitle : '复制示例代码';
        return {
            isActive: false,
            closeTip: this.closeTitle ? this.closeTitle : '收起示例代码',
            tip: this.looktip
        };
    },
    methods: {
        lookMore() {
            this.isActive = !this.isActive;
            this.tip = this.isActive ? this.closeTip : this.looktip;
            if (this.isActive) {
                this.offsetTop = this.$refs.scrollContainer.offsetTop + this.$refs.actionBtn.offsetTop;
                this.scrollEle.addEventListener('scroll', this.handleFix, false);
                this.scrollEle.addEventListener('resize', this.handleFix, false);
                this.$nextTick(() => {
                    this.codeHeight = this.$refs.code.offsetHeight;
                });
            }
            else {
                this.scrollEle.removeEventListener('scroll', this.handleFix, false);
                this.scrollEle.removeEventListener('resize', this.handleFix, false);
                this.resetScroll();
            }
        },
        copy() {
            clipboard.writeText(this.content).then(() => {
                this.$Message.success('复制成功');
            });
        },
        handleFix(e) {
            // 当前滚动距离
            let scrollTop = e.target.scrollTop;
            // 是否需要滚动，目标按钮即将离开可视区域
            let needFixed = (this.offsetTop + 48) <= scrollTop;
            // 是否已经超出需要滚动的区域
            let overFixedArea = scrollTop > this.codeHeight + this.offsetTop + 55;
            // console.log(overFixedArea);
            // console.log('offsetTop', this.offsetTop);
            // console.log('newOffsetTop', this.$refs.actionBtn.offsetTop)
            // console.log('scrollTop', scrollTop);
            // console.log('codeHeight', this.codeHeight);
            if (!this.fixed && overFixedArea) {
                return;
            }
            if (!this.fixed && needFixed && !overFixedArea) {
                // 如果在非活动期间变化了
                let newOffsetTop = this.$refs.scrollContainer.offsetTop
                    + this.$refs.actionBtn.offsetTop;
                if (this.offsetTop !== newOffsetTop) {
                    this.offsetTop = newOffsetTop;
                    return;
                }
                let width = this.$refs.actionBtn.offsetWidth;
                this.$refs.actionBtn.style.cssText = `
                    width: ${this.width}px;
                    top: 50px;
                    position: fixed;
                `;
                this.fixed = true;
            }
            else if (this.fixed && (!needFixed || overFixedArea)) {
                this.resetStyle();
                this.offsetTop = this.$refs.scrollContainer.offsetTop + this.$refs.actionBtn.offsetTop;
                this.fixed = false;
            }
        },
        resetStyle() {
            this.$refs.actionBtn.style.cssText = ``;
        },
        resetScroll() {
            this.resetStyle();
            this.scrollEle.scrollTop = (this.scrollEle.scrollTop < this.offsetTop - 70)
                ? this.scrollEle.scrollTop
                : this.offsetTop - 70;
        }
    },
    beforeDestroy() {
        this.scrollEle.removeEventListener('scroll', this.handleFix, false);
        this.scrollEle.removeEventListener('resize', this.handleFix, false);
    }
};
</script>
<style lang="less">
.nv-demo {
    margin: 20px 0;
    .btn-group-box {
        height: 60px;
    }
    .btn-group {
        padding-top: 20px;
        margin: 0 -16px 0 -16px;
        padding-left: 16px;
        // transition: all .1s ease;
        padding-bottom: 10px;
        background: #fff;
        &.active {
            border-bottom: 1px dashed #ccc;
            // padding-bottom: 10px;
        }
    }
    .btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 2px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        margin-right: 20px;
        display: inline-block;
    }
    pre {
        margin-top: 10px;
    }
    .slide-enter-active {
        transition: all .5s;
    }
    .slide-enter, .slide-leave-to {
        opacity: 0;
    }
}
</style>
