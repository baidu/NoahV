<template>
    <span class="nv-ellipsis">
        <Tooltip theme="light"
                 :placement="placement"
                 :max-width="maxWidth"
                 class="nv-ellipsis-tooltip"
                 :transfer="true">
            <a class="nv-ellipsis" v-if="contentType === 'tel'" :href="`tel:${content}`">{{content}}</a>
            <a class="nv-ellipsis" v-else-if="contentType === 'email'" :href="`mailto:${content}`">{{content}}</a>
            <a class="nv-ellipsis" v-else-if="contentType === 'link'" :href="content.href"
               :target="content.target">{{content.text}}</a>
            <span class="nv-ellipsis" v-else>{{content}}</span>
            <span slot="content" class="nv-ellipsis-content">{{toolTipContent}}
                <a type="copy" title="复制" v-if="copy"
                   v-clipboard:copy="toolTipContent"
                   v-clipboard:success="() => $Message.success('复制成功')"
                   v-clipboard:error="() => $Message.error('浏览器不支持，请使用最新版Chrome')"
                >复制</a>
            </span>
        </Tooltip>
    </span>
</template>

<script>
export default {
    name: 'NvEllipsis',
    props: {
        content: [String, Object, Number],
        contentType: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'right'
        },
        maxWidth: {
            type: Number,
            default: 300
        },
        toolTip: String,
        copy: {
            type: Boolean,
            default: () => true
        }
    },
    computed: {
        toolTipContent() {
            return this.toolTip || this.content;
        }
    }
};
</script>

<style lang="less">
    .nv-ellipsis {
        display: inline-block;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: top;

        .ivu-tooltip {
            display: inline-block;
            width: inherit;
            max-width: 100%;

            .ivu-tooltip-rel {
                display: inline-block;
                width: inherit;
                max-width: 100%;
            }

            .ivu-tooltip-inner {
                width: 100%;
                white-space: normal;
            }
        }
    }
    .nv-ellipsis-content {
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        word-break: normal;
        white-space: normal;

        a {
            display: block;
            color: #3a62ca;
            cursor: pointer;

            &:hover {
                color: #2d8cf0;
            }
        }
    }
</style>
