<template>
    <div>
        <a v-for="socialLink in data.socialLinks" v-if="socialLink.isActive" :href="socialLink.link" target="_blank">{{ socialLink.linkText }}</a>
    </div>
</template>

<script>
    
    export default {
        
        name: 'social-links-block',
        data() {
            return {

            }
        },
        props: ['data'],
    }
</script>

<style scoped lang="scss">
    a {
        display: block;
    }
</style>