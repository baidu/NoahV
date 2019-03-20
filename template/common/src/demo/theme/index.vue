<template>
    <div>
        <Button type="error">noahv测试</Button><br/><br/>
        iview主题测试<br/>
        <Rate allow-half v-model="value" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 2
        };
    }
};
</script>
