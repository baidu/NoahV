<template>
    <div class="sa-code">
        <div class="btn" @click="lookMore()">{{tip}}</div>
        <div class="btn" @click="copy()" v-show="isActive">{{copyTip}}</div>
        <transition name="slide">
            <pre v-show="isActive">
                <code class="javascript">{{content}}</code>
            </pre>
        </transition>

    </div>
</template>
<script>
import hljs from 'highlight.js';
import clipboard from 'clipboard-polyfill';
hljs.highlightCode = () => {
    //自定义highlightCode方法，将只执行一次的逻辑去掉
    let blocks = document.querySelectorAll('pre code');
    [].forEach.call(blocks, hljs.highlightBlock);
};
export default {
    props: {
        content: String,
        title: String,
        closeTitle: String,
        copyTitle: String
    },
    mounted(){
        hljs.highlightCode();
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
        },
        copy() {
            clipboard.writeText(this.content).then(() => {
                this.$Message.success('复制成功');
            });
        }
    }
};
</script>
<style lang="less">
.sa-code {
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
        margin-top: -10px;
    }
    .slide-enter-active {
        transition: all .5s;
    }
    .slide-enter, .slide-leave-to {
        opacity: 0;
    }
}
</style>
