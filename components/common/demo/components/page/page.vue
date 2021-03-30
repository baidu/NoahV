<template>
    <div style="width; 200px;">
        <nv-page :total="100" :page-size="10" /><br />
        <nv-page :total="100" size="small"/><br />
        <nv-page :total="100" :page-size="10" disabled /> <br />
        <nv-page :total="100" size="small" disabled/><br />
    </div>
</template>
<script>
export default {

};
</script>
