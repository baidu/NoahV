<template>
    <div :class="prefixCls">
        <div class="header">
            <div class="meta">
                <NvCheckbox class="title" v-model="checkAll" :disabled="disabled" :partial="partial" @on-change="selectAll">{{title}}</NvCheckbox>
            </div>
        </div>
        <div class="body" :style="getBodyStyle()">
            <NvTree
                :items="data"
                :checkbox="true"
                @on-check-change="checkChange"
            >
            </NvTree>
        </div>
        <div v-if="$slots.backup" class="backup" :style="getBackUpStyle()">
            <slot name="backup"></slot>
        </div>
    </div>
</template>

<script type="text/javascript">
    import u from 'underscore';

    const prefixCls = 'noahv-pool';
    export default {
        name: 'NvPool',
        props: {
            data: Array,
            title: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                checked: [],
                checkAll: false,
                partial: false,
                preChecked: -1,
                prefixCls: prefixCls
            }
        },
        watch: {
            data: {
                deep: true,
                handler(val) {
                    this.dataChange(val);
                }
            }
        },
        methods: {
            getBodyStyle() {
                return {
                    height: this.search ? '320px' : '360px'
                };
            },
            getBackUpStyle() {
                return {
                    height: this.search ? '320px' : '360px'
                };
            },
            selectAll() {
                if (this.checkAll) {
                    this.data.forEach(item => {
                        if (!item.disabled) {
                            this.$set(item, 'checked', true);
                        }
                    });
                    this.checked = u.filter(this.data, function(item) {
                        return !item.disabled;
                    });
                }
                else {
                    this.data.forEach(item => {
                        if (!item.disabled) {
                            this.$set(item, 'checked', false);
                        }
                    });
                    this.checked = [];
                }
                this.$emit('on-change', this.checked);
            },
            checkChange(event, current, checkedItems) {
                // id must be in ascending order
                if (event.shiftKey) {
                    let len = this.data.length;
                    for (let i = 0; i < len; i++) {
                        if (this.data[i].id === current.id) {
                            break;
                        }
                        if (this.data[i].checked) {
                            this.preChecked = this.data[i].id;
                        }
                    }
                    for (let i = 0; i < len; i++) {
                        if (this.data[i].id > this.preChecked && this.data[i].id <= current.id) {
                            this.$set(this.data[i], 'checked', true);
                        }
                        else if (this.data[i].id > current.id) {
                            this.$set(this.data[i], 'checked', false);
                        }
                    }
                }
                this.checked = u.filter(this.data, function(item) {
                    return item.checked && !item.parent;
                });
                this.$emit('on-change', this.checked);
            },
            dataChange(options) {
                let allCheck = true;
                let hasCheck = false;
                for (let i = 0, len = options.length; i < len; i++) {
                    if (options[i].checked) {
                        hasCheck = true;
                    }
                    else {
                        allCheck = false;
                    }
                    if (hasCheck && !allCheck) {
                        break;
                    }
                }
                this.partial = !allCheck && hasCheck  ? true : false;
                this.checkAll = allCheck;
            }
        }
    }
</script>
