<template>
    <div class="noahv-layout-logo">
        <template v-if="logo.hasLogo">
            <template>
                <a :href="logo.link || '/'">
                    <img :src="logo.src" :title="logo.title" /></a>
                </a>
            </template>
        </template>
        <template v-else>
            {{logo.title}}
        </template>
    </div>
</template>

<script>
export default {
    name: 'Logo',
    props: ['logo']
};
</script>
