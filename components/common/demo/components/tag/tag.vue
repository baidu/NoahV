<template>
    <div class="tag-wrapper">
        <NvTag
            ref="tagDemo"
            :type="type"
            :data="datas"
            :maxNum="max"
            :width="width"
            :color="color"
            :maxLength="length"
            :closeable="closeable"
            :placeholder="placeholder"
            @on-change="changeHandler"
            @on-input="inputHandler"
            @on-focus="focusHandler"
            @on-blur="blurHandler"
        >
        </NvTag>
        <br />
        <nv-button type="primary" @click="getDatas">获取标签</nv-button>
        <nv-button type="primary" @click="setDatas">设置标签</nv-button>
        <nv-button type="primary" @click="addTags">添加标签</nv-button>
        <nv-button type="primary" @click="removeTags">移除特定标签</nv-button>
        <nv-button type="primary" @click="clear">清除标签</nv-button>
    </div>
</template>

<script>

    export default {
        name: 'tagDemo',
        data() {
            return {
                max: 5,
                type: 'default',
                width: 900,
                length: 200,
                color: 'orange',
                closeable: true,
                placeholder: '输入文本，回车或空格添加标签，退格删除标签',
                datas: [
                    {
                        name: '000101',
                        label: '百度'
                    },
                    {
                        name: '000102',
                        label: '百度云'
                    },
                    {
                        name: '000103',
                        label: '运维'
                    },
                    {
                        name: '000104',
                        label: 'noah'
                    }
                ]
            };
        },
        methods: {
            focusHandler: function () {

            },
            blurHandler: function () {

            },
            inputHandler: function (value) {

            },
            changeHandler: function (items) {
            },
            getDatas: function () {
                let tags = this.$refs['tagDemo'].getTags();
                console.log(tags);
            },
            setDatas: function () {
                let tags = [
                    {
                        name: '101',
                        label: '001'
                    },
                    {
                        name: '102',
                        label: '002'
                    },
                    {
                        name: '103',
                        label: '003'
                    },
                    {
                        name: '104',
                        label: '004'
                    }
                ];
                this.$refs['tagDemo'].setTags(tags);
            },
            addTags: function () {
                let tag = {
                    name: 'add001',
                    label: 'add001'
                };
                this.$refs['tagDemo'].addTag(tag);
            },
            removeTags: function () {
                let tag = {
                    name: '103',
                    label: '003'
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
</style>