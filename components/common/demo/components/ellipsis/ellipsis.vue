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
                    name: 'dddddddddddddddddddddddddddddddddddddd',
                    age: 3,
                    addr: ''
                },
                {
                    name: 'e',
                    age: 33333333333333333333333333333333333333333,
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
                    key: 'name',
                    render: (h, {row}) => h('NvEllipsis', {
                        props: {
                            content: row.name
                        }
                    })
                },
                {
                    title: '年龄',
                    render: (h, {row}) => h('NvEllipsis', {
                        props: {
                            content: row.age
                        }
                    })
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
    .ellipsis-li {
        display: block;
        width: 100%;
        line-height: 30px;
    }
}
</style>
