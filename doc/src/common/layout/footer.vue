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
        <div class="copyright">
            ©2019 NoahV团队
        </div>
    </div>
</template>

<script>
export default {
    name: 'SaFooter'
};
</script>

<style lang="less">
    .github-link {
        position: fixed;
        top: 20px;
        right: 30px;
        color: #fff;
        z-index: 9999999;
        font-size: 14px;
        a {
            color: #fff;
            &:hover {
                color: #fff;
            }
        }

    }
    .copyright {
        line-height: 50px;
        text-align: center;
    }
</style>
