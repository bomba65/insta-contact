<template>
    <b-modal title="Ссылка" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Ссылка" active>
          <b-row>
            <b-col sm="12">
                <label>Текст ссылки</label>
                <b-form-input type="text" v-model="block.data.title" placeholder="Заголовок"></b-form-input>
                <b-form-input type="text" v-model="block.data.subtitle" placeholder="Подзаголовок" class="mt-2"></b-form-input>
            </b-col>
            <b-col sm="12" class="mt-3">
                <label>Открыть сайт</label>
            </b-col>
            <b-col sm="4">
                <b-form-select
                    :plain="true"
                    v-model="block.data.linkType"
                    :options="[
                    {
                    text: 'Открыть сайт',
                    value: ''
                    }, {
                    text: 'Отправить эл.письмо',
                    value: 'mailto: '
                    }, {
                    text: 'Позвонить',
                    value: 'tel: '
                    }]">
                </b-form-select>
            </b-col>
            <b-col sm-8>
                <b-form-input v-if="block.data.linkType == ''" type="text" v-model="block.data.link" placeholder="http://"></b-form-input>
                <b-form-input v-if="block.data.linkType == 'mailto: '" type="text" v-model="block.data.link" placeholder="example@example.com"></b-form-input>
                <b-form-input v-if="block.data.linkType == 'tel: '" type="text" v-model="block.data.link" placeholder="+7 775 777 77 77"></b-form-input>
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
              type: 'LinkBlock',
              data: {
                title: '',
                subtitle: '',
                linkType: '',
                link: '',
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