<template>
    <div class="table-doc">
        <h2>概述</h2>
        <div class="table-doc-item">
            集数据处理、表格分页、渲染等功能与一体的表格模板
        </div>
        <h2>基础示例</h2>
        <div class="table-doc-item">
            构建一个基础表格
            <div class="example">
                <normalTableExample />
            </div>
        </div>
        <h2>API</h2>
        <div class="table-doc-item">
            <div class="title">props</div>
            <NvTable
                :columns="propsColumns"
                :tdata="propsData"
                :pagination="false"
            />

        </div>
        <div class="table-doc-item">
            <div class="title">methods</div>
            <NvTable
                :columns="methodsColumns"
                :tdata="methodsData"
                :pagination="false"
            />
        </div>
        <div class="table-doc-item">
            <div class="title">events</div>
            <NvTable
                :columns="eventsColumns"
                :tdata="eventsData"
                :pagination="false"
            />
        </div>
        <div class="table-doc-item">
            <div class="title">columns</div>
            <NvTable
                :columns="columnsColumns"
                :tdata="columnsData"
                :pagination="false"
            />
        </div>
    </div>
</template>

<script>
import tableConfig from './tableConfig';
import normalTableExample from '../../../example/table/normal.vue';
console.log(normalTableExample);
export default {
    name: 'TableDoc',
    components: {
        normalTableExample
    },
    data() {
        return {
            propsColumns: [
                {
                    title: '属性',
                    key: 'prop'
                },
                {
                    title: '说明',
                    key: 'description'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '默认值',
                    key: 'default'
                }
            ],
            methodsColumns: [
                {
                    title: '方法名',
                    key: 'name'
                },
                {
                    title: '说明',
                    key: 'description'
                },
                {
                    title: '参数',
                    key: 'params'
                }
            ],
            eventsColumns: [
                {
                    title: '时间名',
                    key: 'name'
                },
                {
                    title: '说明',
                    key: 'description'
                },
                {
                    title: '返回值',
                    key: 'params'
                }
            ],
            columnsColumns: [
                {
                    title: '属性',
                    key: 'name',
                    width: 220
                },
                {
                    title: '说明',
                    key: 'description'
                },
                {
                    title: '类型',
                    key: 'type',
                    width: 160
                },
                {
                    title: '默认值',
                    key: 'default',
                    width: 160
                }
            ],
            propsData: tableConfig.props,
            methodsData: tableConfig.methods,
            eventsData: tableConfig.events,
            columnsData: tableConfig.columns
        };
    }
};
</script>

<style lang="less" >
    .table-doc {
        h2 {
            font-size: 20px;
            margin-bottom: 12px;
            border-left: 6px solid #eee;
            padding-left: 10px;
        }
        .table-doc-item {
            margin: 20px 0;
            .title {
                font-size: 16px;
                margin: 10px 0;
            }
            .example {
                margin: 20px 0;
            }
        }
    }
</style>
