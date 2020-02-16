<template>
    <div v-show="isShow" class="loading-mask">
        <span>{{loadingText}}</span>
    </div>
</template>
<script>
import {t} from './locale';
export default {
    props: {
        loadingText: {
            type: String,
            default: t('mask.loading')
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

