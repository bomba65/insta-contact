<template>
    <b-modal title="Мессенджеры" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Ссылки" active>
          <b-row>
            <b-col sm="12">
                <label>Вид ссылок</label>
                <b-form-select
                    :plain="true"
                    v-model="block.data.linkType"
                    :options="[
                    {
                    text: 'Иконки приложений',
                    value: 'icon'
                    }, {
                    text: 'Ссылки на всю ширину без оформления',
                    value: 'default'
                    }, {
                    text: 'Ссылки на всю ширину с оформлением',
                    value: 'block'
                    }]">
                </b-form-select>
            </b-col>

            <b-col>
                <SortableList lockAxis="y" v-model="messengers" :useDragHandle="true">
					<SortableItem v-for="(messenger, index) in messengers" :index="index" :key="index" :item="messenger"/>
				</SortableList>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Настройки"></b-tab>
      </b-tabs>
      <div slot="modal-footer" class="w-100">
          <b-button
            v-if="updateBlock"
            variant="danger"
            class="float-left align-items-center"
            @click="goBack"
          >
              <i class="fa fa-lg fa-trash-o mr-2"></i>
              <span>Удалить</span>
          </b-button>
          <b-button
            v-else
            variant="secondary"
            class="float-left align-items-center"
            @click="goBack"
          >
              <i class="fa fa-lg fa-angle-left mr-2"></i>
              <span>Назад</span>
          </b-button>
          <b-button
            variant="primary"
            class="float-right"
            @click="addBlock"
          >
            Сохранить
          </b-button>
      </div>
    </b-modal>
</template>

<script>
    import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
    
    import WhatsAppForm from '../../components/Messengers/WhatsAppForm'

    const SortableList = {
        mixins: [ContainerMixin],
        template: `
        <div class="messengers-list">
        <slot />
        </div>
        `
    }

    const SortableItem = {
        mixins: [ElementMixin],
        props: ['item'],
        directives: { handle: HandleDirective },
        template: `
        <div class="messengers-list-item">
            <div class="block-text">
            <div v-handle class="block-handle"><span></span></div>
                {{ item.name }}
                <div v-html="item.html"></div>
            </div>
        </div>
        `
    }

    export default {
        name: 'text-block-modal',
        data() {
            return {
                showModal: true,
                messengers: [
                    {
                        name: 'WhatsApp',
                        html : `<div>{{ item.name }}</div>`
                    },
                    {
                        name: 'Telegram',
                        html : '<div>{{ item.name }}</div>'
                    },
                    {
                        name: 'ВКонтакте',
                        html : '<div>{{ item.name }}</div>'
                    },
                    {
                        name: 'Viber',
                        html : '<div>{{ item.name }}</div>'
                    },
                    {
                        name: 'Skype',
                        html : '<div>{{ item.name }}</div>'
                    },
                ]
            }
        },
        props: {
          block: {
            type: Object,
            default: () => ({
              type: 'MessengersBlock',
              data: {
                linkType: 'default',
                messengers: [
                ]
              }
            }),
          },
          updateBlock: {
            default: false
          }
        },
        components: {        
            SortableItem,
            SortableList,
        },
        methods: {
            goBack() {
                this.$emit('go-back');
            },
            addBlock() {
                this.$store.commit('blocks/addBlock', this.block)
                this.$emit('close')
            },
        },
        computed: {
            
        },
        mounted() {
            
        },
        beforeDestroy() {
            
        }
    }
</script>

<style scoped="">
</style>