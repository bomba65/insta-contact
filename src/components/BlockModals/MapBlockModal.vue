<template>
    <b-modal title="Карта" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
		<b-tabs>
			<b-tab title="Карта" active>
			<b-row>
				<b-col sm="12">
					<label>Выберите карту</label>
					<b-form-select
						:plain="true"
						v-model="block.data.mapName"
						@change="block.data.mapData = {markers: [],mapCode: ''}"
						:options="[
						{
						text: 'Google карта',
						value: 'GoogleMap'
						}, {
						text: 'Яндекс карта',
						value: 'YandexMap'
						}, {
						text: '2gis карта',
						value: 'TwoGisMap'
						}]">
					</b-form-select>
					<div class="map mt-4">
						<component :is="block.data.mapName + 'Form'" :data="block.data.mapData"></component>
					</div>
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
	import GoogleMapForm from '../../components/Maps/GoogleMapForm'
	import TwoGisMapForm from '../../components/Maps/TwoGisMapForm'
	import YandexMapForm from '../../components/Maps/YandexMapForm'
	
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
					mapName: 'GoogleMap',
					mapData: {
						markers: [],
						mapCode: ''
					}
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
		components: {
			GoogleMapForm,
			TwoGisMapForm,
			YandexMapForm
    	}
  }
</script>
