<template>
    <div class="demo-container">
        <ul>
            <li><router-link to="/nvbillboard">nvbillboard</router-link></li>
            <li><router-link to="/nvcircle">nvcircle</router-link></li>
            <li><router-link to="/nvtrend">nvtrend</router-link></li>
            <li><router-link to="/nvreport">nvreport</router-link></li>
            <li><router-link to="/nveventriver">nveventriver</router-link></li>
            <li><router-link to="/nvbubble">nvbubble</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {};
    }
};
</script>
<style lang="less">
    @import "../src/assets/css/index.less";
</style>
<style lang="less" >
.demo-container {
    padding: 20px 40px;
    margin-bottom: 40px;
    & > ul { display: flex; flex-wrap: wrap; margin-bottom: 30px;}
    & > ul > li {
        display: inline-block; margin-right: 20px; font-size: 14px; min-width: 90px;margin-bottom: 20px;
    }
    & > ul > li:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}

</style>
