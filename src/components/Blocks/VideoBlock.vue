<template>
    <div>
        <iframe
            :src="data.link">
        </iframe>
    </div>
</template>

<script>
    export default {
        name: 'video-block',
        data() {
            return {

            }
        },
        props: ['data'],
        methods: {
        },
    }
</script>

<style scoped>
    iframe {
        border: 0;
        width: 100%;
        height: 200px;
    }
</style>