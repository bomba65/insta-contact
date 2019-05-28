<template>
    <div :class="data.linkType">
        <component v-if="socialLink.isActive" :is="socialLink.componentName" :data="socialLink" v-for="(socialLink, index) in data.socialLinks" :key="index"></component>
    </div>
</template>

<script>

    import Facebook from '../../components/SocialLinks/Facebook'
    import Vk from '../../components/SocialLinks/Vk'
    import Instagram from '../../components/SocialLinks/Instagram'
    import Youtube from '../../components/SocialLinks/Youtube'
    import Twitter from '../../components/SocialLinks/Twitter'
    import Snapchat from '../../components/SocialLinks/Snapchat'
    
    export default {
        
        name: 'social-links-block',
        data() {
            return {

            }
        },
        props: ['data'],
        components: {
            Facebook,
            Vk,
            Snapchat,
            Twitter,
            Youtube,
            Instagram
        }
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