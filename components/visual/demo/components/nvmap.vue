<template>
    <div class="hello">
        <NvMap title="中国移动网络联通性视图" style="width: 50%;" :mapData="mapData" seriesName="指标名称" />
    </div>
</template>

<script>
import api from '../service/api/index';
export default {
    name: 'widget',
    data() {
        return {
        	dataUrl: '/mock/dataMap',
        	mapData: [
	            {name:'北京', value: 1, toolTipData: [
	                {
	                    name: '可用率',
	                    value: 10,
	                    unit: '%'
	                },
	                {
	                    name: '响应时间',
	                    value: 1000,
	                    unit: 'ms'
	                }
	            ]},
	            {name:'河北', value: 0.9},
	        ]
        };
    }
};
</script>
