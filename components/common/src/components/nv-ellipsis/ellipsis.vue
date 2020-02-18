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
                <a type="copy" :title="t('ellipsis.copy')" v-if="copy" class="copy-btn" ref="copy-btn"
                   :data-clipboard-text="toolTipContent"
                >{{t('ellipsis.copy')}}</a>
            </span>
            <span slot="content" class="nv-ellipsis-content" v-else>{{toolTipContent}}
                <a type="copy" :title="t('ellipsis.copy')" v-if="copy" class="copy-btn" ref="copy-btn"
                   :data-clipboard-text="toolTipContent"
                >{{t('ellipsis.copy')}}</a></span>
        </Tooltip>
    </span>
</template>

<script>
import ClipboardJS from 'clipboard';
import {t} from '../../locale';
import mixin from '../../mixins';

export default {
    mixins: [mixin],
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
            default: () => t('ellipsis.copySuccessText')
        },
        copyErrorText: {
            type: String,
            default: () => t('ellipsis.copyErrorText')
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
            console.warn(this.t('ellipsis.domFindError'), this.$refs['copy-btn']);
        }
    }
};
</script>
