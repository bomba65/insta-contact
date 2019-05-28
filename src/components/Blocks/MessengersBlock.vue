<template>
    <div :class="data.linkType">
        <component v-if="messenger.isActive" :is="messenger.componentName" :data="messenger" v-for="(messenger, index) in data.messengers" :key="index"></component>
    </div>
</template>

<script>
    import WhatsApp from '../../components/Messengers/WhatsApp'
    import Telegram from '../../components/Messengers/Telegram'
    import Vk from '../../components/Messengers/Vk'
    import Viber from '../../components/Messengers/Viber'
    import Facebook from '../../components/Messengers/Facebook'
    import Skype from '../../components/Messengers/Skype'
    
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
            Skype
        },
        props: ['data'],
    }
</script>

<style lang="scss" scoped>
    div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        & /deep/ a {
            width: 100%;
            color: #fff;
            display: flex;
            padding: 10px;
            margin-bottom: 10px;
            align-items: center;
            justify-content: center;
            
            i {
                margin-right: 10px;
            }
        }

        &.compact {

            & /deep/ a {
                width: 31%;
                span {
                    display: none;
                }
                
                i {
                    margin-right: 0;
                }
            }
        }
    }
</style>