<template>
	<section class="section-pages">
		<div class="marvel-device iphone6 mx-auto">
			<div class="top-bar"></div>
			<div class="sleep"></div>
			<div class="volume"></div>
			<div class="camera"></div>
			<div class="sensor"></div>
			<div class="speaker"></div>
			<div class="screen page">
				<SortableList lockAxis="y" v-model="blocks" :useDragHandle="true">
					<SortableItem v-for="(block, index) in blocks" :index="index" :key="index" :item="block"/>
				</SortableList>

				<b-button type="button" variant="primary" @click="showModal = true" class="">Добавить новый блок</b-button>
			</div>
			<div class="home"></div>
			<div class="bottom-bar"></div>
		</div>
		<b-modal title="Добавить новый блок" size="lg" class="modal-primary block-modal-cards" v-model="showModal">
			<b-row>
				<b-col class="block-modal-card" sm="4" md="3" @click="swapModal(modal.tag)" v-for="modal in modalsArray">
					<b-card :header="modal.text" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-2x" :class="modal.icon"></i>
						</div>
					</b-card>
				</b-col>
			</b-row>
			<div slot="modal-footer" class="w-100">
		        <b-button
		          variant="secondary"
		          class="float-right"
		          @click="showModal=false"
		        >
		          Закрыть
		        </b-button>
		      </div>
		</b-modal>
		<component :is="currentModal" @go-back="handleShowModal"  @close="handleHideModal"></component>
	</section>
</template>

<script>

export default {
	name: 'WhatsAppForm',
	data() {
		return {
			showForm: false,
		};
	},
	components: {
	},
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
	methods: {
        handleShowModal(event, value) {
            this.showModal = true
            this.currentModal = null
        },
        handleHideModal(event, value) {
            this.currentModal = null
        },
        swapModal(modal) {
					this.currentModal = modal
				}
    },
}
</script>

<style lang='scss'>
</style>