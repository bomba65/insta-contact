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
              type: 'VideoBlock',
              data: {
				  site: 'https://www.youtube.com/embed/',
				  embed: '',
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
    }
</script>

<style scoped="">
</style>