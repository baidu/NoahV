<template>
    <NvDutyTable :name-list="nameList" :style="{fontSize: '12px'}"></NvDutyTable>
</template>

<script>
export default {
    name: 'nvDutyTableNormalDemo',
    data() {
        return {
            nameList: [
                [{name: '东皇', id: 'donghuang'}, {name: '公孙离', id: 'gongsunli'}],
                [{name: '李白', id: 'libai'}, {name: '陈独秀', id: 'chenduxiu'}, {name: '孙尚香', id: 'sunshangxiang'}],
                [{name: '伽罗', id: 'jialuo'}, {name: '孙悟空', id: 'sunwukong'}],
                []
            ]
        };
    }
};
</script>
