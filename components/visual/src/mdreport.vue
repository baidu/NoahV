<template>
    <div class="ui-mdreport" ref="report" :style="mdStyle">
        <div class="ui-mdreport-container">
            <div class="ui-mdreport-header">
                <h2>
                    <span v-if="!link" id="${titleid.id}">{{title}}</span>
                    <a v-if="link" :href="link" target="_blank">{{title}}</a>
                    <span class="ui-mdreport-timerange">(<time>{{times}}</time>)</span>
                </h2>
            </div>
        </div>
        <div class="ui-mdreport-body" v-if="!errTip" id="${table.id}">
            <table class="table" ref="mdTable">
                <thead>
                    <template v-if="reportOptions.hasGroup">
                        <tr>
                            <th rowspan="2">{{reportOptions.main}}</th>
                            <template v-for="column in theadColumns">
                                <th
                                    v-if="column.items"
                                    style="border-bottom-width: 1px;"
                                    :colspan="column.items.length">{{column.name}}</th>
                                <th
                                    v-else-if="!column.items"
                                    class="sort"
                                    rowspan="2"
                                    :class="[column.sortType == 'desc'
                                        ? 'sort-desc' : (column.sortType == 'asc' ? 'sort-asc' : '')]"
                                    :data-sort="column.sortid"
                                    @click="sort(column)">{{column.title}}</th>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="column in theadColumns">
                                <template
                                    v-if="column.items"
                                    v-for="it in column.items">
                                    <th
                                        class="sort"
                                        :class="[it.sortType == 'desc'
                                        ? 'sort-desc' : (it.sortType == 'asc' ? 'sort-asc' : '')]"
                                        :data-sort="it.sortid"
                                        @click="sort(it)" >{{it.title}}</th>
                                </template>
                            </template>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <th>{{reportOptions.main}}</th>
                            <template v-for="column in theadColumns">
                                <th
                                    v-if="column.items"
                                    style="border-bottom-width: 1px;"
                                    :colspan="column.items.length">{{column.name}}</th>
                                <th
                                    v-else-if="!column.items"
                                    class="sort"
                                    rowspan="2"
                                    :class="[column.sortType == 'desc'
                                        ? 'sort-desc' : (column.sortType == 'asc' ? 'sort-asc' : '')]"
                                    :data-sort="column.sortid"
                                    @click="sort(column)">{{column.title}}</th>
                            </template>
                        </tr>
                    </template>
                </thead>
                <tbody class="tbody">
                    <template v-for="item in bodyLists">
                        <tr
                            v-if="reportType !== 'rows'"
                            v-show="item.treeInfo.isShow"
                            class="tr"
                            data-parent-id="parentId"
                            data-id="tid">
                            <td class="tree-node">
                                <div class="tree-node-wrap">
                                    <span class="tree-node-span" @click="expandNode(item.treeInfo)">
                                        <span
                                            v-for="hasSublings in item.treeInfo.parentHasSublings"
                                            :class="[hasSublings ? 'tree-node-blank-i': 'tree-node-blank-none']"></span>
                                        <span
                                            v-if="item.treeInfo.hasNext & !item.treeInfo.isLast"
                                            :class="[item.treeInfo.isExpend
                                            ? 'tree-node-blank-t-m': 'tree-node-blank-t-p']"></span>
                                        <span
                                            v-if="item.treeInfo.hasNext & item.treeInfo.isLast"
                                            :class="[item.treeInfo.isExpend
                                            ? 'tree-node-blank-l-m': 'tree-node-blank-l-p']"></span>
                                        <span
                                            v-if="!item.treeInfo.hasNext & !item.treeInfo.isLast"
                                            class="tree-node-blank-t"></span>
                                        <span
                                            v-if="!item.treeInfo.hasNext & item.treeInfo.isLast"
                                            class="tree-node-blank-l"></span>
                                    </span>
                                    <span class="tree-node-label" :title="item.value">{{item.text}}</span>
                                </div>
                            </td>
                            <td v-for="td in item.columns" v-html="td.name"></td>
                        </tr>
                        <tr v-else>
                            <td>
                                <span class="tree-node-rows">{{item.text}}</span>
                            </td>
                            <td v-for="td in item.columns" v-html="td.name"></td>
                        </tr>
                    </template>
                </tbody>
                <tfoot v-if="isShowTotal">
                    <tr>
                        <td>合计</td>
                        <template v-for="total in totals">
                            <td v-if="total">{{total}}</td>
                            <td v-else>--</td>
                        </template>
                    </tr>
                </tfoot>
            </table>
            <div v-if="bodyLists.length === 0 && isload" class="nodata">{{t('mdreport.nodataTip')}}</div>
            <div v-if="comments" class="comment">{{comments}}</div>
            <div class="loading-panel"><div class="loading-box">{{t('mdreport.loading')}}</div></div>
        </div>
        <div class="report-error-holder" v-if="errTip">{{errTip}}</div>
        <nv-mask ref="mask"></nv-mask>
    </div>
</template>
<script>
import u from 'underscore';
import $ from 'jquery';
import moment from 'moment';
import mdutil from './util/util';
import nvMask from './mask';

import {t} from './locale';
import mixin from './mixins';

const TITLE = t('mdreport.title');
const DEFAULTFORMAT = 'MM.DD HH:mm';
const DEFAULTTIME = 'before(2h)';
const DEFAULTCONF = {
    'title': TITLE,
    'timeType': 'relative',
    'time': DEFAULTTIME
};
const HEIGHT = 267;
const DEFAULTCOLOR = '#333';
const DEFAULT_REQUEST_TYPE = 'post';

let widgetConf = {};

// Execute JS statement
function evil(fn) {

    /**
     * In order to prevent some front-end compiler tools from reporting errors,
     * setting a variable whcih points to Function
     */
    let Fn = Function;
    return new Fn('return ' + fn)();
}
export default {
    mixins: [mixin],
    props: {
        // get conf's url
        url: {
            type: String,
            required: false
        },
        params: {
            type: Object,
            required: false
        },
        path: {
            type: String,
            required: false
        },
        conf: {
            type: Object,
            required: false
        },
        dataUrl: {
            type: String,
            default: '',
            required: false
        },
        extraParams: {
            type: Object,
            required: false
        },
        confMethod: {
            type: String,
            default: 'post',
            required: false
        }
    },
    data() {
        let height = this.params ? this.params.height || HEIGHT : HEIGHT;
        return {
            reportConf: u.clone(this.conf),
            timeParams: this.params,
            data: u.clone(this.series),
            mdStyle: 'min-height:' + height + 'px;',

            // whether the widget is loading
            isLoading: false,

            // whether the widget has been loaded
            isload: false,
            reportOptions: {},

            /**
             * table's type.
             * if the type is rows, the tr dom has no children
             * if the type is tree, the tr dom has children and show like a tree
             */
            reportType: 'rows',
            bodyLists: [],
            metrics: [],
            totals: [],
            currentTime: false,
            showTime: DEFAULTTIME,
            id: 0,
            errTip: false,
            link: false
        };
    },
    components: {nvMask},
    computed: {
        title() {
            if (!this.reportConf) {
                return '';
            }
            return this.reportConf ? this.reportConf.title : '';
        },
        times() {
            if (!this.reportConf) {
                return;
            }
            let titleTimes = '';
            titleTimes = mdutil.timetransfer(this.showTime).join('|');
            let times = '';
            if (titleTimes) {
                times = titleTimes.split('|');
                u.each(times, (item, i) => {
                    times[i] = moment(item).format(this.reportConf.showTimeFormat || DEFAULTFORMAT);
                });
                times = times.join('-');
            }
            return times;
        },
        comments() {
            return this.reportConf ? this.reportConf.data.comments : false;
        },
        theadColumns() {
            return this.reportConf ? this.buildTheader(this.reportConf.data.columns) : [];
        },

        // if the table has footer to show total data.
        isShowTotal() {
            let count = 0;
            this.totals.map(total => {
                if (total) {
                    count++;
                }
                return total;
            });
            return count > 0;
        }
    },
    watch: {
        params: {
            handler(val) {
                this.timeParams = val;
                this.isload = false;
                this.scrollTop();
            },
            deep: true
        },
        conf: {
            handler(val, oldVal) {
                if (val !== oldVal) {
                    this.reportConf = u.clone(val);
                    this.isload = false;
                    this.scrollTop();
                }
            },
            deep: true
        }
    },
    created() {
        // Read user configuration, including external api configuration
        widgetConf = this.$extraEchartsConf;

        if (this.path) {
            this.getConf();
        }
    },
    mounted() {

        /**
         * prevent to fresh the view when windows's width change too often.
         * add lazy loading when you scroll the page
         */
        this.redraw = u.throttle(this.scrollTop, 100);

        let scrollTrigger = widgetConf.extraComponent.trend.scrollTrigger || document;

        // add lazy loading when you scroll the page
        $(scrollTrigger).on('scroll', this.redraw);

        if (this.conf) {
            this.renderConf();
        }
    },
    methods: {
        getConf() {
            let confUrl = this.url;
            let confMethod = this.confMethod.toLowerCase() || DEFAULT_REQUEST_TYPE.toLowerCase();
            if (!this.url) {

                /**
                 * TODO: Compatible with the configuration of the used code base,
                 * post-optimization only retains nvMdReport
                 */
                confUrl = widgetConf.getAPI(widgetConf.mons.confApi.nvMdReport || widgetConf.mons.confApi.saMdReport);
            }
            let params = Object.assign({}, {
                name: this.path
            }, this.extraParams);
            let axiosParams = {
                url: confUrl,
                method: confMethod,
                showLoading: false
            };
            if (confMethod === 'get') {
                axiosParams.params = params;
            }
            else {
                axiosParams.data = params;
            }
            this.isLoading = true;
            this.$wRequest(axiosParams).then(data => {
                this.isLoading = false;
                if (data.data.success) {
                    this.errTip = false;
                    this.reportConf = JSON.parse(data.data.data.configure || '{}');
                    // render data
                    this.scrollTop();
                }
                else {
                    this.showError(data.data.message);
                }
            });
        },
        renderConf() {
            const conf = this.reportConf;
            let reportOptions = {
                title: conf.title,

                // show the main name of the table
                main: conf.data.caption || this.t('mdreport.objectsName'),

                // whether to load children dom
                loadChildren: conf.data.loadChildren,

                // table's footer comments
                comments: conf.comments
            };

            let metrics = [];
            let columns = [];

            reportOptions.metrics = metrics;
            reportOptions.columns = columns;

            this.reportOptions = reportOptions;
            this.isload = true;
            this.link = conf.link ? conf.link : false;
            this.freshData();
        },

        /**
         * get data from server
         * it includes:
         * 1. data and conf's API of interface
         */
        freshData() {
            if (!this.reportConf.timeType || this.reportConf.timeType === 'relative') {
                this.reportConf = Object.assign({}, DEFAULTCONF, this.reportConf);
            }
            if (!this.timeParams) {
                this.timeParams = this.initTime();
            }
            let showTime = mdutil.setTime(
                this.reportConf.timeType,
                this.timeParams,
                this.reportConf.time
            );
            this.showTime = showTime;
            let params = {
                data: JSON.stringify(this.setColumnData(this.reportConf.data)),
                time: showTime
            };
            if (this.reportConf.display) {
                this.data = this.reportConf.display;
                this.render(this.reportConf.display);
                this.isLoading = false;
                this.hideMask();
            }
            else {
                // Data request configuration
                let dataUrl;
                let dataRequestType = DEFAULT_REQUEST_TYPE;
                if (this.reportConf.datasource) {

                    // Support for multiple data sources
                    dataUrl = this.reportConf.datasource.api;

                    // Configuration includes data request mode
                    dataRequestType = this.reportConf.datasource.method || DEFAULT_REQUEST_TYPE;
                }
                else if (this.dataUrl) {
                    dataUrl = this.dataUrl;
                }
                else {

                    /**
                     * TODO: Compatible with the configuration of the used code base,
                     * post-optimization only retains saMdReport
                     */
                    dataUrl = widgetConf.getAPI(widgetConf.mons.dataApi.nvMdReport
                        || widgetConf.mons.dataApi.saMdReport);
                }

                /**
                 * When the adaptation request type is get, the request field is params,
                 * and when it is post, the request field is data.
                 */
                let dataParams = {
                    url: dataUrl,
                    method: dataRequestType.toLowerCase(),
                    showLoading: false
                };
                if (dataRequestType.toLowerCase() === 'get') {
                    dataParams.params = params;
                }
                else {
                    dataParams.data = params;
                }
                this.isLoading = true;
                this.$wRequest(dataParams).then(mdData => {
                    this.isLoading = false;
                    if (mdData.data.success) {
                        this.errTip = false;
                        this.$nextTick( () => {
                            this.data = mdData.data.data;
                            this.render(mdData.data.data);
                        });
                    }
                    else {
                        this.showError(mdData.data.message);
                    }
                    this.hideMask();
                });
            }
        },
        render(data) {
            this.bodyLists = [];
            this.buildTableBody(data, this.theadColumns, 0);
            this.buildFooter();
        },

        /**
         * render table header
         *
         * @param  {[type]} dcolumns [description]
         * @return {[type]}          [description]
         */
        buildTheader(dcolumns) {
            let columns = [];
            let metrics = [];
            let groups = {};
            u.each(dcolumns, (item, index) => {

                /**
                 * set a alias for every column
                 * alias: server will send a data to frontend base on alias.
                 * In order to prevent duplication operations, aliases are needed.
                 */
                let alias = item.alias;
                if (typeof alias === 'undefined') {
                    alias = item.metric;
                }

                let statistics = item.statistics || 'avg';
                if (item.metric) {
                    let metric = {
                        metric: item.metric,
                        alias: alias,
                        statistics: statistics
                    };
                    metrics.push(metric);
                }
                if (item.use && typeof item.use !== 'boolean') {
                    item.use = (item.use === 'true');
                }

                /**
                 * if config of use equals 'false' or 'none' will not render it,
                 * calculate-column will use it to calculate the result.
                 * In order to prevent duplication operations, aliases are needed.
                 */
                if (item.use !== false && item.use !== 'none') {
                    let group = item.group;
                    let col = {
                        title: item.header,
                        alias: alias,
                        unit: item.unit || '',
                        decimals: item.decimals,
                        threshold: item.threshold,
                        sortid: index,
                        sortType: false,
                        total: item.total
                    };
                    if (group) {
                        if (groups[group]) {
                            groups[group].items.push(col);
                        }
                        else {
                            groups[group] = {
                                items: [col],
                                name: group
                            };
                            columns.push(groups[group]);
                            this.reportOptions.hasGroup = true;
                        }
                    }
                    else {
                        columns.push(col);
                        this.reportOptions.hasGroup = true;
                    }
                }
            });
            this.metrics = metrics;
            return columns;
        },

        buildTableBody(list, columns, level, parentInfo) {
            let len = list.length;
            let hasOwnParent = parentInfo ? true : false;
            $.each(list, (i, item) => {
                let treeInfo = {
                    isShow: true
                };
                if (item.children && item.children.length > 0) {
                    this.reportType = 'tree';
                }
                let treeLabelText;
                if (this.reportType === 'rows') {
                    treeLabelText = item.value;
                }
                else {
                    let tempSublings = [];
                    if (hasOwnParent && parentInfo) {
                        parentInfo.parentHasSublings.map(item => {
                            tempSublings.push(item);
                            return item;
                        });
                        tempSublings.push((parentInfo.parent && parentInfo.parent.length > 1));
                    }
                    else {
                        parentInfo = {parentHasSublings: []};
                    }
                    treeInfo = {
                        level: level,
                        isLast: i === (len - 1),
                        hasNext: item.children && item.children.length > 0,
                        isShow: true,
                        isExpend: true,
                        id: !parentInfo ? i + 1 : parentInfo.id + '-' + (i + 1),
                        parentHasSublings: tempSublings,
                        parent: list
                    };
                    treeLabelText = item.alias || item.value;
                }
                let columnsList = [];
                $.each(columns, (j, col) => {
                    let str = {};

                    // column has been divided in groups
                    if (col.items) {
                        $.each(col.items, (j, col2) => {
                            try {
                                str = this.caculateTdStr(item.metrics, col2);
                            }
                            catch (e) {
                                str = {
                                    name: this.t('mdreport.caculteError'),
                                    sortid: col2.sortid
                                };
                            }
                            columnsList.push(str);
                        });
                    }

                    // column has not been divided in groups
                    else {
                        try {
                            str = this.caculateTdStr(item.metrics, col);
                        }
                        catch (e) {
                            str = {
                                name: this.t('mdreport.caculteError'),
                                sortid: col.sortid
                            };
                        }
                        columnsList.push(str);
                    }
                });
                this.bodyLists.push({
                    text: treeLabelText,
                    value: item.value,
                    columns: columnsList,
                    treeInfo: treeInfo
                });

                // render the children of the tree
                if (this.reportType !== 'rows' && item.children && item.children.length > 0) {
                    this.buildTableBody(item.children, columns, level + 1, treeInfo);
                }
            });
        },
        caculateTdStr(data, column) {
            let str = '';
            let value = '';
            if (data[column.alias] !== undefined) {
                str = this.formatTd(data[column.alias], column);
                value = data[column.alias];
            }
            else {
                let tempArr = column.alias.split('#{');
                let expressArr = [];

                // match the expression of calculate-column's config, and calculate the result to show it.
                tempArr.map(item => {
                    if (item) {
                        let temp = item.split('}');
                        temp.map(tTemp => {
                            if (temp) {
                                // fix bug
                                if (data[tTemp] || data[tTemp] === 0) {
                                    expressArr.push(data[tTemp]);
                                }
                                else {
                                    expressArr.push(tTemp);
                                }
                            }
                            return tTemp;
                        });
                    }
                    return item;
                });

                // calculate-column: calculate the column's data which is calculate by other column
                value = evil(expressArr.join(''));
                str = this.formatTd(value, column);
            }
            return {
                name: str,
                value: value,
                sortid: column.sortid
            };
        },

        /**
         * format the data base on user's config
         * user's config include: color、unit、 decimals
         *
         * @param  {[type]} data   [description]
         * @param  {[type]} column [description]
         * @return {[type]}        [description]
         */
        formatTd(data, column) {
            let unit = column.unit;
            let decimals = column.decimals;
            let threshold = column.threshold.sort((a, b) => {
                return a[0] > b[0];
            });
            let str = '';
            let fontColor = DEFAULTCOLOR;
            if (typeof data === 'number') {
                if (threshold && threshold.length > 0) {
                    threshold.map(item => {
                        if (data > item[0] && data <= item[1]) {
                            fontColor = item[2];
                        }
                        return item;
                    });
                }
                str = '<span style="color: ' + fontColor + '">' + mdutil.setDecimal(data, decimals) + unit + '<span>';
            }
            else {
                str = '<span>' + (data || '--') + '<span>';
            }
            return str;
        },

        /**
         * calculate the footer's total type of the information
         * total type include: svg and sum
         * if the column has not config of total, it will show 「--」.
         * if the column is not the type of 'Number', it will show 「计算失败」.
         */
        buildFooter() {
            const bodyList = this.bodyLists;
            const theColumns = this.theadColumns;
            let totals = [];
            $.each(theColumns, (j, col) => {

                // column has been divided in groups
                if (col.items) {
                    $.each(col.items, (j, col2) => {
                        if (col2.total) {
                            let totalInfo = '';
                            try {
                                let itemTotal = 0;
                                bodyList.map(trItem => {
                                    trItem.columns.map(trColumnItem => {
                                        if (trColumnItem.sortid === col2.sortid) {
                                            itemTotal += trColumnItem.value;
                                        }
                                        return trColumnItem;
                                    });
                                    return trItem;
                                });
                                let footer = {
                                    sum: mdutil.setDecimal(itemTotal, col2.decimals),
                                    avg: mdutil.setDecimal(itemTotal / bodyList.length, col2.decimals)
                                };
                                if (!footer[col2.total]) {
                                    return
                                }
                                totalInfo = col2.unit ? footer[col2.total] + col2.unit : footer[col2.total];
                            }
                            catch (e) {
                                totalInfo = this.t('mdreport.caculteError');
                            }
                            totals.push(totalInfo);
                        }
                        else {
                            totals.push(null);
                        }
                    });
                }

                // column has not been divided in groups
                else {
                    let totalInfo = '';
                    try {
                        let itemTotal = 0;
                        bodyList.map(trItem => {
                            trItem.columns.map(trColumnItem => {
                                if (trColumnItem.sortid === col.sortid) {
                                    itemTotal += trColumnItem.value;
                                }
                                return trColumnItem;
                            });
                            return trItem;
                        });
                        let footer = {
                            sum: mdutil.setDecimal(itemTotal, col.decimals),
                            avg: mdutil.setDecimal(itemTotal / bodyList.length, col.decimals)
                        };
                        totalInfo = col.unit ? footer[col.total] + col.unit : footer[col.total];
                        if (!footer[col.total]) {
                            return
                        }
                    }
                    catch (e) {
                        totalInfo = this.t('mdreport.caculteError');
                    }
                    totals.push(totalInfo);
                }
            });
            this.totals = totals;
        },

        /**
         * calculate the column information
         * calculate the ajax params to get column data from server
         *
         * @param {[type]} data [description]
         */
        setColumnData(data) {
            let tempData = Object.assign({}, data);
            let tempColumns = [];
            if (tempData.columns) {
                tempData.columns.map(item => {
                    if (item.use && typeof item.use !== 'boolean') {
                        item.use = (item.use === 'true');
                    }
                    if (item.source === 'origin' && item.use) {
                        item.offset = item.offset ? mdutil.parsePeriod(item.offset || 0) : 0;
                        item.time = mdutil.setTime(
                            item.timeType,
                            this.timeParams,
                            item.time
                        );
                        tempColumns.push(Object.assign({}, item));
                    }
                    return item;
                });
                tempData.columns = tempColumns;
            }
            return tempData;
        },

        /**
         * caculate the sceen's position and judge whether to load
         */
        scrollTop() {
            const main = this.$refs.report;
            let top = mdutil.getScrollTop();
            let height = mdutil.getViewHeight();
            let offset = mdutil.getOffset(main);
            if (offset && offset.top < top + height && offset.bottom > top
                && !this.isload && !this.isLoading) {
                this.showMask();
                this.renderConf();
            }
        },

        /**
         * expand and close the node
         * it use when the reportType is tree
         *
         * @param  {[type]} nodeInfo [description]
         */
        expandNode(nodeInfo) {
            nodeInfo.isExpend = !nodeInfo.isExpend;
            this.bodyLists.map(trItem => {
                if (trItem.treeInfo.id && trItem.treeInfo.id.indexOf(nodeInfo.id + '-') > -1) {
                    if (nodeInfo.isExpend) {
                        trItem.treeInfo.isExpend = nodeInfo.isExpend;
                    }
                    trItem.treeInfo.isShow = nodeInfo.isExpend;
                }
                return trItem;
            });
        },

        /**
         * sort table data
         * sort the table by the type of sortType
         * sortType includes: rows and tree
         *
         * @param  {[type]} column [description]
         * @return {[type]}        [description]
         */
        sort(column) {
            let bodyLists = this.bodyLists;
            let sortId = column.sortid;
            this.setColumnSortStatus(column);

            // sort by row type
            if (this.reportType === 'rows') {
                bodyLists.sort((a, b) => {
                    let compareResult = false;
                    a.columns.map(aColumnItem => {
                        if (aColumnItem.sortid === sortId) {
                            b.columns.map(bColumnItem => {
                                if (bColumnItem.sortid === sortId) {
                                    if (column.sortType === 'asc') {
                                        compareResult = aColumnItem.value - bColumnItem.value;
                                    }
                                    else {
                                        compareResult = bColumnItem.value - aColumnItem.value;
                                    }
                                }
                                return bColumnItem;
                            });
                        }
                        return aColumnItem;
                    });
                    return compareResult;
                });
            }

            // sort by tree type
            else {
                bodyLists.sort((a, b) => {
                    let compareResult = false;

                    // if sort in the same node
                    if (!a.treeInfo.hasNext && !a.treeInfo.hasNext && a.treeInfo.parent === b.treeInfo.parent) {
                        a.columns.map(aColumnItem => {
                            if (aColumnItem.sortid === sortId) {
                                b.columns.map(bColumnItem => {
                                    if (bColumnItem.sortid === sortId) {

                                        //sort tree node orderby 'asc'
                                        if (column.sortType === 'asc') {
                                            if (b.treeInfo.isLast && aColumnItem.value > bColumnItem.value) {
                                                a.treeInfo.isLast = true;
                                                b.treeInfo.isLast = false;
                                                compareResult = aColumnItem.value - bColumnItem.value;
                                            }
                                        }

                                        //sort tree node orderby 'desc'
                                        else if (b.treeInfo.isLast && aColumnItem.value < bColumnItem.value) {
                                            a.treeInfo.isLast = true;
                                            b.treeInfo.isLast = false;
                                            compareResult = bColumnItem.value - aColumnItem.value;
                                        }
                                    }
                                    return bColumnItem;
                                });
                            }
                            return aColumnItem;
                        });
                    }
                    return compareResult;
                });
            }
        },
        setColumnSortStatus(column) {

            // change the sort type of columns
            column.sortType = !column.sortType
                ? 'asc'
                : (column.sortType === 'asc' ? 'desc' : 'asc');
            $.each(this.theadColumns, (j, col) => {

                // set group of column
                if (col.items) {
                    $.each(col.items, (j, col2) => {
                        if (column.sortid !== col2.sortid) {
                            col2.sortType = false;
                        }
                    });
                }

                // don't set group of column
                else if (column.sortid !== col.sortid) {
                    col.sortType = false;
                }
            });
        },
        initTime() {
            let times = mdutil.timetransfer(DEFAULTTIME);
            return {
                start: times[0],
                end: times[1]
            };
        },

        /**
         * show error massage
         */
        showError(message) {
            this.errTip = message;
            this.hideMask();
        },

        /**
         * show loading mdmask
         */
        showMask() {
            this.$refs.mask.show();
        },

        /**
         * hide loading mdmask
         */
        hideMask() {
            this.$refs.mask && this.$refs.mask.hide();
        }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.destroy();
            $(document).off('scroll', this.redraw);
        }
    }
};
</script>
