<template>
    <div>
        <Button type="ghost" v-on:click="changeTime">Click Me Change Time</Button>
        <div class="common-box">
            <NvMDCircle :url="url" :dataUrl="dataUrl" :params="params"/>
        </div>
        <div class="common-box">
            <NvMDBillboard :url="billboardUrl" :dataUrl="billboardDataUrl" :params="params" />
        </div>
        <div class="common-box">
            <NvMDTrend :url="trendUrl" :dataUrl="trendDataUrl" :params="params" :extraUrls="extraUrls" />
        </div>
        <div class="common-box">
            <NvMDTrend :url="trendUrl" :dataUrl="trendDataUrl" :params="params" :extraUrls="extraUrls" />
        </div>
        <div class="common-box">
            <NvMDPie :url="pieUrl" :dataUrl="pieDataUrl" :params="params"/>
        </div>
        <div class="common-box">
            <NvMDColumn :url="columUrl" :dataUrl="columnDataUrl" :params="params"/>
        </div>
        <div class="common-box">
            <NvMDReport :url="reportUrl" :dataUrl="reportDataUrl" :params="params"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'circle',
    data () {
        const params = {
            start: '2017-08-24 15:41:00',
            end: '2017-08-24 17:51:00'
        };
        return {
            params: params,
            url: '/mock/circle',
            dataUrl: '/mock/circleData',
            billboardUrl: '/mock/billboard',
            billboardDataUrl: '/mock/dataBillboard',
            trendUrl: '/mock/mdtrend',
            trendDataUrl: '/mock/dataTrend',
            extraUrls: {
                warningEventsUrl: '/mock/trendWarning',
                trendPointsUrl: 'mock/trendPoints',
                customEventsUrl: 'mock/customEventsUrl'
            },
            pieUrl: '/mock/mdpie',
            pieDataUrl: '/mock/pieData',
            columUrl: '/api/mdcolumn',
            columnDataUrl: '/mock/dataMdColumn',
            reportUrl: '/mock/mdreport',
            reportDataUrl: '/mock/dataReport'
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
