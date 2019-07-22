
## 概述

主要用于数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等。

## 基础示例

<template>
    
<Card>

<p slot="title">基础表单示例</p>

<template>
    <div class="form-doc">
        <div class="example">
            <normalFormExample />
        </div>
    </div>
</template>

<nv-code :content="normalFormExampleCode">
</nv-code>

</Card>
</template>

<br>
<br>

<template>

<Card>

<p slot="title">填充数据示例</p>



<template>
    <div class="form-doc">
        <div class="example">
            <preData />
        </div>
    </div>
</template>

<nv-code :content="preDataCode">
</nv-code>

</Card>
</template>

<br>
<br>

<template>
    
<Card>

<p slot="title">提交别名示例</p>



<template>
    <div class="form-doc">
        <div class="example">
            <aliasDemo />
        </div>
    </div>
</template>

<nv-code :content="aliasDemoCode">
</nv-code>
</Card>
</template>

<br>
<br>
<template>
    
<Card>

<p slot="title">select方法监听示例</p>



<template>
    <div class="form-doc">
        <div class="example">
            <selectDemo />
        </div>
    </div>
</template>

<nv-code :content="selectDemoCode">
</nv-code>
</Card>
</template>


## 组合示例

<br>

<template>
    
<Card>

<p slot="title">组合表单示例</p>




<template>
    <div class="form-doc-complex">
        <div class="example">
            <complexFormExample />
        </div>
    </div>
</template>

<nv-code :content="complexFormExampleCode">
</nv-code>

</Card>
</template>

## API

### props

| 属性       | 说明                                | 类型          | 默认值      |
| ---------- | ----------------------------------- | --------------| ----------- |
| url        | 获取表单填充数据的API地址 | String        | -           |
| method | 获取表单填充数据时的请求方式 | String | post |
| args | 获取表单填充数据时的额外请求参数 | Object | - |
| data | 填充表单的数据，但配置该参数时，上述url配置将失效 | Object | - |
| items      | 表单项配置，详见下方说明      | Array         | -           |
| action     | 表单提交、重置配置，详见下方说明    | Array         | -           |
| layout     | 表单项是否行内布局显示，也就是在一行中显示多个表单项 | String        | inline      |
| position   | 表单项的名称的位置，可选值为left、right、top | String  | -           |
| labelwidth | 表单项名称所占的宽度，若items中无单独指定，继承整个组件的labelWidth值 | Number | 80   |
| params | 表单提交时，携带的额外参数 | Object | - |
| showLoading | 提交时是否显示加载中浮层 | Boolean | true |
| slot | 表单项尾部是否支持自定义内容，其name值与当前表单项保持一致 | Boolean | false |



### items

通用属性


| 属性         | 说明                                                         | 类型    | 默认值             |
| ------------ | ------------------------------------------------------------ | ------- | ------------------ |
| name         | 表格提交数据和获取默认数据时的key                            | String  | -                  |
| submitAlias  | 提交别名，如果配置，提交数据是的可以为submitAlias的值        | String  | -                  |
| title        | 表单项名称                                                   | String  | -                  |
| type         | 表单项类别，目前支持 `input`、`select`、`checkBox`、`time`、`timeRange`、 `satime`、`satimeRange`、<br>`cascader`、 `radioGroup`、`checkBoxGroup`、`inputNumber`、`switch`、`search`      | String  | -                  |
| required     | 是否必填                                                     | Boolean | false              |
| width        | 宽度                                                         | string  | 300px              |
| labelwidth   | 表单项名称所占的宽度                                         | Number  | form的labelwidth值 |
| validateType | 校验类型，当required为true是有效，可选值为`string`、`boolean`、`date`、`array`、`number` | string  | -                  |
| disabled     | 表达项禁用配置，除type为` saTime`、` saTimeRange`外，其他类型均支持该参数 | boolean | false              |


<br>

 各type单独拥有的属性
<br>

<table border="1">
    <thead>
        <tr>
            <th></th>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="4">type=input</td>  
            <td>placeholder</td>
            <td>表单项的默认显示文本</td>
            <td>String</td>
            <td> -</td>
        </tr>
        <tr>
            <td>types</td>
            <td>当type为input时，types指定为textarea，支持文本域</td>
            <td>String</td>
            <td> -</td>
        </tr>
        <tr>
            <td>rows</td>
            <td>文本域的默认行数，当types为textarea时有效</td>
            <td>Number</td>
            <td> -</td>
        </tr>
        <tr>
            <td>readonly</td>
            <td>设置输入框为只读状态</td>
            <td>Boolean</td>
            <td> false</td>
        </tr>
        <tr>
            <td rowspan="3">type=select</td>  
            <td>placeholder</td>
            <td>选择框的默认显示文本</td>
            <td>String</td>
            <td> -</td>
        </tr>
        <tr>
            <td>option</td>
            <td>属性：name-显示的选择项，value-选择项的值，title-鼠标滑过选择项时的提示</td>
            <td>Array</td>
            <td> -</td>
        </tr>
        <tr>
            <td>event</td>
            <td>监听事件，目前支持onChange事件,使用方法见示例</td>
            <td>Function</td>
            <td> -</td>
        </tr>
        <tr>
            <td>type=checkbox</td> 
            <td>label</td>
            <td>勾选框的显示标签</td>
            <td>String</td>
            <td> -</td>
        </tr>
        <tr>
            <td rowspan="3">type=time</td>
            <td>format</td>
            <td>时间的显示格式，所有支持格式见下方说明</td>
            <td>String</td>
            <td>yyyy-MM-dd HH:mm:ss</td>
        </tr>
        <tr>
            <td>options</td>
            <td>快捷面板配置，详见下方说明和示例</td>
            <td>Array</td>
            <td>今天、昨天和一周前的快捷键，详见下方说明和示例</td>
        </tr>
        <tr>
            <td>readonly</td>
            <td>设置时间日历组件为只读状态</td>
            <td>Boolean</td>
            <td> false</td>
        </tr>
        <tr>
            <td rowspan="3">type=timeRange</td>
            <td>format</td>
            <td>时间的显示格式，所有支持格式见下方说明</td>
            <td>String</td>
            <td>yyyy-MM-dd HH:mm:ss</td>
        </tr>
        <tr>
            <td>options</td>
            <td>快捷面板配置，详见下方说明和示例</td>
            <td>Array</td>
            <td>2小时、12小时、1天、7天、15天和30天的快捷键，详见下方说明和示例</td>
        </tr>
        <tr>
            <td>readonly</td>
            <td>设置时间日历组件为只读状态</td>
            <td>Boolean</td>
            <td> false</td>
        </tr>
        <tr>
            <td>type=checkBoxGroup</td>
            <td>option</td>
            <td>属性：name-显示的勾选项和勾选项的值，disabled-设置勾选框禁用，如果整个item配置了disabled,将所有勾选框都被禁用</td>
            <td>Array</td>
            <td> -</td>
        </tr>
        <tr>
            <td rowspan="5">type=saTime</td>
            <td>width</td>
            <td>时间日历组件的宽度</td>
            <td>Number</td>
            <td>350</td>
        </tr>
        <tr>
            <td>saType</td>
            <td>时间类型，有两种取值date/datetime，分别对应（2017-10-10）和（2017-10-11 12:13:14），详见<a href="#/doc/component/date-picker">sa-datepicker文档示例</a></td>
            <td>String</td>
            <td>date</td>
        </tr>
        <tr>
            <td>value</td>
            <td>设置时间组件初始值，接受string和date两种类型，详见同上文档</td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>options</td>
            <td>设置时间日历组件的快捷面板，详见同上文档</td>
            <td>Object</td>
            <td>-</td>
        </tr>
        <tr>
            <td>dateFormat</td>
            <td>设置时间格式，详见同上文档</td>
            <td>String</td>
            <td>YYYY-MM-DD</td>
        </tr>
        <tr>
            <td rowspan="5">type=saTimeRange</td>
            <td>width</td>
            <td>时间日历组件的宽度</td>
            <td>Number</td>
            <td>350</td>
        </tr>
        <tr>
            <td>saType</td>
            <td>时间类型，必填，有两种取值daterang/daterangetime，分别对应（2017-10-10）和（2017-10-11 12:13:14），详见<a href="#/doc/component/date-picker">sa-datepicker文档示例</a></td>
            <td>String</td>
            <td>-</td>
        </tr>
        <tr>
            <td>value</td>
            <td>设置时间组件初始值，array类型(格式如：['starttime', 'endtime'])，详见同上文档</td>
            <td>Array</td>
            <td>-</td>
        </tr>
        <tr>
            <td>options</td>
            <td>设置时间日历组件的快捷面板，详见同上文档</td>
            <td>Object</td>
            <td>-</td>
        </tr>
        <tr>
            <td>dateFormat</td>
            <td>设置时间格式，详见同上文档</td>
            <td>String</td>
            <td>YYYY-MM-DD</td>
        </tr>
        <tr>
            <td rowspan="3">type=radioGroup</td>
            <td>vertical</td>
            <td>设置属性 vertical 可以垂直显示，按钮样式下无效</td>
            <td>String</td>
            <td> -</td>
        </tr>
        <tr>
            <td>option</td>
            <td>属性：name-显示的勾选项，value-勾选项的值，disabled-设置勾选框不可选</td>
            <td>Array</td>
            <td> -</td>
        </tr>
        <tr>
            <td>types</td>
            <td>可以设置为按钮样式</td>
            <td>当设置types值为button时，可以切换为按钮样式</td>
            <td></td>
        </tr>
        <tr>
            <td>type=cascader</td>
            <td>data</td>
            <td>级联选择项的数据，value-选项值，lable-选项显示文本，children-子选项，详见示例</td>
            <td>Array</td>
            <td> -</td>
        </tr>
        <tr>
            <td rowspan="4">type=inputNumber</td>
            <td>max</td>
            <td>设置输入的最大有效值</td>
            <td>Number</td>
            <td> Infinity</td>
        </tr>
        <tr>
            <td>min</td>
            <td>设置输入的最小有效值</td>
            <td>Number</td>
            <td> -Infinity</td>
        </tr>
        <tr>
            <td>step</td>
            <td>设置每次改变的精度</td>
            <td>Number</td>
            <td>1</td>
        </tr>
        <tr>
            <td>readonly</td>
            <td>设置数字输入框为只读状态</td>
            <td>Boolean</td>
            <td> false</td>
        </tr>
        <tr>
            <td rowspan="5">type=switch</td>
            <td>size</td>
            <td>大小，可选项为 large、small、default</td>
            <td>string</td>
            <td> -</td>
        </tr>
        <tr>
            <td>trueValue</td>
            <td>选中时的值</td>
            <td>String, Number, Boolean</td>
            <td> true</td>
        </tr>
        <tr>
            <td>falseValue</td>
            <td>未选中时的值</td>
            <td>String, Number, Boolean</td>
            <td> false</td>
        </tr>
        <tr>
            <td>openLabel</td>
            <td>自定义显示打开时的内容</td>
            <td>string</td>
            <td> -</td>
        </tr>
        <tr>
            <td>closeLabel</td>
            <td>自定义显示关闭时的内容</td>
            <td>string</td>
            <td> -</td>
        </tr>
        <tr>
            <td rowspan="5">type=search</td>
            <td>data</td>
            <td>选择条件的集合，格式参见<a href="#/doc/component/search">search组件</a>的说明文档和使用示例</td>
            <td>array</td>
            <td> -</td>
        </tr>
        <tr>
            <td>placeholer</td>
            <td>输入框的默认提示</td>
            <td>string</td>
            <td>请输入关键字搜索</td>
        </tr>
        <tr>
            <td>clearable</td>
            <td>是否显示条件选择框和输入框的清除按钮</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
        <tr>
            <td>cascader</td>
            <td>配置条件选择框的级联选择功能</td>
            <td>string</td>
            <td> -</td>
        </tr>
        <tr>
            <td>value</td>
            <td>条件选择值和输入值的集合对象，支持v-model，详见<a href="#/doc/component/search">search组件</a>的说明文档和使用示例</td>
            <td>boolean</td>
            <td>false</td>
        </tr>
    </tbody>
</table>

### action
action 支持的公共属性有：

| 属性       | 说明                                | 类型          | 默认值      |
| ---------- | ----------------------------------- | --------------| ----------- |
| name       | 支持的操作，当前支持reset、submit、自定义  | String        | -           |
| type       | 按钮类型，可选值为`primary`、`ghost`、`dashed`、`text`、`info`、`success`、`warning`、`error`或者不设置 | String  | -           |
| title      | 按钮显示的名称                      | Array         | -           |
| link       | 点击跳转链接                        | string  | - |

<br> 

当 name 为submit时，action可用的配置如下：


<br> 

| 属性       | 说明                                | 类型          | 默认值      |
| ---------- | ----------------------------------- | --------------| ----------- |
| method     | 提交请求的方法，优先使用item的method,如果没有配置，将使用form的method参数 | String        | get         |
| args       | 提交请求的携带参数，会和form的params做合并 | Object        | -           |
| submitUrl  | 请求的发送地址                      | String        | -           |
| link       | 请求完成后跳转的地址                | String        | -           |
| beforexhr  | 请求发送前调用方法                  | Function | - |
| filterData | 过滤提交数据方法，参数为表单提交的数据，需要将处理之后的数据return | Function | - |
| successTip | 请求成功，未配置回调是，将会出现的提示信息 | - | ['提交成功, 即将跳转', '提交成功']|
| callback   | 回调函数，当配置submitUrl之后将在请求回来之后调用，同时配置了link的情况下，将只处理link         | Function      | -           |
| errorCallBack | 发生异常时候的回调，在请求返回`success:false` 以及非200错误都会调用，参数为错误信息 | Function| - |

<br> 

当 name 为reset时或者自定义时，action可用的配置如下：

<br> 

| 属性       | 说明                                | 类型          | 默认值      |
| ---------- | ----------------------------------- | --------------| ----------- |
| callback   | 按钮点击之后的回调函数，callback和link同时配置时，先执行callback，再处理link | Function      | -           |

<br> 

* name 为reset时将清空表单，将表单，变回初始状态；
* name 为submit时将触发提交操作；
* name 不为reset或submit时，将出发callback方法。

<br> 

### options [type=time/timeRange]
当使用时间日历组件时，快捷面板的配置

<table border="1">
    <thead>
        <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>shortcuts</td>
            <td>设置快捷选项，每项内容：
                    <li>&emsp;&emsp;+&emsp;text | String：显示的文案</li>
                    <li>&emsp;&emsp;+&emsp;value | Function：返回指定的日期，如需自己控制逻辑，可不设置，并使用 onClick 回调</li>
                    <li>&emsp;&emsp;+&emsp;onClick | Function：点击时的回调，参数为当前日期选择器的 Vue 实例，当需要自定义复杂操作时，可以使用</li>
                </ul>
            </td>
            <td>Array</td>
            <td> 其默认项见上方组合示例</td>
        </tr>
        <tr>
            <td>disabledDate</td>
            <td>设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天</td>
            <td>Function</td>
            <td> -</td>
        </tr>
    </tbody>
</table>


### format [type=time/timeRange]
当使用时间日历组件时，日期显示格式的配置，请严格区分大小写
| 名称       | 说明                                | 示例          |
| ---------- | ----------------------------------- | --------------|
| yyyy       | 年份（四位）                        | 2016          |
| yy         | 年份（两位）                        | 16            |
| MM         | 月份（两位）                        | 01            |
| M          | 月份（一位）                        | 1             |
| MMMM       | 月份（英文）                        | January       |
| MMM        | 月份（英文简写）                    | Jan           |
| dd         | 日期（两位）                        | 01            |
| d          | 日期（一位）                        | 1             |
| Do         | 日期（简写）                        | 1st           |
| DD         | 星期（两位）                        | 00            |
| D          | 星期（一位）                        | 0             |
| dddd       | 星期（英文）                        | Monday        |
| ddd        | 星期（英文简写）                    | Mon           |
| HH         | 小时（24小时制两位）                | 01            |
| H          | 小时（24小时制一位）                | 1             |
| hh         | 小时（12小时制两位）                | 01            |
| h          | 小时（12小时制一位）                | 1             |
| mm         | 分钟（两位）                        | 01            |
| m          | 分钟（一位）                        | 1             |
| ss         | 秒钟（两位）                        | 01            |
| s          | 秒钟（一位）                        | 1             |
| SSS        | 毫秒（三位）                        | 019           |
| SS         | 毫秒（两位）                        | 01            |
| S          | 毫秒（一位）                        | 1             |
| A          | 上午与下午（大写）                  | AM/PM         |
| a          | 上午与下午（小写）                  | am/pm         |
| ZZ         | 时区                                | +0800         |

以上是模板支持的日期类型，可以自由组合出你需要的类型，例如：
+ &emsp;&emsp;+&emsp;yyyy年M月d日：2016年1月1日
+ &emsp;&emsp;+&emsp;MM/dd/yy：12/24/16
+ &emsp;&emsp;+&emsp;H点m分s秒：9点41分0秒


### methods

| 方法名          | 说明                     |  参数      |返回值类型          |
| ---------- | ------------------------ | ------------ | -----------  |
| getItemValues  | 获取当前表单数据           | 无          |Object       | 
| fireSubmitEvent    | 触发提交事件，并校验输入，需要配置action | 无        | -            |


## 填充示例中接口返回数据
<nv-code :content="preDtaaApi"  title="查看接口数据" closeTitle="收起接口数据" copyTitle="复制接口数据">
</nv-code>

## 示例中提交接口返回数据
<nv-code :content="formSubmitAPi"  title="查看接口数据" closeTitle="收起接口数据" copyTitle="复制接口数据">
</nv-code>

<script>
import normalFormExample from  '../../../example/form/normal.vue';
import complexFormExample from '../../../example/form/complex.vue';
import preData from '../../../example/form/preData.vue';
import aliasDemo from '../../../example/form/aliasDemo.vue';
import selectDemo from '../../../example/form/selectDemo.vue'
const complexFormExampleCode = `
<template>
    <div >
        <NvForm
        :items="items" 
        :action="action"
        position="left"
        :labelwidth="60"
        />
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    required: true
                },
                {
                    name: 'age',
                    title: '年龄',
                    type: 'inputNumber',
                    validateType: 'number',
                    max: 150,
                    min: 1,
                    step: 1,
                    required: true
                },
                {
                    name: 'location',
                    title: '籍贯',
                    type: 'Select',
                    placeholder: '请选择',
                    width: '400px',
                    option: [
                        {
                            name: '北京',
                            value: '1',
                            title: '北京是中国的首都'
                        },
                        {
                            name: '乌镇',
                            value: '2',
                            title: '乌镇是一个美丽的南方小镇'
                        },
                        {
                            name: '成都',
                            value: '3',
                            title: '成都的美食享誉天下'
                        }
                    ],
                    required: true
                },
                {
                    name: 'married',
                    title: '婚否',
                    label: '已婚',
                    type: 'checkBox',
                    required: true
                },
                {
                    name: 'sex',
                    title: '性别',
                    type: 'radioGroup',
                    option: [
                        {
                            name: '男',
                            value: '1'
                        },
                        {
                            name: '女',
                            value: '2'
                        }
                    ],
                    required: true
                },
                {
                    // options未设置的情况下，快捷面板的默认显示示例
                    name: 'birthDay',
                    title: '生日',
                    type: 'time',
                    format: 'yyyy-MM-dd',
                    required: true
                },
                {
                    // 自定义快捷面板
                    name: 'entry',
                    title: '入职时间',
                    type: 'time',
                    options: {
                        shortcuts: [
                            {
                                text: '今天',
                                value: function() {
                                    return new Date();
                                },
                                onClick: function() {
                                    //do something
                                }
                            },
                            {
                                text: '昨天',
                                value: function() {
                                    let today = new Date();
                                    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
                                }
                            },
                            {
                                text: '2017.1.1',
                                value: function() {
                                    return new Date(2017, 0, 1);
                                }
                            }
                        ],
                        disabledDate: function(date) {
                            // 示例：设置每个周五不可选
                            return date && date.getDay() === 5;
                        }
                    }
                },
                {
                    name: 'hobby',
                    title: '爱好',
                    type: 'checkBoxGroup',
                    option: [
                        {
                            name: '篮球'
                        },
                        {
                            name: '音乐'
                        },
                        {
                            name: '跑步'
                        },
                        {
                            name: '电影'
                        }
                    ]
                },
                {
                    // options未设置的情况下，快捷面板的默认显示示例
                    name: 'springHoliday',
                    title: '春季假期',
                    type: 'timeRange',
                    format: 'yyyy-MM-dd HH:mm:ss'
                },
                {
                    name: 'fallHoliday',
                    title: '秋季假期',
                    type: 'timeRange',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    options: {
                        shortcuts: [
                            {
                                text: '7天',
                                value: function() {
                                    let now = new Date();
                                    let afterAWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
                                    return [now, afterAWeek];
                                }
                            },
                            {
                                text: '两周',
                                value: function() {
                                    let now = new Date();
                                    let afterAWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
                                    return [now, afterAWeek];
                                }
                            }
                        ]
                    }
                },
                {
                    name: '条件查询',
                    title: '查询',
                    type: 'search',
                    cascader: false,
                    clearable: false,
                    placeholder: '请输入关键字进行查询',
                    required: true,
                    data: [
                        {
                            label: '产品线',
                            value: 'products'
                        },
                        {
                            label: '应用名',
                            value: 'taskName'
                        }
                    ]
                },
                {
                    name: 'address',
                    type: 'cascader',
                    title: '家庭住址',
                    data: [
                        {
                            value: 'beijing',
                            label: '北京',
                            children: [
                                {
                                    value: 'haidian',
                                    label: '海淀区'
                                },
                                {
                                    value: 'chaoyang',
                                    label: '朝阳区'
                                },
                                {
                                    value: 'xicheng',
                                    label: '西城区'
                                }
                            ]
                        }, 
                        {
                            value: 'jiangsu',
                            label: '江苏',
                            children: [
                                {
                                    value: 'nanjing',
                                    label: '南京',
                                    children: [
                                        {
                                            value: 'xuanwu',
                                            label: '玄武区'
                                        },
                                        {
                                            value: 'qinhuai',
                                            label: '秦淮区'
                                        }
                                    ]
                                },
                                {
                                    value: 'suzhou',
                                    label: '苏州',
                                    children: [
                                        {
                                            value: 'wuzhong',
                                            label: '吴中区',
                                        },
                                        {
                                            value: 'huqiu',
                                            label: '虎丘区',
                                        }
                                    ]
                                }
                            ],
                        }
                    ]
                },
                {
                    name: 'note',
                    title: '',
                    type: 'input',
                    types: 'textarea',
                    rows: 4,
                    placeholder: '备注信息',
                    width: '100%'
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'ghost',
                    title: '取消',
                    link: '#/doc/template/basic-table'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/tpl/form/submit',
                    args: {},
                    // callback(fieldsValue, responseData) {
                        // @param {object} fieldsValue  表单数据
                        // @param {object} responseData 请求响应结果，如果有配置submitUrl的话
                        // do something
                    // }
                }
            ]
        };
    }
};
<\/script>

<style lang="less" >
<\/style>

`;
const normalFormExampleCode = `
<template>
    <div >
        <NvForm
        :items="items" 
        :action="action"
        position="left"
        :labelwidth="60"
        />
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    required: true
                },
                {
                    name: 'email',
                    title: '邮箱',
                    type: 'input',
                    placeholder: '输入邮箱地址',
                    width: '400px',
                    required: true
                },
                {
                    name: 'text',
                    title: '备注信息',
                    type: 'input',
                    types: 'textarea',
                    rows: 10,
                    labelwidth: 0,
                    placeholder: '输入备注信息',
                    value: '',
                    width: "100%"
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'ghost',
                    title: '取消',
                    link: '#/doc/template/basic-table'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/tpl/form/submit',
                    args: {},
                    // linkTo: '',
                    // callback(fieldsValue, responseData) {
                        // @param {object} fieldsValue  表单数据
                        // @param {object} responseData 请求响应结果，如果有配置submitUrl的话
                        // do something
                    // }
                }
            ]
        };
    }
};
<\/script>

<style lang="less" >

<\/style>

`;

const preDataCode = `
<template>
    <div >
        <NvForm
        :items="items" 
        :action="action"
        position="left"
        :labelwidth="60"
        url="/api/tpl/form/get"
        method="post"
        :args="args"
        />
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: '输入用户名',
                    width: '400px',
                    required: true
                },
                {
                    name: 'email',
                    title: '邮箱',
                    type: 'input',
                    placeholder: '输入邮箱地址',
                    width: '400px',
                    required: true
                }
            ],
            action: [
            ],
            args: {
                dev: true
            }
        };
    }
};
<\/script>

<style lang="less" >

<\/style>


`;
const aliasDemoCode = `
<template>
    <div >
        <NvForm
        :items="items" 
        :action="action"
        position="left"
        :labelwidth="60"
        />
    </div>
</template>

<script>
export default {
    data () {
        return {
            items: [
                {
                    name: 'username',
                    submitAlias: 'name',
                    title: '用户名',
                    type: 'input',
                    placeholder: 'username',
                    width: '400px',
                    required: true
                },
                {
                    name: 'email',
                    submitAlias: 'mail',
                    title: '邮箱',
                    type: 'input',
                    placeholder: 'email',
                    width: '400px',
                    required: true
                }
            ],
            action: [
                {
                    name: 'reset',
                    type: 'ghost',
                    title: '取消',
                    link: '#/doc/template/basic-table'
                },
                {
                    name: 'submit',
                    type: 'primary',
                    title: '保存',
                    submitUrl: '/api/tpl/form/submit',
                    args: {},
                    // linkTo: '',
                    filterData(submitData) {
                        alert(JSON.stringify(submitData));
                    },
                    // callback(fieldsValue, responseData) {
                        // @param {object} fieldsValue  表单数据
                        // @param {object} responseData 请求响应结果，如果有配置submitUrl的话
                        // do something
                    // }
                }
            ]
        };
    }
};
<\/script>

<style lang="less" >

<\/style>

`;
const selectDemoCode = `
<template>
    <div >
        <NvForm
        :items="items" 
        :action="action"
        position="left"
        :labelwidth="60"
        />
    </div>
</template>

<script>
export default {
    data () {
        const self = this;
        return {
            items: [
                {
                    name: 'username',
                    title: '用户名',
                    type: 'input',
                    placeholder: 'username',
                    width: '400px',
                    required: true
                },
                {
                    name: 'sexy',
                    title: '性别',
                    type: 'select',
                    width: '400px',
                    option: [
                        {
                            name: '男',
                            value: '男'
                        },
                        {
                            name: '女',
                            value: '女'
                        }
                    ],
                    event: {
                        onChange(args) {
                            self.$Message.info('您选择了性别：' + args);
                        }
                    },
                    required: true
                }
            ],
            action: []
        };
    }
};
<\/script>

<style lang="less" >

<\/style>


`;
const preDtaaApi = `
{
    data: {
        username: '右右右',
        email: 'darren@gmail.com'
    },
    success: true
}
`;

const formSubmitAPi = `
{
    data: {
        
    },
    success: true
}
`

export default {
    name: 'FormDoc',
    components: {
        normalFormExample,
        complexFormExample,
        preData,
        aliasDemo,
        selectDemo
    },
    data() {
        return {
            complexFormExampleCode: complexFormExampleCode,
            normalFormExampleCode: normalFormExampleCode,
            preDataCode: preDataCode,
            aliasDemoCode: aliasDemoCode,
            selectDemoCode: selectDemoCode,
            preDtaaApi: preDtaaApi,
            formSubmitAPi: formSubmitAPi
        }
    }
};
</script>

<style lang="less" >
    .form-doc {
        .example {
            margin: 20px 0;
        }
        /*& + .nv-code {
            padding-bottom: 20px;
            border-bottom: 2px dashed #ddd;
        }*/
    }
    
</style>
