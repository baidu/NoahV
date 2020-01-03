<template>
    <div>
        <Button type="ghost" v-on:click="changeTime" class="test" id="test">Click Me Change Time</Button>
        <div class="common-box">
            <NvMDPie
                path="NvMDPie"
                :params="params"/>
        </div>
    </div>
</template>
<script>
import api from '../service/api/index';
export default {
    name: 'pie',
    data () {
        const params = {
        };
        return {
            confUrl: api.billboard.conf,
            dataUrl: api.billboard.data,
            params: params,
            url: '/mock/circle',
            dataUrl: '/mock/circleData'
        };
    },
    methods: {
        changeTime() {
            this.params = {
                start: '2017-08-24 15:45:00',
                end: '2017-08-24 17:51:00'
            };
        }
    }
};
</script>
<style lang="less" scoped>
    .change-time-btn {
        margin: 10px 0;
    }
    .common-box {
        margin: 10px 0;
    }
</style>
