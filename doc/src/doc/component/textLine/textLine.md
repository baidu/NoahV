[[TOC]]

## 概述

带有行号的文本框，支持v-model双向数据绑定

<br/>
<br/>

## 基础示例

:::demo 基础用法示例
```html
<template>
    <NvTextLine :width="width" :height="height" :options="options"></NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            options: {
                placeholder: '请输入文本内容',
                mode: 'text/plain'
            }
        };
    }
};
</script>
<style lang="less">
     .CodeMirror .CodeMirror-code pre {
        margin: 0;
     }
</style>

```
:::

:::demo 只读用法示例
```html
<template>
    <NvTextLine :width="width" :height="height" :value="value" :options="options"></NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            value: '只读文本框',
            options: {
                // 设置为'nocursor'时，无光标显示
                // 设置为true时，无法编辑，但有光标显示
                readOnly: 'nocursor',
                lineNumbers: true,
                mode: 'text/plain'
            }
        };
    }
};
</script>
<style lang="less">
     .CodeMirror .CodeMirror-code pre {
        margin: 0;
     }
</style>

```
:::

:::demo 方法使用示例
```html
<template>
    <div class="nv-text-line-set-get-wrapper">
        <div class="btn-wrapper">
            <Button type="primary" @click="setText">设置数据</Button>
            <Button type="primary" @click="getText">获取数据</Button>
            <Button type="primary" @click="getLineCount">获取行数</Button>
        </div>
        <NvTextLine :width="width" :height="height" :options="options" ref="nvTextLineDemo"></NvTextLine>
    </div>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            options: {
                lineNumbers: true,
                mode: 'text/plain'
            }
        };
    },
    methods: {
        setText: function () {
            this.$refs['nvTextLineDemo'].setText('set data for this textarea');
        },
        getText: function () {
            let text = this.$refs['nvTextLineDemo'].getText();
            this.$Message.info(text);
        },
        getLineCount: function () {
            let count = this.$refs['nvTextLineDemo'].getLineCount();
            this.$Message.info(count + '行');
        }
    }
};
</script>
<style lang="less" >
    .nv-text-line-set-get-wrapper {
        .btn-wrapper {
            margin: 30px 0 15px 0;
        }
    }
    .CodeMirror .CodeMirror-code pre {
        margin: 0;
    }
</style>


```
:::

:::demo 语法高亮示例
```html
<template>
    <NvTextLine :width="width" :height="height" :value="value" :options="options"></NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            value: 'var now = new Date();',
            options: {
                lineNumbers: true,
                mode: 'text/javascript'

            }
        };
    }
};
</script>
<style lang="less">
    .CodeMirror .CodeMirror-code pre {
        margin: 0;
    }
</style>

```
:::

:::demo 皮肤选择示例
```html
<template>
    <NvTextLine :width="width" :height="height" :options="options"></NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            options: {
                lineNumbers: true,
                theme: 'solarized light',
                mode: 'text/plain'
            }
        };
    }
};
</script>
<style lang="less">
    .CodeMirror .CodeMirror-code pre {
        margin: 0;
    }
</style>

```
:::

<br/>
<br/>

## 组合示例

构建一个复杂的行号框

:::demo 组合用法示例
```html
<template>
    <NvTextLine
    :width="width"
    :height="height"
    :value="value"
    :options="options"
    @on-change="onChangeHandler">
    </NvTextLine>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            width: 600,
            height: 200,
            value: `<!DOCTYPE html>
<html>
<body>
<h1>This is a complex nv-textLine demo<\/h1>
<script>
<\/script>
    document.write('replace body content');
<\/body>
<\/html>`,
            options: {
                lineNumbers: true,
                lineWrapping: true,
                styleActiveLine: true,
                mode: 'text/html',
                theme: 'monokai'
            }
        };
    },
    methods: {
        onChangeHandler: function (val) {
            this.$Message.info('value changed');
        }
    }
};
</script>

<style lang="less">
    .CodeMirror .CodeMirror-code pre {
        margin: 0;
    }
</style>

```
:::

## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| value      | 文本框的内容，配合on-change事件，可以实现v-model双向绑定   | String    | -         |
| height     | 设置文本框的高度                                        | Number    | 200         |
| width      | 设置文本框的宽度                                        | Number    | 300         |
| options    | 其他配置项                                             | Object    | 请见options配置说明  |


### Options
| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | ----------------------------------------| --------------    | ----------- |
| placeholder      | 默认文本                                               | String            | -  |
| lineNumbers      | 是否开启行号功能                                         | Boolean          | true   |
| readOnly         | 是否只读，可选值：true/false/'nocursor'                  | Boolean/String    | false |
| lineWrapping     | 当单行文本过长时，是否自动换行。若不换行，则自动添加滚动条。   | Boolean           | true  |
| styleActiveLine  | 当前行是否显示激活状态                                    | Boolean           | true  |
| mode             | 配置文本框显示模式，若配置为‘text/plain’时，显示为一个普通的文本框。可支持多种语法高亮，详见下方说明。          | String          | -  |
| theme            | 配置文本框的皮肤风格，若不配置时，显示为一个普通文本框的默认样式。详见下方说明。                                | String           | -  |


### mode
| 取值                | 说明                                         |
| ------------------- | ------------------------------------------- |
| text/plain          | 默认文本框，无语法高亮                         |
| text/x-vue          | 支持vue文本语法高亮                           |
| text/javascript     | 支持javascript文本语法高亮                    |
| text/css            | 支持css文本语法高亮                           |
| text/html           | 支持html文本语法高亮                          |
| text/yaml           | 支持yaml文本语法高亮                          |
| text/application/x-httpd-php     | 支持php文本语法高亮              |
| text/x-python       | 支持python文本语法高亮                        |
| text/x-go           | 支持go文本语法高亮                            |
| text/x-mysql        | 支持mysql文本语法高亮                         |
| text/x-markdown     | 支持markdown文本语法高亮                      |


### theme
| 取值                | 说明                                         |
| ------------------- | ------------------------------------------- |
| base16-dark          | 支持base16-dark风格                         |
| monokai              | 支持monokai风格                             |
| paraiso-light        | 支持paraiso-light风格                       |
| ambiance             | 支持ambiance风格                            |
| cobalt               | 支持cobalt风格                              |
| base16-light         | 支持base16-light风格                        |
| mbo                  | 支持mbo风格                                 |
| solarized light      | 支持solarized light风格                     |
| lesser-dark          | 支持lesser-dark风格                         |


### methods

| 名称       | 说明                                     | 参数        |
| ---------- | --------------------------------------- | ------------ |
| setText    | 设置文本框内容，详见示例                 | value         |
| getText    | 获取文本框内容，详见示例                 | 无           |
| getLineCount| 获取文本框行数，详见示例                | 无           |


### events
| 名称        | 说明                                   | 参数             |
| ---------- | ---------------------------------------| --------------  |
| on-ready   | 组件完成初始化后触发                      |  组件实例对象     |
| on-change  | 监听文本变化                             |  变化后的文本值    |
| on-focus   | 文本框获得焦点后触发                      |  组件实例对象      |
| on-blur    | 文本框失去焦点后触发                      |  组件实例对象       |
