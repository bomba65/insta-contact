<template>
    <div>
        <label>Код карты</label>
        <b-form-textarea
        placeholder=""
        v-model="data.mapCode"
        ></b-form-textarea>
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
    textarea {
        height: 200px;
    }
</style>