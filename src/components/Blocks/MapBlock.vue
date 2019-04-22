<template>
    <div class="map-block" v-html="data.mapCode">
    </div>
</template>

<script>
    export default {
        name: 'map-block',
        data() {
            return {

            }
        },
        props: ['data'],
        methods: {
        },
    }
</script>

<style lang="scss">
    .map-block iframe {
        width: 100% !important;
        height: 200px !important;
    }
</style>