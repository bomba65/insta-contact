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
				<component :is="text"></component>
				<SortableList lockAxis="y" v-model="items" :useDragHandle="true">
					<SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" :text="text"/>
				</SortableList>

				<b-button type="button" variant="primary" @click="showModal = true" class="">Добавить новый блок</b-button>
			</div>
			<div class="home"></div>
			<div class="bottom-bar"></div>
		</div>
		<b-modal title="Добавить новый блок" size="lg" class="modal-primary" v-model="showModal">
			<b-row>
				<b-col sm="4" md="3" @click="swapModal(modal.tag)" v-for="modal in modalsArray">
					<b-card :header="modal.text" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-2x" :class="modal.icon"></i>
						</div>
					</b-card>
				</b-col>
				<b-col sm="4" md="3">
					<b-card header="Ссылка" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-link fa-2x"></i>
						</div>
					</b-card>
				</b-col>
				<b-col sm="4" md="3">
					<b-card header="Аватар" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-user-circle-o fa-2x"></i>
						</div>
					</b-card>
				</b-col>
				<b-col sm="4" md="3">
					<b-card header="Текстовый блок" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-font fa-2x"></i>
						</div>
					</b-card>
				</b-col>
				<b-col sm="4" md="3">
					<b-card header="Текстовый блок" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-font fa-2x"></i>
						</div>
					</b-card>
				</b-col>
				<b-col sm="4" md="3">
					<b-card header="Текстовый блок" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-font fa-2x"></i>
						</div>
					</b-card>
				</b-col>
				<b-col sm="4" md="3">
					<b-card header="Текстовый блок" class="text-center">
						<div class="d-flex justify-content-center align-content-center">
							<i class="fa fa-font fa-2x"></i>
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

import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort';
import TextBlockModal from '../../components/BlockModals/TextBlockModal'
import AvatarBlockModal from '../../components/BlockModals/AvatarBlockModal'

import TextBlock from '../../components/Blocks/TextBlock'

const SortableList = {
	mixins: [ContainerMixin],
	template: `
	<div class="blocks-list">
	<slot />
	</div>
	`
};

const SortableItem = {
	mixins: [ElementMixin],
	props: ['item', 'text'],
	directives: { handle: HandleDirective },
	template: `
	<div class="blocks-list-item" style="z-index: 3;">
	<div class="block-text">
	<div v-handle class="block-handle"><span></span></div>
	{{item}}
	<component :is="text"></component>
	</div>
	</div>
	`
};

export default {
	name: 'Pages',
	data() {
		return {
			text: 'TextBlock',
			showModal: false,
			currentModal: null,
    		modalsArray: [
    			{
    				tag: 'TextBlockModal',
    				text: 'Текст',
    				icon: 'fa-font'
    			},
    			{
    				tag: 'AvatarBlockModal',
    				text: 'Аватар',
    				icon: 'fa-user-circle-o'
    			}
    		],
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
		};
	},
	components: {
		SortableItem,
		SortableList,
		TextBlockModal,
		AvatarBlockModal,
		TextBlock,
	},
	methods: {
        handleShowModal(event, value) {
            this.showModal = true
            this.currentModal = null
        },
        handleHideModal(event, value) {
            this.currentModal = null
            console.log('asd')
        },
        swapModal(modal) {
	    	this.currentModal = modal
	    }
    },
}
</script>

<style lang='scss'>
</style>