[[TOC]]

## 概述

树控件，支持层级结构关系展示、展开收起等交互功能。

<ul>
    <li>支持节点选择功能</li>
    <li>支持多节点选择功能</li>
    <li>支持节点勾选功能</li>
    <li>支持节点拖动功能</li>
    <li>支持节点搜索功能</li>
    <li>支持节点编辑功能</li>
    <li>支持节点异步加载功能</li>
    <li>支持节点添加和删除功能</li>
    <li>支持节点展开的手风琴效果</li>
    <li>支持选择、勾选和展开收起事件监听</li>
</ul>
<br/>
<br/>

## 基础示例

:::demo 基础用法示例
```html
<template>
    <div>
        <NvTree :items="items" :accordion="accordion"></NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeNormalDemo',
    data() {
        const self = this;
        return {
            accordion: true,
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2',
                            children: [
                                {
                                    title: 'node1-2-1',
                                    name: 'node1-2-1'
                                },
                                {
                                    title: 'node1-2-2',
                                    name: 'node1-2-2'
                                }
                            ]
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3',
                            children: [
                                {
                                    title: 'node1-3-1',
                                    name: 'node1-3-1'
                                },
                                {
                                    title: 'node1-3-2',
                                    name: 'node1-3-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3'
                }
            ]
        };
    }
};
</script>

<style lang="less">
</style>

```
:::

:::demo Checkbox用法示例
```html
<template>
    <div>
        <NvTree :items="items" :search="search" :checkbox="checkbox" @on-check-change="onCheckChangeHandler"></NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeCheckedDemo',
    data() {
        const self = this;
        return {
            search: true,
            checkbox: true,
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    icon: 'star',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2',
                            icon: 'star'
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3',
                            icon: 'star'
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    icon: 'star',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1',
                            icon: 'star'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2',
                            icon: 'star'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3',
                    icon: 'star'
                }
            ]
        };
    },
    methods: {
        onCheckChangeHandler: function () {
            this.$Message.info('check changed');
        }
    }
};
</script>

<style lang="less">
</style>

```
:::

:::demo 拖动用法示例
```html
<template>
    <div>
        <NvTree :items="items" :draggable="draggable"></NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeDragDemo',
    data() {
        const self = this;
        return {
            draggable: true,
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2'
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3'
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3'
                }
            ]
        };
    }
};
</script>

<style lang="less">
</style>

```
:::

:::demo 编辑用法示例
```html
<template>
    <div>
        <NvTree :items="items" :editMode="editMode" :appendIcon="appendIcon" :removeIcon="removeIcon" :editIcon="editIcon">
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeEditDemo',
    data() {
        const self = this;
        return {
            editMode: true,
            appendIcon: 'plus-small-square-o',
            removeIcon: 'minus-small-square-o',
            editIcon: 'edit-o',
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2'
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3'
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3'
                }
            ]
        };
    }
};
</script>

<style lang="less">
</style>

```
:::

:::demo 监听事件示例
```html
<template>
    <div>
        <NvTree :items="items" @on-select-change="onSelectChangeHandler" @on-expand-change="onExpandChangeHandler">
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeEventsDemo',
    data() {
        const self = this;
        return {
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2'
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3'
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3'
                }
            ]
        };
    },
    methods: {
        onSelectChangeHandler: function () {
            this.$Message.info('select changed');
        },
        onExpandChangeHandler: function () {
            this.$Message.info('expand changed');
        }
    }
};
</script>

<style lang="less">
</style>

```
:::

<br/>
<br/>

## 组合示例

构建一个复杂的树组件示例

:::demo 组合示例
```html
<template>
    <div>
        <NvTree
                :items="items"
                :search="search"
                :accordion="accordion"
                :draggable="draggable"
                :editMode="editMode"
                :checkbox="checkbox"
                :multiple="multiple"
                :appendIcon="appendIcon"
                :removeIcon="removeIcon"
                :editIcon="editIcon"
                :lazyLoad="lazyLoad"
                :loadData="loadData"
                @on-check-change="onCheckChange"
                @on-select-change="onSelectChange"
                @on-expand-change="onExpandChange"
            >
        </NvTree>
    </div>
</template>

<script>
export default {
    name: 'nvTreeComplexDemo',
    data() {
        return {
            search: true,
            accordion: false,
            draggable: false,
            editMode: true,
            checkbox: true,
            multiple: false,
            lazyLoad: false,
            appendIcon: 'plus-small-square-o',
            removeIcon: 'minus-small-square-o',
            editIcon: 'edit-o',
            items: [
                {
                    title: 'node1',
                    name: 'node1',
                    icon: 'star',
                    children: [
                        {
                            title: 'node1-2',
                            name: 'node1-2',
                            icon: 'star',
                            children: [
                                {
                                    title: 'node1-2-1',
                                    name: 'node1-2-1',
                                    icon: 'star',
                                    children: [
                                        {
                                            title: 'node1-2-1-1',
                                            name: 'node1-2-1-1',
                                            icon: 'star',
                                            children: [
                                                {
                                                    title: 'node1-2-1-1-1',
                                                    name: 'node1-2-1-1-1',
                                                    icon: 'star'
                                                }
                                            ]
                                        },
                                        {
                                            title: 'node1-2-1-2',
                                            name: 'node1-2-1-2',
                                            icon: 'star'
                                        }
                                    ]
                                },
                                {
                                    title: 'node1-2-2',
                                    name: 'node1-2-2',
                                    icon: 'star'
                                }
                            ]
                        },
                        {
                            title: 'node1-3',
                            name: 'node1-3',
                            icon: 'star',
                            children: [
                                {
                                    title: 'node1-3-1',
                                    name: 'node1-3-1',
                                    icon: 'star'
                                },
                                {
                                    title: 'node1-3-2',
                                    name: 'node1-3-2',
                                    icon: 'star'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'node2',
                    name: 'node2',
                    icon: 'star',
                    children: [
                        {
                            title: 'node2-1',
                            name: 'node2-1',
                            icon: 'star'
                        },
                        {
                            title: 'node2-2',
                            name: 'node2-2',
                            icon: 'star'
                        }
                    ]

                },
                {
                    title: 'node3',
                    name: 'node3',
                    icon: 'star'
                }
            ]
        };
    },
    methods: {
        onSelectChange(item, items) {
            //console.log('on-select-change watched');
        },
        onCheckChange(item, items) {
            //console.log('on-check-change watched');
        },
        onExpandChange(item) {
            //console.log('on-expand-change watched');
        },
        loadData(item, callback) {
            // setTimeout(() => {
            //     const data = [
            //         {
            //             title: 'children1',
            //             children: []
            //         },
            //         {
            //             title: 'children2',
            //             children: []
            //         }
            //     ];
            //     callback(data);
            // }, 1000);
        }
    }
};
</script>

<style lang="less">
</style>

```
:::


## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| items      | 树结构节点数据，每一项item的可配置字段见下方说明     | Array   | -           |
| search     | 是否开启搜索功能                         | Boolean           | false       |
| accordion  | 是否开启手风琴效果                       | Boolean           | false       |
| draggable  | 是否支持拖动功能                         | Boolean           | false       |
| editMode   | 是否支持编辑功能                         | Boolean           | false       |
| checkbox   | 是否开启勾选框                           | Boolean           | false       |
| multiple   | 是否支持多项选择（非勾选）               | Boolean           | false       |
| lazyLoad   | 是否启用异步加载功能                     | Boolean           | false       |
| loadData   | 异步加载数据接口，当lazyLoad为true时有效 | Function          | -           |
| appendIcon | 添加节点按钮，支持nv-icon，优先级高于appendLabel。当editMode为true时有效  | String   | -           |
| appendLabel| 若使用文本作为添加按钮，文本的内容。当editable为true时有效     | String            | -           |
| removeIcon | 移除节点按钮，支持nv-icon，优先级高于removeLabel。当editMode为true时有效 | String    | -           |
| removeLabel| 若使用文本作为移除按钮，文本的内容。当editable为true时有效     | String            | -           |
| editIcon   | 编辑节点按钮，支持nv-icon，优先级高于editLabel。当editMode为true时有效     | String  | -           |
| editLabel  | 若使用文本作为编辑按钮，文本的内容。当editable为true时有效     | String            | -           |



### item

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| title      | 节点名称                                 | String            | -           |
| name       | 节点唯一标识，全局唯一，必填项           | String            | -           |
| icon       | 当前节点的图标                         | String            | -           |
| selected   | 是否选中（非勾选）                       | Boolean           | false       |
| disabled   | 是否禁止勾选和选择                       | Boolean           | false       |
| disabledCheckbox| 是否禁止勾选功能                    | Boolean           | false       |
| checked    | 是否被勾选                               | Boolean           | false       |
| partChecked| 是否处于半勾选状态                        | Boolean           | false       |
| spread     | 是否展开                                 | Boolean           | false       |
| lazyable   | 该节点是否使用懒加载                     | Boolean             | false       |
| appendIcon | 同data中的appendIcon，优先级更高         | String            | -           |
| appendLabel| 同data中的appendLabel，优先级更高        | String            | -           |
| removeIcon | 同data中的removeIcon，优先级更高         | String            | -           |
| removeLabel| 同data中的appendIcon，优先级更高         | String            | -           |
| editIcon   | 同data中的removeLabel，优先级更高        | String            | -           |
| editLabel  | 同data中的editLabel，优先级更高          | String            | -           |
| children   | 子节点的数据，见示例                     | Array             | []          |


### events

| 名称              | 说明                                     | 参数         |        返回值      |
| ----------------- | -----------------------------------------| ------------ |------------------- |
| on-check-change   | 监听勾选变化，使用方法详见示例           | item-当前勾选的节点，items-所有已勾选的节点数组        | 无  |
| on-select-change  | 监听选择变化，使用方法详见示例           | item-当前选择的节点，items-所有处于选择状态的节点数组  | 无  |
| on-expand-change  | 监听展开变化，使用方法详见示例           | item-当前展开收起操作的节点                            | 无  |


### methods

| 名称               | 说明                                     | 参数         |        返回值        |
| ------------------ | -----------------------------------------| ------------ |--------------------- |
| getCheckedNodes    | 获取被勾选的节点集合                     | 无           | 返回被勾选的节点集合 |
| getSelectedNodes   | 获取被选中的节点集合                     | 无           | 返回被选中的节点集合 |
