<template>
    <div>
        <div v-html="data.mapCode">
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: ['data'],
    }
</script>

<style scoped>
</style>