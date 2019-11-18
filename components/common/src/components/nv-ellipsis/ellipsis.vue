<template>
    <span class="nv-ellipsis">
        <Tooltip :theme="theme"
                 :placement="placement"
                 :max-width="maxWidth"
                 class="nv-ellipsis-tooltip"
                 :transfer="true"
                 @on-popper-show="$emit('on-popper-show')"
                 @on-popper-hide="$emit('on-popper-hide')"
        >
            <a class="nv-ellipsis" v-if="contentType === 'tel'" :href="`tel:${content}`">{{content}}</a>
            <a class="nv-ellipsis" v-else-if="contentType === 'email'" :href="`mailto:${content}`">{{content}}</a>
            <a class="nv-ellipsis" v-else-if="contentType === 'link'" :href="content.href"
               :target="content.target">{{content.text}}</a>
            <template v-else>
                <span class="nv-ellipsis" v-if="isHTML" v-html="content"></span>
                <span class="nv-ellipsis" v-else >{{content}}</span>
            </template>
            <span slot="content" class="nv-ellipsis-content" v-if="isHTML">
                <span v-html="toolTipContent"></span>
                <a type="copy" title="复制" v-if="copy" class="copy-btn" ref="copy-btn"
                   :data-clipboard-text="toolTipContent"
                >复制</a>
            </span>
            <span slot="content" class="nv-ellipsis-content" v-else>{{toolTipContent}}
                <a type="copy" title="复制" v-if="copy" class="copy-btn" ref="copy-btn"
                   :data-clipboard-text="toolTipContent"
                >复制</a></span>
        </Tooltip>
    </span>
</template>

<script>
import ClipboardJS from 'clipboard';

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
        },
        copySuccessText: {
            type: String,
            default: '复制成功'
        },
        copyErrorText: {
            type: String,
            default: '浏览器不支持，请使用最新版Chrome'
        },
        theme: {
            type: String,
            default: 'light'
        },
        isHTML: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        toolTipContent() {
            return this.toolTip || this.content;
        }
    },
    mounted() {
        if (this.$refs['copy-btn']) {
            const clipboard = new ClipboardJS(this.$refs['copy-btn']);
            clipboard.on('success', () => {
                this.$Message.success(this.copySuccessText);
                this.$emit('copy-success');
            });
            clipboard.on('error', () => {
                this.$Message.error(this.copyErrorText);
                this.$emit('copy-error');
            });
        }
        else {
            // eslint-disable-next-line no-console
            console.warn('用于复制的dom元素可能不存在：', this.$refs['copy-btn']);
        }
    }
};
</script>
