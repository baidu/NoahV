<template>
    <div class="dashboard-edit">
        <Card :bordered="false" class="dashboard-base">
            <div slot="title" class="card-title">基本信息</div>
            <formTpl
                :items="items"
                :action="action"
                position="left"
                :labelwidth="80"
                layout="inline"
            />
        </Card>
        <Card :bordered="false" class="dashboard-view">
            <div slot="title" class="card-title">
                仪表盘布局
                <div class="btn-list">
                    <a href="#/dashboard/list" class="btn-back">返回</a>
                    <a :href="viewHref" target="_blank" class="btn-preview">预览</a>
                </div>
            </div>
            <div
                class="dashboard-line"
                v-for="(item, index) in dashboardData"
                :key="index"
            >
                <draggable
                    :options="dargOption"
                    @add="onEmptyAdd($event, index)"
                    class="widget-line temp-line"
                >
                    <transition-group tag="ul">
                    </transition-group>
                </draggable>
                <div
                    @click="addWidget(item, index)"
                    class="widget-add-btn"
                >
                    <sa-icon type="plus"/>
                </div>
                <draggable
                    v-model="dashboardData[index]"
                    :options="dargOption"
                    @start="startItem"
                    @add="onAdd($event, item)"
                    :clone="cloneEvent"
                    class="widget-line"
                >
                    <transition-group tag="ul">
                        <li
                            :class="'li-' + item.length"
                            v-for="(element, widgetIndex) in item"
                            :key="element.id"
                            class="widget-container"
                        >
                            <widget
                                @on-copy="widgetCopy(item, widgetIndex)"
                                @on-delete="widgetDelete(item, widgetIndex)"
                                :path="element.path"
                                :title="element.title"
                                :type="element.type"
                            />
                        </li>
                    </transition-group>
                </draggable>
            </div>
        </Card>
    </div>
</template>

<script>
import u from 'underscore';
import $ from 'jquery';
import draggable from 'vuedraggable';
import widget from './widget/widget.vue';
import apiConfig from './api/config';
import util from './util/util';
export default {
    name: 'dashboardEdit',
    components: {
        draggable,
        widget
    },
    data() {
        this.id = this.$route.query.id || '';
        return {
            viewHref: '#/dashboard/view?id=' + this.id,
            cloneEvent: node => {
                this.currentNode = node;
                this.originalIndex = this.findIndex(node.id);
            },
            dargOption: {
                group: {
                    name: 'widget',
                    pull: true,
                    put: true
                },
                ghostClass: 'drop-placeholder-line'
            },
            items: [
                {
                    name: 'title',
                    title: '仪表盘名称',
                    type: 'input',
                    value: '',
                    placeholder: '输入仪表盘名称',
                    width: '400px'
                },
                {
                    name: 'refresh',
                    title: '自动刷新',
                    type: 'switch',
                    size: 'default',
                    closeLable: '关',
                    openLable: '开'
                }
            ],
            action: [
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: util.getApi(apiConfig.updateMeta),
                    args: {
                        name: this.name
                    },
                    callback: (fieldsValue, responseData) => {
                        if (responseData.success) {
                            this.$Message.success('保存成功！');
                        }
                    },
                    filterData(data) {
                        if (data.refresh === true) {
                            data.configure = JSON.stringify({
                                refresh: true
                            });
                        }
                        else {
                            data.configure = JSON.stringify({});
                        }
                        delete data.refresh;
                        return data;
                    }
                }
            ],
            dashboard: []
        };
    },
    created() {
        // 获取query中的信息
        if (typeof this.id !== 'undefined') {
            this.getDashboardConfig(this.id);
        }
    },
    methods: {
        findIndex(targetId) {
            let originalIndex;
            u.find(this.dashboard, (item, index) => {
                u.find(item, list => {
                    if (list.id === targetId) {
                        originalIndex = index;
                        return true;
                    }
                });
                return originalIndex;
            });
            return originalIndex;
        },
        getDashboardConfig(id) {
            this.$request({
                url: util.getApi(apiConfig.dashboardGet),
                method: 'get',
                params: {
                    id: id
                }
            }).then(res => {
                if (res.data.success) {
                    this.items[0].value = res.data.data.title;
                    let config = JSON.parse(res.data.data.configure);
                    this.dashboard = config.widgets;
                    if (config.refresh === true) {
                        this.items[1].value = true;
                    }
                    else {
                        this.items[1].value = false;
                    }
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        submitAdd(index, callback) {
            this.$request({
                url: util.getApi(apiConfig.widgetCreate),
                method: 'post',
                data: {
                    line: index,
                    name: this.name
                }
            }).then(res => {
                if (res.data.success) {
                    let data = res.data.data;
                    callback(data);
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        addWidget(item, index) {
            if (item.length > 5) {
                this.$Message.error('一行最多添加6个组件');
                return;
            }
            this.submitAdd(index, data => {
                item.push({
                    id: data.id,
                    path: data.name,
                    title: data.title,
                    type: 'WIDGETS'
                });
            });

        },
        widgetCopy(widget, index) {
            if (widget.length > 5) {
                this.$Message.error('一行最多添加6个组件');
                return;
            }
            this.$request({
                url: util.getApi(apiConfig.widgetCopy),
                method: 'post',
                showLoading: false,
                data: {
                    name: this.name,
                    widgetsname: widget[index].path,
                    type: widget[index].type
                }
            }).then(res => {
                if (res.data.success) {
                    let obj = res.data.data;
                    obj.path = obj.name;
                    delete obj.name;
                    obj.type = widget[index].type;
                    widget.splice(index + 1, 0, obj);
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        widgetDelete(widget, index) {
            this.$request({
                url: util.getApi(apiConfig.widgetDelete),
                method: 'post',
                showLoading: false,
                data: {
                    name: this.name,
                    widgetsname: widget[index].path
                }
            }).then(res => {
                if (res.data.success) {
                    widget.splice(index, 1);
                }
                else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        startItem(evt) {
            $(evt.clone).addClass('source-target-item');
        },
        onEmptyAdd(evt, index) {
            let node = this.currentNode;
            if (!node || !node.id) {
                return;
            }
            this.dashboard.splice(index, 0, [node]);
            this.updateDashboard();
        },
        onAdd(evt, item) {
            let newIndex = evt.newIndex;
            let oldIndex = evt.oldIndex;
            let node = this.currentNode;
            let originalIndex = this.originalIndex;
            if (!node || !node.id) {
                return false;
            }
            if (item.length > 5) {
                this.dashboard[originalIndex].splice(oldIndex, 0, node);
                this.$Message.error('一行最多添加6个组件');
                return false;
            }
            item.splice(newIndex, 0, node);
            this.updateDashboard();
        },
        updateDashboard() {
            let data = this.dashboard;
            if (this.dashboard[this.dashboard.length - 1].length === 0) {
                data = this.dashboard.slice(0, -1);
            }
            let updateData = [];
            data.forEach(row => {
                let tempRow = [];
                if (row) {
                    row.forEach(item => {
                        tempRow.push({
                            path: item.path,
                            type: item.type,
                            id: item.id
                        });
                    });
                    updateData.push(tempRow);
                }
            });
            this.$request({
                url: util.getApi(apiConfig.dashboardUpdate),
                method: 'post',
                data: {
                    name: this.name,
                    widgets: JSON.stringify(updateData)
                }
            }).then(res => {
                if (!res.data.success) {
                    this.$Message.error(res.data.message);
                    setTimeout(() => {
                        this.$router.go(0);
                    }, 1000);
                }
            });
        }
    },
    computed: {
        dashboardData() {
            if (!this.dashboard) {
                this.dashboard = [];
            }
            this.dashboard.forEach((item, index) => {
                if (item.length === 0 && this.dashboard.length -1 !== index) {
                    this.dashboard.splice(index, 1);
                }
            });
            if (this.dashboard.length === 0
                || this.dashboard[this.dashboard.length - 1].length !== 0
            ) {
                this.dashboard.push([]);
            }
            return this.dashboard;
        }
    }
};
</script>

<style lang="less">
.dashboard-edit {
    margin: -20px;
    background: #f5f7f9;
    min-height: 500px;
    .dashboard-base,
    .dashboard-view {
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
        border-radius: 2px;
        .ivu-form-item {
            margin-bottom: 0;
        }
    }
    .dashboard-view {
        margin-top: 10px;
    }
    .ivu-card-head {
        padding: 10px 15px;
        border-bottom: 1px solid #e8eaed;
        color: #383636;
        font-size: 14px;
        .card-title {
            font-size: 14px;
            line-height: 20px;
            font-weight: normal;
            position: relative;
            .btn-list {
                position: absolute;
                right: 0;
                top: -3px;
                a {
                    width: 70px;
                    height: 26px;
                    display: inline-block;
                    text-align: center;
                    line-height: 26px;
                    border-radius: 2px;
                    &.btn-back {
                        border: 1px solid #e2e2e2;
                        color: #383636;
                    }
                    &.btn-preview {
                        background: #268deb;
                        color: #fff;
                        margin-left: 20px;
                    }
                }
            }
        }
    }
    .dashboard-line {
        height: 140px;
        .widget-add-btn {
            float: left;
            width: 64px;
            border: #d1e1f1 dashed 1px;
            border-radius: 3px;
            background: #f3f7fb;
            height: 118px;
            line-height: 118px;
            text-align: center;
            color: #d1e1f1;
            cursor: pointer;
            .noahv-icon {
                font-size: 20px;
                font-weight: bold;
            }
        }
        .widget-line {
            margin-left: 86px;
            ul {
                min-height: 10px;
                margin: 0 -10px;
            }
            .widget-container {
                box-sizing: border-box;
                padding: 0 10px;
                float: left;
                &.li-1 {
                    width: 100%;
                }
                &.li-2 {
                    width: 50%;
                }
                &.li-3 {
                    width: 33.3333%;
                }
                &.li-4 {
                    width: 25%;
                }
                &.li-5 {
                    width: 20%;
                }
                &.li-6 {
                    width: 16.6666%;
                }
                &.li-7 {
                    width: 14.2857%;
                }
                &.li-8 {
                    width: 12.5%;
                }
                .dashboard-widget {
                    .widget-content {
                        .tips {
                            position: relative;
                            max-width: 100%;
                            padding-left: 75px;
                            .icon {
                                position: absolute;
                                left: 20px;
                            }
                            .info {
                                max-width: 100%;
                            }
                            &.no-data {
                                padding-left: 0;
                            }
                        }
                    }
                }
                // 拖动占位符
                &.drop-placeholder-line {
                    position: relative;
                    width: 0;
                    padding: 0;
                    .dashboard-widget {
                        background: #55abf9;
                        border: none;
                        width: 4px;
                        height: 120px;
                        position: absolute;
                        .widget-icon,
                        .widget-content {
                            display: none;
                        }
                    }
                }
                &.source-target-item {
                    display: block !important;
                    .dashboard-widget {
                        border-style: dashed;
                    }
                }
            }
        }
    }
    .temp-line {
        height: 20px;
        &.widget-line {
            ul {
                min-height: 20px;
            }
            .widget-container {
                width: 100% !important;
                &.drop-placeholder-line {
                    .dashboard-widget {
                        background: #55abf9;
                        border: none;
                        width: 100%;
                        height: 4px;
                        margin-top: 8px;
                        position: absolute;
                        .widget-icon,
                        .widget-content {
                            display: none;
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1500px) {
        .dashboard-line .widget-line .widget-container.li-6 {
            .dashboard-widget .widget-content .tips .info  {
                width: 100px;
            }
        }
        .dashboard-line .widget-line .widget-container.li-5 {
            .dashboard-widget .widget-content .tips .info  {
                width: 120px;
            }
        }
    }
    @media screen and (max-width: 1280px) {
        .dashboard-line .widget-line .widget-container.li-6 {
            .dashboard-widget .widget-content .tips .info  {
                width: 80px;
            }
        }
        .dashboard-line .widget-line .widget-container.li-5 {
            .dashboard-widget .widget-content .tips .info  {
                width: 100px;
            }
        }
    }
}

</style>
