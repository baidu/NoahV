<template>
    <div class="default-link">
        <p class="link-address">
            链接地址
            <Input type="text" class="links" v-model="link" size="small"/>
        </p>
    </div>
</template>

<script>
export default {
    name: 'default-link',
    data() {
        return {};
    },
    methods: {
    },
    computed: {
        link: {
            get() {
                return this.$store.state.dashboard.widgetConfig.link || '';
            },
            set(value) {
                this.$store.commit('UPDATE_CONFIG', {link: value});
            }
        }
    }
};
</script>

<style lang="less">
.default-link {
    margin-top: 20px;
    .link-address {
        font-size: 12px;
        color: #262626;
        .links {
            display: inline-block;
            width: 350px;
            margin-left: 10px;
        }
    }
}
</style>
