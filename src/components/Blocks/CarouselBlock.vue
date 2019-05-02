<template>
    <div>
        <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide">
            <b-carousel-slide :key="index" v-for="(image, index) in data.images" class="carousel-slide" :style="'background-image: url(' + image + ')'">
            </b-carousel-slide>
        </b-carousel>
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