<template>
    <div :class="getCls('not-found')">
        <div class="title">{{title}}</div>
        <div class="text">{{tips}}</div>
        <div class="back-to">
            <a :href="href">返回首页</a>
        </div>
    </div>
</template>

<script>
import getClassName from '../utils.js';

export default {
    props: {
        title: {
            type: String,
            default: '404'
        },
        tips: {
            type: String,
            default: '抱歉，找不到路了~'
        },
        href: {
            type: String,
            default: '/'
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
        }
    }
};
</script>

