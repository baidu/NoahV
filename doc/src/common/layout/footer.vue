<template>
    <div class="saasv-layout-footer">
        <div class="github-link">
            <a href="https://github.com/baidu/NoahV" target="_blank">
                <span>Github</span>
                <nv-icon type="export"/>
            </a>
        </div>
        <!-- warning:
            if you run useHeader() this components Will not be useed,
            you can diy footer in header commponet
        -->
        <div class="footer-inner">
            <div class="footer-content">
                <div class="column">
                    <p class="column-title">社区</p>
                    <ul>
                        <li><a href="https://github.com/baidu/NoahV" target="_blank">Github仓库</a></li>
                        <li><a href="https://github.com/baidu/NoahV/issues" target="_blank">反馈建议</a></li>
                        <li><a href="https://noahv.cdn.bcebos.com/github%2Ff414efb2572218cd6756ca483.jpg" target="_blank">在线交流</a></li>
                        <li></li>
                    </ul>
                </div>

                <div class="column">
                    <p class="column-title">链接</p>
                    <ul>
                        <li><a href="http://aiops.baidu.com/" target="_blank">百度AIOps</a></li>
                        <li><a href="https://cloud.baidu.com/" target="_blank">百度智能云</a></li>
                    </ul>
                </div>
                <div class="copyright-content">
                    <div class="copyright">
                        ©2020 NoahV团队版权所有
                    </div>
                    <div class="icon-list">
                        <span class="wechat">
                            <span class="footer-icon">&#xe600;</span>
                            <div class="wechat-group">
                                <img src="https://noahv.cdn.bcebos.com/github%2Ff414efb2572218cd6756ca483.jpg" width="200px"/>
                            </div>
                        </span>
                        <a href="https://github.com/baidu/NoahV" target="_blank"><span class="footer-icon">&#xe732;</span></a>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'SaFooter'
};
</script>

<style lang="less">
    @font-face {
      font-family: 'footicon';
      src: url('../assets/icon/iconfont.eot');
      src: url('../assets/icon/iconfont.eot?#iefix') format('embedded-opentype'),
          url('../assets/icon/iconfont.woff2') format('woff2'),
          url('../assets/icon/iconfont.woff') format('woff'),
          url('../assets/icon/iconfont.ttf') format('truetype'),
          url('../assets/icon/iconfont.svg#iconfont') format('svg');
    }
    .footer-icon {
      font-family: "footicon" !important;
      font-size: 30px;

      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .github-link {
        position: fixed;
        top: 20px;
        right: 30px;
        color: #515a6e;
        z-index: 9999999;
        font-size: 14px;
        a {
            color: #555;
            &:hover {
                color: #2d8cf0;
            }
        }

    }
    .copyright-content {
        float: right;
        .wechat {
            margin-right: 10px;
            color: green;
            position: relative;
            .footer-icon {
                font-size: 34px;
            }
            .wechat-group {
                position: absolute;
                display: none;
                bottom: 40px;
                z-index: 999999;
                right: 10px;
                box-shadow: 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03);
            }
            &:hover {
                .wechat-group {
                    display: block;
                }
            }
        }
    }
    .copyright {
        font-size: 14px;
        line-height: 50px;
        text-align: center;
    }
    .footer-inner {
        text-align: center;
    }
    .footer-content {
        padding: 20px;
        width: 1000px;
        margin-bottom: 50px;
        display: inline-block;
        .column {
            float: left;
            width: 200px;
            .column-title {
                font-size: 18px;
                padding: 10px 0;
            }
            li {
                padding: 5px 0;
                a {
                    font-size: 15px;
                    color: #666;
                    &:hover {
                        color: #2d8cf0;
                    }
                }
            }
        }
    }
</style>
