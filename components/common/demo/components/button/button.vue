<template>
    <div>
        <div class="ele">
            <h4>普通样式 </h4>
            <nv-button type="default" size="small" style="margin-right: 10px;">普通样式</nv-button>
            <nv-button type="default" style="margin-right: 10px;">普通样式</nv-button>
            <nv-button type="default" disabled style="margin-right: 10px;">禁用样式</nv-button>
            <nv-button type="default" loading style="margin-right: 10px;">普通样式</nv-button>
            <nv-button type="default" size="big" style="margin-right: 10px;">普通样式</nv-button>
        </div>
        <div class="ele">
            <h4>重要样式 </h4>
            <nv-button type="primary" size="small" style="margin-right: 10px;">重要样式</nv-button>
            <nv-button type="primary" style="margin-right: 10px;">重要样式</nv-button>
            <nv-button type="primary" disabled style="margin-right: 10px;">禁用样式</nv-button>
            <nv-button loading type="primary" style="margin-right: 10px;">重要样式</nv-button>
            <nv-button type="primary" size="big" style="margin-right: 10px;">重要样式</nv-button>
        </div>
        <div class="ele">
            <h4>加强样式 </h4>
            <nv-button type="strong" size="small" style="margin-right: 10px;">加强样式</nv-button>
            <nv-button type="strong" style="margin-right: 10px;">加强样式</nv-button>
            <nv-button type="strong" disabled style="margin-right: 10px;">加强样式</nv-button>
            <nv-button loading type="strong" style="margin-right: 10px;">加强样式</nv-button>
            <nv-button type="strong" size="big" style="margin-right: 10px;">加强样式</nv-button>
        </div>
        <div class="ele">
            <h4>虚线样式 </h4>
            <nv-button type="dashed" size="small" style="margin-right: 10px;">虚线样式</nv-button>
            <nv-button type="dashed" style="margin-right: 10px;">虚线样式</nv-button>
            <nv-button type="dashed" disabled style="margin-right: 10px;">禁用样式</nv-button>
            <nv-button loading type="dashed" style="margin-right: 10px;">虚线样式</nv-button>
            <nv-button type="dashed" size="big" style="margin-right: 10px;">虚线样式</nv-button>
        </div>
        <div class="ele">
            <h4>文字样式</h4>
            <nv-button type="text" size="small" style="margin-right: 10px;">文字样式</nv-button>
            <nv-button type="text" disabled style="margin-right: 10px;">文字样式</nv-button>
            <nv-button loading type="text" style="margin-right: 10px;">文字样式</nv-button>
            <nv-button type="text" size="big" style="margin-right: 10px;">文字样式</nv-button>
        </div>
        <div class="ele">
            <h4>成功样式</h4>
            <nv-button  type="success" style="margin-right: 10px;">成功样式</nv-button>
        </div>
        <div class="ele">
            <h4>错误样式</h4>
            <nv-button  type="error" style="margin-right: 10px;">错误样式</nv-button>
        </div>
        <div class="ele">
            <h4>警告样式 </h4>
            <nv-button  type="warning" style="margin-right: 10px;">警告样式</nv-button>
        </div>
        <div class="ele">
            <h4>图标样式 </h4>
            <nv-button style="margin-right: 10px;">
                <Icon type="md-add"></Icon>
                创建样式
            </nv-button>
            <nv-button type="primary" style="margin-right: 10px;">
                <Icon type="md-add"></Icon>
                创建样式
            </nv-button>
            <nv-button  icon="md-refresh"  style="margin-right: 10px;"></nv-button>
            <nv-button  icon="md-download"  style="margin-right: 10px;"></nv-button>
        </div>
        <div class="ele">
            <h4>Button Group </h4>
            <nv-button-group style="margin-right: 10px;">
                <nv-button style="margin-right: 10px;">取消</nv-button>
                <nv-button type="primary">确认</nv-button>
            </nv-button-group>
            <nv-button-group>
                <nv-button>取消</nv-button>
                <nv-button>确认</nv-button>
            </nv-button-group>
        </div>
        <div class="ele">
            <nv-button-group style="margin-right: 10px;">
                <nv-button disabled>Yesterday</nv-button>
                <nv-button disabled>Today</nv-button>
                <nv-button disabled>Tomorrow</nv-button>
            </nv-button-group>
            <nv-button-group>
                <nv-button type="primary">L</nv-button>
                <nv-button>M</nv-button>
                <nv-button>M</nv-button>
                <nv-button type="dashed">R</nv-button>
            </nv-button-group>
        </div>
        <div class="ele">
            <h4>Icons</h4>
            <nv-button-group style="margin-right: 10px;">
                <nv-button type="primary">
                    <Icon type="ios-arrow-back"></Icon>
                    Backward
                </nv-button>
                <nv-button type="primary">
                    Forward
                    <Icon type="ios-arrow-forward"></Icon>
                </nv-button>
            </nv-button-group>
            <nv-button-group style="margin-right: 10px;">
                <nv-button type="primary" icon="ios-skip-backward"></nv-button>
                <nv-button type="primary" icon="ios-skip-forward"></nv-button>
            </nv-button-group>
            <nv-button-group>
                <nv-button icon="ios-color-wand-outline"></nv-button>
                <nv-button icon="ios-sunny-outline"></nv-button>
                <nv-button icon="ios-crop"></nv-button>
                <nv-button icon="ios-color-filter-outline"></nv-button>
            </nv-button-group>
        </div>

        <div class="ele">
            <h4>Size</h4>
            <nv-button-group size="large" style="margin-right: 10px;">
                <nv-button>Large</nv-button>
                <nv-button>Large</nv-button>
            </nv-button-group>
            <nv-button-group style="margin-right: 10px;">
                <nv-button>Default</nv-button>
                <nv-button>Default</nv-button>
            </nv-button-group>
            <nv-button-group size="small" style="margin-right: 10px;">
                <nv-button>Small</nv-button>
                <nv-button>Small</nv-button>
            </nv-button-group>
            <br><br>
            <nv-button-group size="large" shape="circle" style="margin-right: 10px;">
                <nv-button>Large</nv-button>
                <nv-button>Large</nv-button>
            </nv-button-group>
            <nv-button-group shape="circle" style="margin-right: 10px;">
                <nv-button>Default</nv-button>
                <nv-button>Default</nv-button>
            </nv-button-group>
            <nv-button-group size="small" shape="circle">
                <nv-button>Small</nv-button>
                <nv-button>Small</nv-button>
            </nv-button-group>
            </div>
        </div>
</template>

<script>
    export default {
        data() {
            return {
                
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