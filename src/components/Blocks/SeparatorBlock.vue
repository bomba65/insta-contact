<template>
    <div :style="'height: ' + data.margin + 'px'">
        <hr class="w-100 m-0">
    </div>
</template>

<script>
    export default {
        name: 'separator-block',
        data() {
            return {

            }
        },
        props: ['data'],
        methods: {
        },
    }
</script>

<style scoped lang="scss">
    div {
        height: 30px;
        display: flex;
        align-items: center;
    }
</style>