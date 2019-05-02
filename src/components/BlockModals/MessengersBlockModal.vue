<template>
    <b-modal title="Мессенджеры" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Ссылки" active>
          <b-row>
            <b-col sm="12">
                <label>Вид ссылок</label>
                <b-form-select
                    :plain="true"
					class="mb-3"
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
              <SortableList lockAxis="y" v-model="block.data.messengers" :useDragHandle="true">
                <SortableItem v-for="(messenger, index) in block.data.messengers" :index="index" :key="index" :item="messenger"/>
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
            @click="deleteBlock"
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
            @click="editBlock"
            v-if="updateBlock"
          >
            Сохранить
          </b-button>
          <b-button
            variant="primary"
            class="float-right"
            @click="addBlock"
            v-else
          >
            Сохранить
          </b-button>
      </div>
    </b-modal>
</template>

<script>
    import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
    
    import WhatsAppForm from '../../components/Messengers/WhatsAppForm'
    import TelegramForm from '../../components/Messengers/TelegramForm'
    import ViberForm from '../../components/Messengers/ViberForm'
    import VkForm from '../../components/Messengers/VkForm'
    import FacebookForm from '../../components/Messengers/FacebookForm'
    import SkypeForm from '../../components/Messengers/SkypeForm'
    import LineForm from '../../components/Messengers/LineForm'

    const SortableList = {
        mixins: [ContainerMixin],
        template: `
        <div class="form-fields-item-list">
        <slot />
        </div>
        `
    }

    const SortableItem = {
        mixins: [ElementMixin],
        props: ['item'],
        directives: { handle: HandleDirective },
        components: {
          WhatsAppForm,
          TelegramForm,
          ViberForm,
          LineForm,
          SkypeForm,
          VkForm,
          FacebookForm
        },
        template: `
		<div class="form-fields-item">
			<div class="form-fields-item-header py-3">
                <div v-handle class="form-fields-item-handle"><span></span></div>
                <span>
                    {{ item.name }}
				</span>
				<b-form-checkbox v-model="item.isActive" switch class="custom-control custom-switch mr-3">
				</b-form-checkbox>
            </div>

            <div class="form-fields-item-body" v-if="item.isActive">
                <component :is="item.componentName" :data="item"></component>
            </div>
        </div>
        `
    }

    export default {
        name: 'text-block-modal',
        data() {
            return {
				showModal: true,
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
                    {
                      componentName: 'WhatsAppForm', 
                      name: 'WhatsApp',
                      linkText: '',
                      phoneNumber: '',
                      templateText: '',
                      isActive: false
                    },
                    {
                      componentName: 'ViberForm',
                      name: 'Viber',
                      linkText: '',
                      phoneNumber: '',
                      isActive: false
                    },
                    {
                      componentName: 'TelegramForm',
                      name: 'Telegram',
                      linkText: '',
                      userName: '',
                      isActive: false
                    },
                    {
                      componentName: 'FacebookForm',
                      name: 'Facebook Messenger',
                      linkText: '',
                      userName: '',
                      isActive: false
                    },
                    {
                      componentName: 'VkForm',
                      name: 'ВКонтакте',
                      linkText: '',
                      userName: '',
                      isActive: false
                    },
                    {
                      componentName: 'SkypeForm',
                      name: 'Skype',
                      linkText: '',
                      userName: '',
                      isActive: false
                    },
                    {
                      componentName: 'LineForm',
                      name: 'Line',
                      linkText: '',
                      userName: '',
                      isActive: false
                    }
                  ]
                }
            }),
          },
          updateBlock: {
            default: false
          },
          indexOfBlock: {
            default: 0
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
            editBlock() {
              this.$store.commit('blocks/editBlock', { block: this.block, index: this.indexOfBlock})
              this.$emit('close')
            },
            deleteBlock() {
              this.$store.commit('blocks/deleteBlock', this.indexOfBlock)
              this.$emit('close')
            }
        },
    }
</script>

<style scoped="">
</style>