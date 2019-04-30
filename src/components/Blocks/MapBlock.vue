<template>
    <component :is="data.mapName" :data="data.mapData"></component>
</template>

<script>
    import GoogleMap from '../../components/Maps/GoogleMap'
	import TwoGisMap from '../../components/Maps/TwoGisMap'
    import YandexMap from '../../components/Maps/YandexMap'
    
    export default {
        name: 'map-block',
        data() {
            return {

            }
        },
        props: ['data'],
        components: {
            GoogleMap,
            YandexMap,
            TwoGisMap
        },
    }
</script>

<style lang="scss">
    .map-block iframe {
        width: 100% !important;
        height: 200px !important;
    }
</style>