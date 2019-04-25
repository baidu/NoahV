<template>
    <div class="tag-wrapper">
          <SaTag :data="datas" :type="type" :color="color" :closeable="closeable" :maxNum="max" :width="width" :placeholder="placeholder"></SaTag>
    </div>
</template>

<script>

export default {
    name: 'saTagBorderDemo',
    data() {
        return {
            max: 5,
            width: 900,
            type: 'border',
            color: 'green',
            closeable: true,
            placeholder: '输入文本，点击回车或空格添加标签',
            datas: [
                {
                    name: '101',
                    label: '百度'
                },
                {
                    name: '102',
                    label: '百度App'
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
