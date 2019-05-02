<template>
    <div v-html="data.text" :class="data.align" :style="'font-size: ' + data.size">
      {{ data.text }}
    </div>
</template>

<script>
    export default {
        name: 'text-block',
        data() {
            return {

            }
        },
        props: ['data'],
        methods: {
        },
    }
</script>

<style scoped="">
</style>