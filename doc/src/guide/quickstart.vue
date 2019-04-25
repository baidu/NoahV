<template>
    <div class="table-doc quickstart">
        <h2>概述</h2>
        <div class="table-doc-item">
            NoahV致力于解决运维领域中运维平台研发上手难、周期长、效果不佳；重复造轮子；没有统一的规范，UI风格、交互各不相同，造成维护成本高而且用户体验差等问题
            <br>
            在开始之前，推荐先学习 <a href="https://cn.vuejs.org/" target="_blank">vuejs</a> 的相关知识，并确保正确安装和配置了 <a href="https://nodejs.org/en/" target="_blank">Node.js</a> v6.5 或以上。
        </div>
        <h2>标准开发</h2>
        <div class="table-doc-item">
            实际项目中，对代码有构建、调试、代理、打包部署等一系列工程化的需求。我们提供了一准套的工具：提供了统一的研发部署、构建调试功能。
        </div>
        <div class="sub-title">1.安装脚手架工具</div>
        noahv-cli 是为了提高开发效率而基于NoahV开发的的脚手架工具，请按照以下步骤安装使用：
        <!-- 旧的 -->
        <!-- <div class="code">
            $ &nbsp;&nbsp;bash -c "$( curl xx:8080/install_opdt.sh )"; &nbsp;&nbsp;source ~/.bashrc
            <br>
            $ &nbsp;&nbsp;opdt -help
        </div> -->
        <div class="code">
            $ &nbsp;&nbsp;npm install noahv-cli -g
            <br>
            $ &nbsp;&nbsp;noahv --help
        </div>
        <!-- <div class="table-doc-item">
            更多功能请参考 <a href="" target="_blank">脚手架工具</a> 文档。
        </div> -->
        <div class="sub-title">2.创建项目</div>
        使用命令行工具初始化一个项目
        <div class="code">
            $ &nbsp;&nbsp;mkdir project && cd project && noahv init
        </div>
        工具会自动获取框架的最新版本代码并自动安装依赖，关于各个目录的作用请参考目录结构章节。
        <div class="table-doc-item"></div>
        <div class="sub-title">3.创建页面</div>
        使用 <span class="inline-code">noahv create list</span>命令创建一个基础的列表页面
        <div class="code">
            $ &nbsp;&nbsp;noahv create list
        </div>
        运行命令后需要输入新增加页面的路径，输入
        <span class="inline-code">test/list</span>
        ，该命令会在src目录下创建test目录，并生成list.vue文件，
        该文件中是该示例表格页面的配置信息，
        同时会自动添加路由信息以及添加该vue文件对应的单测模板文件。
        <div class="table-doc-item">
            目前noahv create可选的创建类型有：
            <ul>
                <li>action (普通的空白页面)</li>
                <li>list (列表页面)</li>
                <li>filterList (带筛选表单的列表页面)</li>
                <li>form (表单页面)</li>
                <li>chart (时序趋势图页面)</li>
                <li>api (模拟数据文件，详见<a href="#/guide/mockup">模拟数据创建</a>)</li>
                <li>test (单测模板)</li>
            </ul>
        </div>
        <div class="table-doc-item"></div>
        <div class="sub-title">4.开发调试</div>
        执行如下命令一键启动调试，访问 <a href="http://127.0.0.1:8088" target="_blank">http://127.0.0.1:8088</a> 查看效果。
        <br>
        访问 <a href="http://127.0.0.1:8088/#/test/list" target="_blank">http://127.0.0.1:8088/#/test/list</a>查看上述创建的<span class="inline-code">test/list</span>页面，
        <div class="code">
            $ &nbsp;&nbsp;noahv start
        </div>
        <div class="table-doc-item">
            如果希望改变启动端口，可以在
            <span class="inline-code">noahv start</span>
            命令后加端口号，如：
            <span class="inline-code">noahv start 8089</span>
        </div>
        <div class="sub-title">5.修改创建的模板页面</div>
        创建好的模板页面能够直接运行，根据需要可以调整模板页面，不同的模板页面有不同的功能，详情请参考[模板文档](#/doc/template/basic-table)，保存之后浏览器会自动刷新。
        <br>
        <div class="sub-title">6.配置顶部菜单栏</div>
        将上述创建的test/list页面配置到顶部菜单栏中，可以通过点击菜单栏直接访问该页面

        打开src/common目录下的header.js文件，在header字段中加入如下配置，既可以在导航栏中看到创建的页面
<pre>
export default {
    header: [
        {
            label: '快速开始示例',
            key: 'test/list',
            link: 'test/list'
        }
    ]
}
</pre>
        <br>
        菜单栏详细配置，请参考文档 <a href="#/guide/menu">菜单栏配置</a> 。
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
    .quickstart {
        .inline-code {
            border-radius: 3px;
            padding: 2px 5px;
            margin: 0;
            color: #687168;
            background-color: #def5df;
        }
        pre {
            background: #f2f4f5;
            padding: 10px;
            line-height: 20px;
        }
    }
</style>
