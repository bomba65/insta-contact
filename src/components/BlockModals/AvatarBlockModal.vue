<template>
    <b-modal title="Аватар" size="lg" class="modal-primary" v-model="showModal" @hidden="$emit('close')">
        <b-row class="mt-2">
            <b-col sm="12">
              <b-form-group >
                <label>Размер аватара</label>
                <b-form-select
                  :plain="true"
                  v-model="block.data.size"
                  :options="[
                  {
                    text: 'Маленький размер (65x65)',
                    value: '65'
                    }, {
                    text: 'Средний размер (95x95)',
                    value: '95'
                    }, {
                    text: 'Большой размер (125x125)',
                    value: '125'
                    }]">
                </b-form-select>
              </b-form-group>
            </b-col>
        </b-row>
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
              type: 'AvatarBlock',
              data: {
                size: '65'
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