<template>
    <div class="tag-wrapper">
          <SaTag class="tag-complex-demo-wrapper" :data="datas" :maxNum="max" :type="type" :color="color" :closeable="closeable" :maxLength="length" :width="width" :placeholder="placeholder" @on-change="changeHandler" @on-input="inputHandler" @on-focus="focusHandler" @on-blur="blurHandler" ref="tagDemo"></SaTag>
          <Button type="primary" @click="getDatas">获取标签</Button>
          <Button type="primary" @click="setDatas">设置标签</Button>
          <Button type="primary" @click="addTags">添加标签</Button>
          <Button type="primary" @click="removeTags">移除标签</Button>
          <Button type="primary" @click="clear">清除标签</Button>
    </div>
</template>

<script>

export default {
    name: 'saTagComplexDemo',
    data() {
        return {
            max: 9,
            type: 'default',
            width: 900,
            length: 200,
            color: 'orange',
            closeable: true,
            placeholder: '输入文本，点击回车或空格添加标签',
            datas: [
                {
                    name: '101',
                    label: '百度'
                },
                {
                    name: '102',
                    label: '百度云'
                },
                {
                    name: '103',
                    label: '百度贴吧'
                },
                {
                    name: '104',
                    label: '百度地图'
                },
                {
                    name: '105',
                    label: '百度搜索'
                },
                {
                    name: '106',
                    label: '百度大脑'
                },
                {
                    name: '107',
                    label: '百度无人车'
                }
            ]
        };
    },
    methods: {
        focusHandler: function () {
            console.log('on-focus');
        },
        blurHandler: function () {
            console.log('on-blur');
        },
        inputHandler: function (value) {
            console.log('on-input');
            console.log(value);
        },
        changeHandler: function (items) {
            console.log('on-change');
            console.log(items);
        },
        getDatas: function () {
            let tags = this.$refs['tagDemo'].getTags();
            console.log(tags);
        },
        setDatas: function () {
            let tags = [
                {
                    name: '101',
                    label: '百度云'
                },
                {
                    name: '102',
                    label: '阿里云'
                },
                {
                    name: '103',
                    label: '腾讯云'
                },
                {
                    name: '104',
                    label: '华为云'
                }
            ];
            this.$refs['tagDemo'].setTags(tags);
        },
        addTags: function () {
            let tag = {
                name: '110',
                label: '百度时代'
            };
            this.$refs['tagDemo'].addTag(tag);
        },
        removeTags: function () {
            let tag = {
                name: '103',
                label: '百度贴吧'
            };
            this.$refs['tagDemo'].removeTag(tag);
        },
        clear: function () {
            this.$refs['tagDemo'].clear();
        }
    }
};
</script>
<style lang="less">
    .tag-complex-demo-wrapper {
        margin-bottom: 10px;
    }
</style>
