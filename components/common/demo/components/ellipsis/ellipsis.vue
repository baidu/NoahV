<template>
    <div>
        <ul class="ellipsis-ul">
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，不带复制功能" :copy="false"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，支持复制功能"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，我的 tooltip 向上" placement="top"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，我的 tooltip 向下" placement="bottom"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，我的 tooltip 向左" placement="left"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis
                    content="我是nv-ellipsis，我的文本超长,我是nv-ellipsis，我的文本超长,我是nv-ellipsis，我的文本超长,我是nv-ellipsis，我的文本超长"
                ></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，我限制 tooltips max-width" :max-width="100"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="我是nv-ellipsis，tooltip 跟我不一样" tool-tip="我是tooltip"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="185xxxxxx" tool-tip="我是nv-ellipsis，这是一个电话" content-type="tel"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis content="xxx@baidu.com" tool-tip="我是nv-ellipsis，这是一个邮件" content-type="email"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis :content="{
                'href': 'https://www.baidu.com',
                'target': '_blank,',
                'text': '百度一下，你就知道'
            }"
                            tool-tip="我是nv-ellipsis，这是一个链接"
                            content-type="link"></NvEllipsis>
            </li>
            <li class="ellipsis-li">
                <NvEllipsis :isHTML="true" content="<h1>我是nv-ellipsis，我支持html，这是h1</h1>" tool-tip="<h2>我是nv-ellipsis，我支持html，这是h2</h2>"></NvEllipsis>
            </li>
        </ul>
        <Table :columns="columns" :data="tableData" style="width: 400px"></Table>
    </div>
</template>

<script>
export default {
    name: 'ellipsis',
    data() {
        return {
            tableData: [
                {
                    name: 'a',
                    age: 1,
                    addr: 'xxx'
                },
                {
                    name: 'b',
                    age: 2,
                    addr: 'xxx'
                },
                {
                    name: 'c',
                    age: 3,
                    addr: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                },
                {
                    name: 'd',
                    age: 4,
                    addr: ''
                },
                {
                    name: 'e',
                    age: 5,
                    addr: 'xx'
                }
            ]
        };
    },
    computed: {
        columns() {
            return [
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '地址',
                    render: (h, {row}) => h('NvEllipsis', {
                        props: {
                            content: row.addr
                        }
                    })
                }
            ];
        }
    }
};
</script>

<style lang="less">
    .ellipsis-ul {
        width: 300px;
        margin-left: 400px;
        .ellipsis-li {
            display: block;
            width: 100%;
            line-height: 30px;
        }
    }

</style>
