<template>
    <div :class="prefixCls">
        <div class="left">
            <NvPool :data="leftOptions" :title="leftTitle" :disabled="leftDisabled" @on-change="leftChange">
            </NvPool>
        </div>
        <div class="arrow">
            <Button class="arrow-btn" type="primary" :disabled="goRightDisabled" @click="goRight" icon="chevron-right"></Button>
            <Button class="arrow-btn" type="primary" :disabled="goLeftDisabled" @click="goLeft" icon="chevron-left"></Button>
        </div>
        <div class="right">
            <NvPool :data="rightOptions" :title="rightTitle" :disabled="rightDisabled" @on-change="rightChange">
           </NvPool>
        </div>
    </div>
</template>

<script type="text/javascript">
    import u from 'underscore';
    import lodash from 'lodash';
    import NvPool from './pool.vue';

    const prefixCls = 'noahv-transfer';
    export default {
        name: 'NvTransfer',
        components: {
            NvPool: NvPool
        },
        props: {
            options: Array,
            leftTitle: String,
            rightTitle: String,
            leftDisabled: Boolean,
            rightDisabled: Boolean
        },
        data() {
            return {
                leftChecked: [],
                rightChecked: [],
                rightOptions: [],
                leftOptions: [],
                prefixCls: prefixCls,
                goLeftDisabled: true,
                goRightDisabled: true
            }
        },
        watch: {
            options: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.leftOptions = val;
                }
            },
            leftChecked: {
                deep: true,
                immediate: true,
                handler(list) {
                    const newChecked = this.getNewChecked(this.leftChecked);
                    this.goRightDisabled = !newChecked.length;
                }
            },
            rightChecked: {
                deep: true,
                immediate: true,
                handler(list) {
                    this.goLeftDisabled = !list.length;
                }
            }
        },
        methods: {
            leftChange(checked) {
                this.leftChecked = checked;
                this.$emit('on-checked-change', this.leftChecked, this.rightChecked);
            },
            rightChange(checked) {
                this.rightChecked = checked;
                this.$emit('on-checked-change', this.leftChecked, this.rightChecked);
            },
            goRight() {
                const newChecked = this.getNewChecked(this.leftChecked);
                const goRight = lodash.cloneDeep(newChecked);
                u.each(newChecked, item => {
                    this.$set(item, 'disabled', true);
                });
                u.each(goRight, item => {
                    this.$set(item, 'checked', false);
                    this.rightOptions.push(item);
                });
                this.leftChecked = [];
                this.$emit('on-change', this.leftOptions, this.rightOptions);
            },
            goLeft() {
                const goLeft = u.pluck(this.rightChecked, 'name');
                u.each(this.leftOptions, item => {
                    if (goLeft.indexOf(item.name) > -1) {
                        this.$set(item, 'checked', false);
                        this.$set(item, 'disabled', false);
                    }
                });
                this.rightOptions = u.filter(this.rightOptions, item => {
                    return goLeft.indexOf(item.name) === -1;
                });
                this.rightChecked = [];
                this.$emit('on-change', this.leftOptions, this.rightOptions);
            },
            getNewChecked(array) {
                return u.filter(array, item => {
                    if (!item.disabled && item.checked) {
                        return true;
                    }
                }); 
            },
            /**
             * 暴露给用户
             */
            getAllChecked() {
                return this.rightOptions;
            }
        }
    }
</script>
