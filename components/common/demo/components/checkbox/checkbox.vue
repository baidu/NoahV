<template>
    <div>
        <NvCheckbox v-model="value1" @on-change="change">checkbox</NvCheckbox>
        <NvCheckbox v-model="value2" :partial="true" @on-change="change">checkbox</NvCheckbox>
        <NvCheckbox v-model="value3" :disabled="true">checkbox</NvCheckbox>
        <NvCheckbox v-model="value4" :disabled="true">checkbox</NvCheckbox>
        <NvCheckbox v-model="value5" :disabled="true" :partial="true">checkbox</NvCheckbox>
    </div>
</template>

<script>
export default {
    name: 'checkboxDemo',
    data() {
        return {
            value1: false,
            value2: false,
            value3: false,
            value4: true,
            value5: false
        }
    },
    methods: {
        change(val, event) {
            console.log(this.value2);
        }
    }
};
</script>


