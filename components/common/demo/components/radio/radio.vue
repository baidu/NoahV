<template>
    <div>
        <div class="ele">
            <h4>基础示例</h4>
            <nv-radio label="radio1"></nv-radio>
            <nv-radio label="radio2"></nv-radio>
            <nv-radio label="radio3" disabled></nv-radio>
            <nv-radio label="radio4" disabled></nv-radio>
        </div>
        <div class="ele">
            <h4>单选组合</h4>
            <nv-radio-group v-model="groupModel">
                <nv-radio label="A">A</nv-radio>
                <nv-radio label="B">B</nv-radio>
                <nv-radio label="C" disabled>C</nv-radio>
                <nv-radio label="D" disabled>D</nv-radio>
            </nv-radio-group>
        </div>
        <div class="ele">
            <h4>按钮样式单选组合</h4>
            <nv-radio-group  v-model="button4" type="button" size="large">
                <nv-radio label="北京"></nv-radio>
                <nv-radio label="上海"></nv-radio>
                <nv-radio label="深圳"></nv-radio>
                <nv-radio label="杭州"></nv-radio>
            </nv-radio-group >
        </div>
        <div class="ele">
            <nv-radio-group v-model="button5" type="button">
                <nv-radio label="北京"></nv-radio>
                <nv-radio label="上海"></nv-radio>
                <nv-radio label="深圳"></nv-radio>
                <nv-radio label="杭州"></nv-radio>
            </nv-radio-group >
        </div>
        <div class="ele">
            <nv-radio-group  v-model="button6" type="button" size="small">
                <nv-radio  label="北京"></nv-radio >
                <nv-radio  label="上海"></nv-radio >
                <nv-radio  label="深圳"></nv-radio >
                <nv-radio  label="杭州"></nv-radio >
            </nv-radio-group>
        </div> 
        <div class="ele">
            <h4>按钮样式单选组合 -- 加强样式</h4>
            <nv-radio-group  v-model="button7" type="button" buttonType="strong">
                <nv-radio label="北京"></nv-radio>
                <nv-radio label="上海"></nv-radio>
                <nv-radio label="深圳"></nv-radio>
                <nv-radio label="杭州"></nv-radio>
            </nv-radio-group>
        </div>      
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                groupModel: 'A',
                button4: '北京',
                button5: '北京',
                button6: '北京' ,
                button7: '北京'               
            };
        }
    };
</script>
<style lang="less">
.ele {
    margin-bottom: 20px;
    h4 {
        margin: 5px 0;
    }
}
</style>