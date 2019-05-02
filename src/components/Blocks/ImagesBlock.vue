<template>
    <div>
       <img
        :src="image"
        class="img-thumbnail"
        :key="index"
        v-for="(image, index) in data.images"
        alt="admin@bootstrapmaster.com" />
    </div>
</template>

<script>
    export default {
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
    img {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
</style>