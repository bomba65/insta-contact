<template>
    <div>
        <component v-if="messenger.isActive" :is="messenger.name" :data="messenger" v-for="messenger in data.messengers"></component>
    </div>
</template>

<script>
    import WhatsApp from '../../components/Messengers/WhatsApp'
    import Telegram from '../../components/Messengers/Telegram'
    
    export default {
        
        name: 'messengers-block',
        data() {
            return {

            }
        },
        components: {
            WhatsApp,
            Telegram
        },
        props: ['data'],
    }
</script>

<style lang="scss">
</style>