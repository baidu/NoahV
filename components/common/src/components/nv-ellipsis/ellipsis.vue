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
        }
    }
    .nv-ellipsis-content {
        overflow: hidden;
        font-weight: bold;
        word-break: break-all;
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
    .ivu-tooltip-popper {
        .ivu-tooltip-content {
            .ivu-tooltip-inner {
                background-color: #fff;
                color: #515a6e;
            }
        }
    }
    .ivu-tooltip-popper[x-placement^=right] {
        .ivu-tooltip-content {
            .ivu-tooltip-arrow {
                left: 1px;
                border-color: transparent;
                border-right-color: rgba(217, 217, 217, 0.5);
                border-width: 7px;
                border-left-width: 0;
                &:after {
                    display: block;
                    position: absolute;
                    left: 1px;
                    bottom: -7px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    content: ' ';
                    border-width: 7px;
                    border-left-width: 0;
                    border-color: transparent;
                    border-right-color: #fff;
                }
            }
        }
    }
    .ivu-tooltip-popper[x-placement^=top] {
        .ivu-tooltip-content {
            .ivu-tooltip-arrow {
                bottom: 1px;
                border-color: transparent;
                border-top-color: rgba(217, 217, 217, 0.5);
                border-width: 7px;
                border-bottom-width: 0;
                &:after {
                    display: block;
                    position: absolute;
                    left: -7px;
                    bottom: 1px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    content: ' ';
                    border-width: 7px;
                    border-bottom-width: 0;
                    border-color: transparent;
                    border-top-color: #fff;
                }
            }
        }
    }
    .ivu-tooltip-popper[x-placement^=bottom] {
        .ivu-tooltip-content {
            .ivu-tooltip-arrow {
                top: 1px;
                border-color: transparent;
                border-bottom-color: rgba(217, 217, 217, 0.5);
                border-width: 7px;
                border-top-width: 0;
                &:after {
                    display: block;
                    position: absolute;
                    top: 1px;
                    left: -7px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    content: ' ';
                    border-width: 7px;
                    border-top-width: 0;
                    border-color: transparent;
                    border-bottom-color: #fff;
                }
            }
        }
    }
    .ivu-tooltip-popper[x-placement^=left] {
        .ivu-tooltip-content {
            .ivu-tooltip-arrow {
                right: 1px;
                border-color: transparent;
                border-left-color: rgba(217, 217, 217, 0.5);
                border-width: 7px;
                border-right-width: 0;
                &:after {
                    display: block;
                    position: absolute;
                    right: 1px;
                    bottom: -7px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    content: ' ';
                    border-width: 7px;
                    border-right-width: 0;
                    border-color: transparent;
                    border-left-color: #fff;
                }
            }
        }
    }
</style>
