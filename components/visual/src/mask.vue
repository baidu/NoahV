<template>
    <div v-show="isShow" class="loading-mask">
        <span>{{loadingText}}</span>
    </div>
</template>
<script>
export default {
    props: {
        loadingText: {
            type: String,
            default: '加载中...'
        }
    },
    data() {
        return {
            isShow: true
        };
    },
    methods: {
        hide() {
            this.isShow = false;
        },
        show() {
            this.isShow = true;
        }
    }
};
</script>

