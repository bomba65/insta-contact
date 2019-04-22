<template>
    <b-modal title="Карта" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Карта" active>
          <b-row>
            <b-col sm="12">
              <label for="textarea-default">Код карты</label>
            </b-col>
            <b-col sm="12">
              <b-form-textarea
                id="textarea-default"
                placeholder=""
                v-model="block.data.mapCode"
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
              type: 'MapBlock',
              data: {
                mapCode: '',
              }
            }),
          },
          updateBlock: {
            default: false
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