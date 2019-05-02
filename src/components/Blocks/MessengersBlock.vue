<template>
    <div>
        <component v-if="messenger.isActive" :is="messenger.name" :data="messenger" v-for="messenger in data.messengers"></component>
    </div>
</template>

<script>
    import WhatsApp from '../../components/Messengers/WhatsApp'
    import Telegram from '../../components/Messengers/Telegram'
    import Vk from '../../components/Messengers/Vk'
    import Viber from '../../components/Messengers/Viber'
    import Facebook from '../../components/Messengers/Facebook'
    import Skype from '../../components/Messengers/Skype'
    import Line from '../../components/Messengers/Line'
    
    export default {
        
        name: 'messengers-block',
        data() {
            return {

            }
        },
        components: {
            WhatsApp,
            Telegram,
            Viber,
            Vk,
            Facebook,
            Line,
            Skype
        },
        props: ['data'],
    }
</script>

<style lang="scss">
</style>