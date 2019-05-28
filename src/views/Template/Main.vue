<template>
    <div class="screen">
        <div class="container">
            <b-row>
                <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 mx-auto">
                    <div class="block" v-for="(block, index) in blocks" :index="index" :key="index" :item="block">
                        <component :is="block.type" :data="block.data"></component>
                    </div>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
    
    import TextBlock from '../../components/Blocks/TextBlock'
    import ImagesBlock from '../../components/Blocks/ImagesBlock'
    import LinkBlock from '../../components/Blocks/LinkBlock'
    import SeparatorBlock from '../../components/Blocks/SeparatorBlock'
    import SocialLinksBlock from '../../components/Blocks/SocialLinksBlock'
    import VideoBlock from '../../components/Blocks/VideoBlock'
    import FAQBlock from '../../components/Blocks/FAQBlock'
    import MapBlock from '../../components/Blocks/MapBlock'
    import MessengersBlock from '../../components/Blocks/MessengersBlock'
    import CarouselBlock from '../../components/Blocks/CarouselBlock'
    import ShopBlock from '../../components/Blocks/ShopBlock'

    export default {
        data() {
            return {
            }
        },
        props: ['data'],
        computed: {
            blocks: {
                get() {
                    return this.$store.getters['blocks/getBlocks']
                },
                set(i) {
                    this.$store.commit('blocks/setBlocks', i)
                }
            },
        },
        components: {
            TextBlock,
            ImagesBlock,
            LinkBlock,
            SeparatorBlock,
            MapBlock,
            VideoBlock,
            FAQBlock,
            MessengersBlock,
            SocialLinksBlock,
            CarouselBlock,
            ShopBlock
        }
    }
</script>

<style scoped lang="scss">
    .block {
        padding: 10px 0;
    }
</style>