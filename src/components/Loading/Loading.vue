<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .loader-container {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
    }
    .loader {
        position: absolute;
        top: calc(50% - 35px);
        left: calc(50% - 35px);
        border: 5px solid #fff;
        border-top: 5px solid #20a8d8;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }
</style>

