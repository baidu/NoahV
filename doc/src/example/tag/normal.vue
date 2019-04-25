<template>
    <div class="tag-wrapper">
          <SaTag :data="datas" :maxNum="max" :width="width" :placeholder="placeholder"></SaTag>
    </div>
</template>

<script>

export default {
    name: 'saTagNormalDemo',
    data() {
        return {
            max: 5,
            width: 900,
            placeholder: '输入文本，点击回车或空格添加标签',
            datas: [
                {
                    name: '101',
                    label: '百度'
                },
                {
                    name: '102',
                    label: '百度云'
                }
            ]
        };
    },
    methods: {

    }
};
</script>
<style lang="less">
</style>
