<template>
    <div>
       <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        :style="'width: ' + data.size + 'px'"
        alt="admin@bootstrapmaster.com" />
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

<style scoped>
    div {
        text-align: center;
    }
</style>