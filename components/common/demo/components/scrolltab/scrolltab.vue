<template>
  <NvScrollTab
    v-model='arr'
    label='name'
    scrollSpeed='middle'
    disabled
  />
</template>

<script>
export default {
    data() {
        return {
            arr: []
        };
    },
    mounted() {
        for (let i in new Array(45).fill(null)) {
            this.arr.push({name: `rule${parseInt(i) + 1}`});
        }
    }
};
</script>

<style>

</style>
