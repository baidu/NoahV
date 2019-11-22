<template>
    <div class="table-doc">
        <h2>概述</h2>
        <div class="table-doc-item">
            NoahV是一个基于vue开发的前端开发框架，主要适用于监控运维、数据分析等场景，同时也适用于常见的后台管理系统。主要包括如下特性：
            <ul>
                <li>组件丰富，提供常用的各类组件，快速开始前端开发</li>
                <li>导航栏、页面布局JSON配置，无需代码逻辑开发</li>
                <li>API数据模拟和API数据代理，让前后端不再耦合，联调更简单，效率更高</li>
                <li>数据仪表盘功能，满足常见的数据可视化需求，助力数据分析场景</li>
                <li>实用的脚手架功能，项目初始化、模板复用、模拟数据创建、调试server启动、框架升级一行命令通通搞定</li>
            </ul>
        </div>
        <h2>系统架构</h2>
        <div class="table-doc-item">
            NoahV框架由五大部分组成，分别是：
            <ul>

                <li>底层框架：采用上手简单易用的Vuejs</li>
                <li>组件模板库：主要有运维业务组件【服务树、趋势图、仪表图、数据面板、运维流程、运维表格、运维表单等】和运维场景组件【仪表盘】</li>
                <li>代码质量/规范：主要有API规范、开发规范、UI规范等，另外内置单测工具，自动生成各个页面的单测模板，单测的覆盖率、代码覆盖与否一目了然。</li>
                <li>功能特性：主要包括导航和页面布局JSON配置、主题定制、访问统计以及可以简化前后端联调过程的本地数据模拟和API数据代理功能</li>
                <li>命令行工具：提供实用的脚手架功能</li>
            </ul>
            框架示意图如下所示：
            <br>
            <img src="../common/assets/img/noahv.png" width="600">
        </div>
        <!-- <h2>与其他框架对比</h2>
        <div class="table-doc-item">
            暂无
        </div> -->
        <h2>联系我们</h2>
        <div class="table-doc-item">
            了解或使用过程中有任何疑问都可以加入微信用户交流群或者到Github提Issues反馈咨询。
            <br>
            Github Issues地址: <a href="https://github.com/baidu/NoahV/issues" target="_blank">baidu/NoahV/issues <nv-icon type="export"/></a>
            <br> 
            微信交流群：<br>
            <img src="https://noahv.cdn.bcebos.com/github%2Ff414efb2572218cd6756ca483.jpg" width="260px">


        </div>
    </div>
</template>

<script>
export default {
    name: 'TableDemo',
    data() {
        return {

        };
    }
};
</script>

<style lang="less" >
    .table-doc {
        font-size: 14px;
        line-height: 30px;
        h2 {
            font-size: 20px;
            margin-bottom: 12px;
            border-left: 6px solid #eee;
            padding-left: 10px;
            color: #333;
        }
        .table-doc-item {
            margin: 20px 0;
            color: #314659;
            font-size: 14px;
            line-height: 30px;
            img {
                padding-left: 10px;
            }
            .opdt-img {
                padding-left: 20px;
                margin-top: 20px;
            }
            .title {
                font-size: 16px;
                margin: 10px 0;
            }
            ul {
                margin-top: 20px;
                padding-left: 20px;
                li {
                    list-style: circle inside;
                }
            }
        }
        .sub-title {
            font-size: 16px;
            line-height: 40px;
            font-weight: bold;
        }
        .code {
            padding: 12px 20px;
            margin: 16px 0;
            overflow: auto;
            background: #f2f4f5;
            border-radius: 2px;
            font-size: 13px;
            color: #314659;
        }
    }
</style>
