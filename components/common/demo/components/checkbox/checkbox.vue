<template>
    <div>
        <div class="ele">
            <h4>基础示例</h4>
            <nv-checkbox  v-model="single" @on-change="change">Checkbox</nv-checkbox>
        </div>
        <div class="ele">
            <h4>Checkbox组</h4>
            <nv-checkbox-group v-model="fruit">
                <nv-checkbox label="香蕉" size="large"></nv-checkbox>
                <nv-checkbox label="苹果" size="large"></nv-checkbox>
                <nv-checkbox label="西瓜" size="large"></nv-checkbox>
            </nv-checkbox-group><br />
            <br />
            <nv-checkbox-group v-model="fruit">
                <nv-checkbox label="香蕉" size="small"></nv-checkbox>
                <nv-checkbox label="苹果" size="small"></nv-checkbox>
                <nv-checkbox label="西瓜" size="small"></nv-checkbox>
            </nv-checkbox-group><br />
            <nv-checkbox-group v-model="fruit">
                <nv-checkbox label="香蕉" disabled size="default"></nv-checkbox>
                <nv-checkbox label="苹果" disabled size="default"></nv-checkbox>
                <nv-checkbox label="西瓜" size="default"></nv-checkbox>
            </nv-checkbox-group><br />
            <nv-checkbox-group v-model="social" @on-change="change">
                <nv-checkbox label="twitter">
                    <Icon type="logo-twitter"></Icon>
                    <span>Twitter</span>
                </nv-checkbox>
                <nv-checkbox label="facebook">
                    <Icon type="logo-facebook"></Icon>
                    <span>Facebook</span>
                </nv-checkbox>
                <nv-checkbox label="github">
                    <Icon type="logo-github"></Icon>
                    <span>Github</span>
                </nv-checkbox>
                <nv-checkbox label="snapchat">
                    <Icon type="logo-snapchat"></Icon>
                    <span>Snapchat</span>
                </nv-checkbox>
            </nv-checkbox-group><br />
            <nv-checkbox-group v-model="fruit">
                <nv-checkbox label="香蕉"></nv-checkbox>
                <nv-checkbox label="苹果"></nv-checkbox>
                <nv-checkbox label="西瓜"></nv-checkbox>
            </nv-checkbox-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'checkboxDemo',
    data() {
        return {
            single1: false,
            single: false,
            social: ['facebook', 'github'],
            fruit: ['苹果']
        };
    },
    methods: {
        change(val, event) {
            console.log(val);
        }
    }
};
</script>


