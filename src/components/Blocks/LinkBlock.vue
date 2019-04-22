<template>
    <a :href="data.link" class="link-block">
        <span class="title">{{ data.title }}</span>
        <span class="subtitle">{{ data.subtitle }}</span>
    </a>
</template>

<script>
    export default {
        name: 'link-block',
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
    .link-block {
        padding: 15px;
        display: block;
        background: #eee;

        &:hover {
            text-decoration: none;
        }

        span {
            display: block;
            color: #000;
            text-align: center;
        }

        .title {
            font-size: 18px;
        }
    }
</style>