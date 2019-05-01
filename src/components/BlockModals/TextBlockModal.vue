<template>
    <b-modal title="Текст" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Текст" active>
          <b-row>
            <b-col sm="6">
              <b-form-group >
                <label>Размер текста</label>
                <b-form-select
                  :plain="true"
                  v-model="block.data.size"
                  :options="[
                  {
                    text: 'Маленький размер',
                    value: '14px'
                    }, {
                    text: 'Средний размер',
                    value: '16px'
                    }, {
                    text: 'Большой размер',
                    value: '20px'
                    }]">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group >
                <label>Выравнивание</label>
                <b-form-select
                  :plain="true"
                  v-model="block.data.align"
                  :options="[
                  {
                    text: 'По левому краю',
                    value: 'text-left'
                    }, {
                    text: 'По центру',
                    value: 'text-center'
                    }, {
                    text: 'По правому краю',
                    value: 'text-right'
                    }]">
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <label for="textarea-default">Текст</label>
            </b-col>
            <b-col sm="12">
              <b-form-textarea
                id="textarea-default"
                placeholder=""
                v-model="block.data.text"
              ></b-form-textarea>
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
              type: 'TextBlock',
              data: {
                text: '',
                size: '14px',
                align: 'text-left',
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
    }
</script>

<style scoped="">
</style>