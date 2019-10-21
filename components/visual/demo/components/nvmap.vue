<template>
    <div class="hello">
        <NvMap title="中国移动网络联通性视图" style="width: 50%;" :url="dataUrl"/>
    </div>
</template>

<script>
import api from '../service/api/index';
export default {
    name: 'widget',
    data() {
        return {
        	dataUrl: '/mock/dataMap'
        };
    }
};
</script>
