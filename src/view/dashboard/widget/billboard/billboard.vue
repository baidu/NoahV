<template>
    <div class="billboard-config">
        <baseConfig :itemlist="itemList">
            <div slot="datasource" class="billboard-data">
                <defaultDatasource />
            </div>
            <div slot="time">
                <defaultTime />
            </div>
            <div slot="link">
                <defaultLink />
            </div>
        </baseConfig>
    </div>
</template>

<script>
import baseConfig from '../configuration';
import defaultDatasource from '../common/defaultDatasource';
import defaultLink from '../common/defaultLink';
import defaultTime from '../common/defaultTime';
export default {
    name: 'billboard-config',
    components: {
        baseConfig,
        defaultDatasource,
        defaultLink,
        defaultTime
    },
    props: {
        orderStatus: Boolean,
        product: String
    },
    data() {
        return {
            itemList: [
                {
                    name: '数据源配置',
                    slot: 'datasource'
                },
                {
                    name: '时间配置',
                    slot: 'time'
                },
                {
                    name: '链接配置',
                    slot: 'link'
                }
            ]
        };
    },
    methods: {
    },
    watch: {
    }
};
</script>

<style lang="less">
@import '../../assets/css/style.less';
.billboard-config {
}
</style>
