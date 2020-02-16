<template>
    <div v-html="innerHtml" ref="custombox"></div>
</template>
<script>
import mixin from './mixins';
export default {
    mixins: [mixin],
    props: {

        // get conf's url
        url: {
            type: String,
            required: false
        },

        // get conf's name
        path: {
            type: String,
            required: false
        },

        // get widget's time
        params: {
            type: Object,
            required: false
        },

        // get widget's conf
        conf: {
            type: Object,
            required: false
        },

        // get data's extra params
        extraParams: {
            type: Object,
            required: false
        },

        // get conf's method type
        confMethod: {
            type: String,
            default: 'post',
            required: false
        }
    },
    data() {
        return {
            conf: {}
        };
    },
    computed: {
        innerHtml() {
            return this.conf || '<div class="aligin-center">' + this.t('customBox.noConf') + '</div>';
        }
    },
    created() {
        if (this.path) {
            return;
        }

        let params = Object.assign({}, {
            name: this.path
        }, this.extraParams);

        let dataParams = {
            url: this.url,
            method: this.confMethod
        };
        if (this.confMethod === 'get') {
            dataParams.params = params;
        }
        else {
            dataParams.data = params;
        }

        // get html template from server
        this.$wRequest(dataParams).then(data => {
            if (data.data.success) {
                this.conf = JSON.parse(data.data.data.configure || '{}');
            }
            else {
                this.showError(data.data.message);
            }
        });
    },
    methods: {

        /**
         * show error massage
         */
        showError(str) {
            this.conf = '<div class="aligin-center">' + str + '</div>';
        }
    }
};
</script>
<style lang="less" scoped></style>
