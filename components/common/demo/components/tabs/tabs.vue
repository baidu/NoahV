<template>
    <div>
        <div class="ele">
            <h4>基础用法</h4>
            <nv-tabs value="name1">
                <nv-tab-pane label="标签一" name="name1">标签一的内容</nv-tab-pane>
                <nv-tab-pane label="标签二" name="name2">标签二的内容</nv-tab-pane>
                <nv-tab-pane label="标签三" name="name3">标签三的内容</nv-tab-pane>
            </nv-tabs>
        </div>
        <div class="ele">
            <h4>禁用</h4>
            <nv-tabs>
                <nv-tab-pane label="标签一">标签一的内容</nv-tab-pane>
                <nv-tab-pane label="标签二" disabled>标签二的内容</nv-tab-pane>
                <nv-tab-pane label="标签三">标签三的内容</nv-tab-pane>
            </nv-tabs>
        </div>
        <div class="ele">
            <h4>图标</h4>
            <nv-tabs>
                <nv-tab-pane label="macOS" icon="logo-apple">标签一的内容</nv-tab-pane>
                <nv-tab-pane label="Windows" icon="logo-windows">标签二的内容</nv-tab-pane>
                <nv-tab-pane label="Linux" icon="logo-tux">标签三的内容</nv-tab-pane>
            </nv-tabs>
        </div>
        <div class="ele">
            <h4>small</h4>
            <nv-tabs :animated="false">
                <nv-tab-pane label="标签一">标签一的内容</nv-tab-pane>
                <nv-tab-pane label="标签二">标签二的内容</nv-tab-pane>
                <nv-tab-pane label="标签三">标签三的内容</nv-tab-pane>
            </nv-tabs>
        </div>
        <div class="ele">
            <h4>卡片样式</h4>
            <nv-tabs type="card" :animated="false">
                <nv-tab-pane label="标签一">标签一的内容</nv-tab-pane>
                <nv-tab-pane label="标签二">标签二的内容</nv-tab-pane>
                <nv-tab-pane label="标签三">标签三的内容</nv-tab-pane>
            </nv-tabs>
        </div>
    </div>
</template>
