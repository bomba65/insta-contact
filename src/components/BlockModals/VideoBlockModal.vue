<template>
    <b-modal title="Видео" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Видео" active>
          <label>Ссылка на видео в</label>
          <b-form-select
            class="mb-3"
            :plain="true"
            v-model="block.data.site"
            :options="[
            {
            text: 'Youtube',
            value: 'https://www.youtube.com/embed/'
            }, {
            text: 'Vimeo',
            value: 'https://player.vimeo.com/video/'
            }]">
          </b-form-select>

          <label>Embed код</label>
          <b-form-input type="text" v-model="block.data.embed" placeholder=""></b-form-input>

          <b-alert class="mt-3" show variant="warning" v-if="block.data.site == 'https://www.youtube.com/embed/'">
            <div>Вставьте часть ссылки после знака равно</div>
            <div>https://www.youtube.com/watch?v=<span class="font-weight-bold text-danger">8pVePnxq3G0</span></div>
          </b-alert>
          <b-alert class="mt-3" show variant="warning" v-else-if="block.data.site == 'https://player.vimeo.com/video/'">
            <div>Вставьте часть ссылки после знака "/"</div>
            <div>https://vimeo.com/<span class="font-weight-bold text-danger">24311515</span></div>
          </b-alert>
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
              type: 'VideoBlock',
              data: {
				        site: 'https://www.youtube.com/embed/',
				        embed: '',
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