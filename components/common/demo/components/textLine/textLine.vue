<template>
  <div class="text-line-wrapper">
    <NvTextLine
      ref="textline"
      :value="value"
      :width="width"
      :height="height"
      :options="cmOptions"
      @on-change="value = $event"
      @on-blur="blur"
      @on-focus="focus"
      @on-ready="ready"
    >
    </NvTextLine>
    <Button type="primary" @click="setDatas">设置数据</Button>
    <Button type="primary" @click="getDatas">获取数据</Button>
    <Button type="primary" @click="getLineCount">获取行数</Button>
  </div>
</template>

<script>

    export default {
        name: 'textLineDemo',
        data() {
            return {
                value: '',
                width: 600,
                height: 300,
                cmOptions: {
                    // 是否启用行号
                    lineNumbers: true,
                    // 是否只读，若设置为false，仍会存在光标。若不需要光标，设置readOnly='nocursor'
                    readOnly: false,
                    // 默认提示文本
                    placeholder: '请输入文本',
                    // 长度过长时，是否换行。如不设置，默认不换行，开启滚动条。
                    lineWrapping: 'wrap'
                }
            };
        },
        methods: {
            /**
             * 暴露给用户的接口，设置文本框内数据
             *
             */
            setDatas: function () {
                this.$refs['textline'].setText('set text');
            },
            /**
             * 暴露给用户的接口，获取文本框内数据
             *
             * @return {String} 返回文本框内的数据
             */
            getDatas: function () {
                //let ref = this.$refs['test'].getText();
                this.$Message.info(this.value.toString());
            },
            /**
             * 暴露给用户的接口，获取文本框内行数
             *
             */
            getLineCount: function () {
                let count = this.$refs['textline'].getLineCount() + '行';
                this.$Message.info(count);
            },
            /**
             * 暴露给用户的接口，监控到失去焦点
             *
             */
            blur: function () {
                console.log('blur watched');
            },
            focus: function () {
                console.log('focus watched');
            },
            ready: function () {
                console.log('ready watched');
            }
        }
    };
</script>
<style lang="less">
</style>