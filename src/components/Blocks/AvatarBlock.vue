<template>
    <div :class="data.size">
       <img
        src="img/avatars/6.jpg"
        class="img-avatar"
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

<style scoped="">
</style>