
## 概述

日期选择控件，支持选择时间段和快捷键设置
<ul>
    <li>支持选择日期和时间段</li>
    <li>支持设置日期显示格式</li>
    <li>支持设置快捷面板功能</li>
    <li>支持设置不可选日期</li>
    <li>支持设置日期和获取日期</li>
    <li>支持监听选择日期变化</li>
    <li>支持日期默认选中功能</li>
    <li>支持日期显示干预功能</li>
    <li>支持快捷面板默认选中功能</li>
    <li>支持快捷面板反向高亮功能</li>
    <li>支持日期v-model双向绑定</li>
</ul>
<br/>
<br/>


## 基础示例

<br/>
<br/>

<template>
    <Card>
        <p class="card-title">基础用法示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <normalDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="normalDatePickerExampleCode">
        </nv-code>
    </Card>
</template>

<br/>
<br/>

<template>
    <Card>
        <p class="card-title">设置快捷面板示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <hotKeyDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="hotKeyDatePickerExampleCode">
        </nv-code>
    </Card>
</template>


<br/>
<br/>

<template>
    <Card>
        <p class="card-title">设置不可选日期示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <disabledDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="disabledDatePickerExampleCode">
        </nv-code>
    </Card>
</template>


<br/>
<br/>

<template>
    <Card>
        <p class="card-title">公有云风格示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <consoleDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="consoleDatePickerExampleCode">
        </nv-code>
    </Card>
</template>

<br/>
<br/>

<template>
    <Card>
        <p class="card-title">日期显示干预示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <shownTextDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="shownTextDatePickerExampleCode">
        </nv-code>
    </Card>
</template>

<br/>
<br/>

<template>
    <Card>
        <p class="card-title">快捷面板反向高亮示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <reverseDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="reverseDatePickerExampleCode">
        </nv-code>
    </Card>
</template>

## 组合示例

构建一个复杂的时间选择器示例
<br/>
<br/>

<template>
    <Card>
        <p class="card-title">组合用法示例</p>
        <template>
            <div class="date-picker-doc">
                <div class="example">
                    <complexDatePickerExample/>
                </div>
            </div>
        </template>
        <br/>
        <br/>
        <nv-code :content="complexDatePickerExampleCode">
        </nv-code>
    </Card>
</template>



## API

### props

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| type       | 显示类型，可选值为 date、daterange、datetime、daterangetime  | String      | date           |
| value      | 日期，值是 Date/String 类型或 Array 类型。配合 @on-change 使用，可以达到双向绑定的效果，详见示例|  String/Date |  - |
| options    | 额外配置，详见示例和下方说明             | Object            | -           |
| width      | 时间选择框的宽度                         | Number            | 300         |
| theme      | 皮肤配置，可设置common和console两个值。console代表公有云时间组件风格。详见示列。| String | console|
| autoClose  | 设置自动关闭面板，当type为date或daterange时有效 | Boolean    | -           |
| dateFormat | 设置日期时间显示格式，详见示例和[说明](http://momentjs.cn/) | String       | YYYY-MM-DD  |
| setShownTxt | 可选，时间的显示干预函数，可根据业务需要调整显示样式，详见示列 | Function     | - |



### options

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| position   | 设置快捷面板的显示位置，支持inner、outer、top | String            | -           |
| shortcuts  | 设置快捷面板，详见示例和下方说明         | Array             | -           |
| disabledHandler| 设置不可选的日期，详见示例              | Function          | -           |



### shortcuts

| 属性       | 说明                                     | 类型              | 默认值      |
| ---------- | -----------------------------------------| --------------    | ----------- |
| text       | 设置快捷项的显示文本，详见示例           | String            | -           |
| defaultSelected  | 设置快捷面板的默认选中项，多个项同时设置时，只有第一个有效; 不建议同时配置value初值，若同时设置了value初值，则defaultSelected的优先级更高   | Boolean | -           |
| value      | 设置快捷项对应的日期和时间，详见示例     | Function          | -           |
| onClick    | 设置快捷项的点击回调，详见示例           | Function          | -           |


### events

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| on-ok      | 面板的关闭事件                         | 无           | 无                      |
| on-change  | 监听日期变化，使用方法详见示例           | $event（必须）| 选中的日期或日期集合，为 Date 类型或 Array 类型  |
| on-open    | 事件面板的打开事件                     | 无           | 无                                          |
| on-clear   | 清除按钮的点击事件                     | 无           | 无                                          |
| on-confirm | 确定按钮的点击事件                     | 无           | 无                                          |
| on-shortcut-click | 快捷面板的点击事件              | 无           | 选中的快捷面板项的配置对象，为Object类型         |


### methods

| 名称       | 说明                                     | 参数         |        返回值      |
| ---------- | -----------------------------------------| ------------ |------------------- |
| highLightShortCut | 设置快捷项高亮功能，可实现反向高亮功能，使用方法详见示列 | 快捷项唯一标识id | 无 | 



<script>
import normalDatePickerExample from  '../../../example/datePicker/normal.vue';
import hotKeyDatePickerExample from  '../../../example/datePicker/hotkey.vue';
import disabledDatePickerExample from  '../../../example/datePicker/disabled.vue';
import consoleDatePickerExample from '../../../example/datePicker/console.vue';
import shownTextDatePickerExample from '../../../example/datePicker/showntext.vue';
import reverseDatePickerExample from '../../../example/datePicker/reverse.vue';
import complexDatePickerExample from '../../../example/datePicker/complex.vue';

// 基础用法示例代码
const normalDatePickerExampleCode = `
<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="date" :dateFormat="dateFormat"></NvDatePicker>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvDatePickerNormalDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            dateFormat: 'YYYY-MM-DD',
            theme: 'common'
        };
    }
};
<\/script>

<style lang="less">
<\/style>
`;

// 快捷面板示例代码
const hotKeyDatePickerExampleCode = `
<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="hotKeySaDatePickerRef"><\/NvDatePicker>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvDatePickerHotKeyDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                // position=outer，可配置外部快捷面板
                position: 'inner',
                shortcuts: [
                    {
                        text: '7天',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '15天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '30天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 2, 15)
                            ];
                        }
                    },
                    {
                        text: '2个月',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 3, 23)
                            ];
                        },
                        onClick: function () {
                            self.$Message.info('you click the hotkey');
                        }
                    }
                ]
            }
        };
    }
};
<\/script>
`;

// 设置不可选日期
const disabledDatePickerExampleCode = `<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="disabledPicker"><\/NvDatePicker>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvDatePickerDisabledDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                position: 'top',
                shortcuts: [
                    {
                        text: '7天',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '15天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '30天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 2, 15)
                            ];
                        }
                    }
                ],
                /**
                 * 禁止选择日期判断策略
                 * @params {Date} date 要被判断的日期对象
                 * @params {Date/Object} dateValue 如果type为'date/datetime',为选中的日期对象；
                 *                       如果type为'daterange/daterangetime',为选中的时间段集合,结构如下：
                 *                      {"startSelecteDate": 开始时间, "endSelectedDate": 结束时间}，注意每个属性字段都可能为空
                 */
                disabledHandler: function(date, dateValue) {
                    // Demo1. 限制每月18号不可选择
                    if (date.getDate() === 18) {
                        return true;
                    }

                    // Demo2. 限制选择时间跨度不得超过70天
                    // 注意：使用该功能时，或者其他禁止日期动态变化的逻辑，请自行保证快捷面板的配置、默认时间等，与禁止策略保持一致性条件约束。
                    // 比如，这里限制了时间跨度不超过70天，快捷面板中配置的最大跨度也不要超过70天；如果有初始时间，也不要超过70天。
                    // let selectedDate = ['date', 'datetime'].indexOf(self.type) > -1 ? dateValue : dateValue['startSelectedDate'];
                    // if (selectedDate && m(date).diff(m(selectedDate).add(70, 'days')) > 0) {
                    //     return true;
                    // }
                    // else {
                    //     return false;
                    // }
                }
            }
        };
    },
    methods: {
    }
};
<\/script>

<style lang="less">
<\/style>
`;

// 公有云示例
const consoleDatePickerExampleCode = `
<template>
    <div>
        <NvDatePicker :theme="theme" :language="language" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="hotKeySaDatePickerRef"><\/NvDatePicker>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvDatePickerConsoleDemo',
    data() {
        const self = this;
        return {
            // 默认值，可以不需要设置
            theme: 'console',
            language: 'cn',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                position: 'top',
                shortcuts: [
                    {
                        text: '7天',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '15天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '30天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 2, 15)
                            ];
                        }
                    },
                    {
                        text: '2个月',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 3, 23)
                            ];
                        },
                        onClick: function () {
                            self.$Message.info('you click the hotkey');
                        }
                    }
                ]
            }
        };
    }
};
<\/script>
`;

//日期显示干预示例
const shownTextDatePickerExampleCode = `
<template>
    <div>
        <NvDatePicker :theme="theme" :language="language" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" :setShownTxt="setShownText">
        <\/NvDatePicker>
    <\/div>
<\/template>

<script>
import m from 'moment';

export default {
    name: 'nvDatePickerShownTextDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                // position=outer，可配置外部快捷面板
                position: 'inner',
                shortcuts: [
                    {
                        // 1天转换成1440分钟
                        key: 1440,
                        text: '1天',
                        value() {
                            return [
                                new Date(2018, 7, 23),
                                new Date(2018, 7, 24)
                            ];
                        }
                    },
                    {
                        key: 2880,
                        text: '2天',
                        value() {
                            return [
                                new Date(2018, 7, 23),
                                new Date(2018, 7, 25)
                            ];
                        }
                    },
                    {
                        key: 4320,
                        text: '3天',
                        value() {
                            return [
                                new Date(2018, 7, 23),
                                new Date(2018, 7, 26)
                            ];
                        }
                    }
                ]
            }
        };
    },
    methods: {
        /**
         * 干预显示字符串
         *
         * @param {String} val 选中的时间字符串
         * @return {String} 干预后的字符串
         */
        setShownText: function (val) {
            // 示列，拼接快捷项的文本在时间字符串之前
            const self = this;
            let text = '';
            let match = false;
            let time = val.split(' - ');
            let diff = m(time[1]).diff(m(time[0]), 'minutes');
            let shortCuts = self.options.shortcuts;
            for (let i in shortCuts) {
                if (shortCuts.hasOwnProperty(i)) {
                    if (shortCuts[i].key === diff) {
                        match = true;
                        text = shortCuts[i].text + ' ';
                        break;
                    }
                }
            }
            if (!match) {
                text = '';
            }
            return text + val;
        }
    }
};
<\/script>

<style lang="less">
<\/style>
`;

// 反向选中示例
const reverseDatePickerExampleCode = `
<template>
    <div>
        <NvDatePicker :theme="theme" :language="language" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" @on-change="changeHandler($event)" ref="reverseRef">
        <\/NvDatePicker>
    <\/div>
<\/template>

<script>
import m from 'moment';

export default {
    name: 'nvDatePickerShownTextDemo',
    data() {
        const self = this;
        return {
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                // position=outer，可配置外部快捷面板
                position: 'inner',
                shortcuts: [
                    {
                        id: '1440',
                        text: '1天',
                        key: 1440,
                        value() {
                            return [
                                m().subtract(1, 'days').toDate(),
                                m().toDate()
                            ];
                        }
                    },
                    {
                        id: '10080',
                        text: '7天',
                        key: 10080,
                        value() {
                            return [
                                m().subtract(7, 'days').toDate(),
                                m().toDate()
                            ];
                        }
                    }
                ]
            }
        };
    },
    methods: {
        // 实现反向高亮功能。
        // 当选择的时间和快捷面板中的某一项对应时，快捷面板这项高亮起来
        changeHandler: function (event) {
            const self = this;
            if (event && event.length && event[0] && event[1]) {
                let diff = m(event[1]).diff(m(event[0]), 'minutes');
                let shortCuts = self.options.shortcuts;
                for (let i in shortCuts) {
                    if (shortCuts.hasOwnProperty(i)) {
                        if (shortCuts[i].key === diff) {
                            self.$refs['reverseRef'].highLightShortCut(shortCuts[i].id);
                        }
                    }
                }
            }
        }
    }
};
<\/script>

<style lang="less">
<\/style>
`;

// 组合示例
const complexDatePickerExampleCode = `
<template>
    <div>
        <NvDatePicker :language="language" :theme="theme" :width="350" type="daterangetime" :dateFormat="dateFormat" :options="options" ref="complexPicker" v-model="value" @on-change="value=$event"><\/NvDatePicker>
    <\/div>
<\/template>

<script>
export default {
    name: 'nvDatePickerComplexDemo',
    data() {
        const self = this;
        return {
            value: ['2017/12/25 12:21:09', '2017/12/27 13:11:07'],
            language: 'cn',
            theme: 'common',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            options: {
                position: 'outer',
                yearRange: [],
                disabledDate: '',
                shortcuts: [
                    {
                        text: '7天',
                        value() {
                            return [
                                new Date(2018, 1, 23),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '15天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 1, 30)
                            ];
                        }
                    },
                    {
                        text: '30天',
                        value() {
                            return [
                                new Date(2018, 1, 15),
                                new Date(2018, 2, 15)
                            ];
                        }
                    }
                ],
                disabledDate: function (date) {
                    if (date.getDate() === 18) {
                        return true;
                    }
                }
            }
        };
    }
};
<\/script>
`;

export default {
    name: 'datePickerDoc',
    components: {
        normalDatePickerExample,
        complexDatePickerExample,
        hotKeyDatePickerExample,
        disabledDatePickerExample,
        consoleDatePickerExample,
        reverseDatePickerExample,
        shownTextDatePickerExample
    },
    data() {
        return {
            normalDatePickerExampleCode: normalDatePickerExampleCode,
            hotKeyDatePickerExampleCode: hotKeyDatePickerExampleCode,
            disabledDatePickerExampleCode: disabledDatePickerExampleCode,
            complexDatePickerExampleCode: complexDatePickerExampleCode,
            consoleDatePickerExampleCode: consoleDatePickerExampleCode,
            reverseDatePickerExampleCode: reverseDatePickerExampleCode,
            shownTextDatePickerExampleCode: shownTextDatePickerExampleCode
        }
    }
};
</script>

<style lang="less" >
    .date-picker-doc {
        .example {
            margin: 20px 0;
        }
    }
    .card-title {
        font-weight: 600;
    }
</style>
