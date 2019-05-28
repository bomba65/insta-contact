<template>
    <div>
        <h3>Наш Магазин</h3>

        <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide">
            <b-carousel-slide :caption="product.name" :key="index" v-for="(product, index) in data.products" class="carousel-slide" :style="'background-image: url(' + product.image + ')'">
            </b-carousel-slide>
        </b-carousel>

        <b-button :to="'/template/shop'" variant="primary" class="mt-3 w-100">Перейти в Магазин</b-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                slide: 0,
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