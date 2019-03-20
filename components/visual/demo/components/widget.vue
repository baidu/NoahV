<template>
    <div class="hello">
        <NvMDEventRiverView :url="url" :type="type" :params="param" />
        <NvMDEventRiverView :url="url" :params="param" />
        <NvMDCustomBox :url="customUrl" params="param" />
    </div>
</template>

<script>
export default {
    name: 'widget',
    data() {
        const param = {
            start: '2017-08-24 15:41:00',
            end: '2017-08-24 17:51:00'
        };
        return {
            msg: 'Welcome to Your Vue.js App',
            param: param,
            url: '/mock/eventlist',
            type: 'list',
            customUrl: '/mock/customBox'
        };
    }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
