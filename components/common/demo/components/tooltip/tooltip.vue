<template>
    <div class="tooltip-demo-wrapper">
        <div class="ele">
            <h4>非slot形式</h4>
            <nv-tooltip
                :content="content"
                :placement="placement"
                :disabled="disabled"
            >
                {{mainText}}
            </nv-tooltip>
        </div>
        <div class="ele">
            <h4>slot形式</h4>
            <nv-tooltip
                :content="content"
                placement="right-end"
                :disabled="false"
            >
                <nv-button slot>{{mainText}}</nv-button>
                <div slot="content">{{content}}</div>
            </nv-tooltip>
        </div>
        <div class="ele">
            <h4>slot形式（禁用）</h4>
            <nv-tooltip
                :content="content"
                placement="right-end"
                :disabled="true"
            >
                <nv-button slot>{{mainText}}</nv-button>
                <div slot="content">{{content}}</div>
            </nv-tooltip>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tooltipDemo',
    data() {
        return {
            mainText: '我是tooltip的主体',
            content: '我是tooltip的content',
            placement: 'top',
            disabled: false
        }
    }
};
</script>

<style lang="less">
</style>