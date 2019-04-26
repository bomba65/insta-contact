<template>
	<section class="section-pages">
		<div class="container-fluid">
			<div class="form-control-link mb-5">
					<div class="form-control-link-text">
						<span class="mr-3 d-md-inline d-none">Моя ссылка:</span>
						<b-link :href="'http://localhost:8080/#/pages/link1'"><span class="d-sm-inline d-none">http://localhost:8080/#/</span>{{ selectedPage }}</b-link>
					</div>
					<div>
						<b-button type="button" variant="primary" @click="showLinkEditModal = true">Редактировать</b-button>
					</div>
			</div>
		</div>

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

				<b-button type="button" variant="primary" @click="showModal = true">Добавить новый блок</b-button>
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

		<b-modal title="Настройка ссылки" size="lg" class="modal-primary block-modal-cards" v-model="showLinkEditModal">
			<div>
				<label>Ваша ссылка</label>
				<b-form-input type="text" v-model="newLink" placeholder=""></b-form-input>
			</div>
			<div slot="modal-footer" class="w-100">
		        <b-button
		          variant="secondary"
		          class="float-right"
		          @click="showLinkEditModal=false"
		        >
		          Закрыть
		        </b-button>
		      </div>
		</b-modal>
		<component :is="currentModal" @go-back="handleShowModal"  @close="handleHideModal"></component>
	</section>
</template>

<script>

import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
import TextBlockModal from '../../components/BlockModals/TextBlockModal'
import AvatarBlockModal from '../../components/BlockModals/AvatarBlockModal'
import LinkBlockModal from '../../components/BlockModals/LinkBlockModal'
import SeparatorBlockModal from '../../components/BlockModals/SeparatorBlockModal'
import SocialLinksBlockModal from '../../components/BlockModals/SocialLinksBlockModal'
import VideoBlockModal from '../../components/BlockModals/VideoBlockModal'
import FAQBlockModal from '../../components/BlockModals/FAQBlockModal'
import MapBlockModal from '../../components/BlockModals/MapBlockModal'
import MessengersBlockModal from '../../components/BlockModals/MessengersBlockModal'

import TextBlock from '../../components/Blocks/TextBlock'
import AvatarBlock from '../../components/Blocks/AvatarBlock'
import LinkBlock from '../../components/Blocks/LinkBlock'
import SeparatorBlock from '../../components/Blocks/SeparatorBlock'
import SocialLinksBlock from '../../components/Blocks/SocialLinksBlock'
import VideoBlock from '../../components/Blocks/VideoBlock'
import FAQBlock from '../../components/Blocks/FAQBlock'
import MapBlock from '../../components/Blocks/MapBlock'
import MessengersBlock from '../../components/Blocks/MessengersBlock'

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
	props: ['item'],
	directives: { handle: HandleDirective },
	components: {
		TextBlock,
		AvatarBlock,
		LinkBlock,
		SeparatorBlock,
		MapBlock,
		VideoBlock,
		FAQBlock,
		MessengersBlock,
		SocialLinksBlock,
	},
	template: `
	<div class="blocks-list-item" style="z-index: 3;">
		<div class="block-text">
		<div v-handle class="block-handle"><span></span></div>
			<component :is="item.type" :data="item.data"></component>
		</div>
	</div>
	`
};

export default {
	name: 'Pages',
	data() {
		return {
			showModal: false,
			showLinkEditModal: false,
			newLink: '',
			currentModal: null,
    		modalsArray: [
    			{
    				tag: 'TextBlockModal',
    				text: 'Текст',
    				icon: 'fa-font'
    			},
    			{
    				tag: 'LinkBlockModal',
    				text: 'Ссылка',
    				icon: 'fa-link'
    			},
    			{
    				tag: 'SeparatorBlockModal',
    				text: 'Разделитель',
    				icon: 'fa-minus'
    			},
    			{
    				tag: 'AvatarBlockModal',
    				text: 'Аватар',
    				icon: 'fa-user-circle-o'
    			},
    			{
    				tag: 'FAQBlockModal',
    				text: 'Вопросы и ответы',
    				icon: 'fa-question'
    			},
    			{
    				tag: 'MessengersBlockModal',
    				text: 'Месссенджеры',
    				icon: 'fa-comments-o'
    			},
    			{
    				tag: 'VideoBlockModal',
    				text: 'Видео',
    				icon: 'fa-play-circle'
					},
    			{
    				tag: 'CarouselBlockModal',
    				text: 'Карусель картинок',
    				icon: 'fa-image'
    			},
    			{
    				tag: 'SocialLinksBlockModal',
    				text: 'Социальные сети',
    				icon: 'fa-share-alt'
    			},
    			{
    				tag: 'MapBlockModal',
    				text: 'Карта',
    				icon: 'fa-map-marker'
    			},
    		],
		};
	},
	components: {
		SortableItem,
		SortableList,
		TextBlockModal,
		AvatarBlockModal,
		LinkBlockModal,
		SeparatorBlockModal,
		MapBlockModal,
		MessengersBlockModal,
		VideoBlockModal,
		FAQBlockModal,
		SocialLinksBlockModal
	},
	computed: {
		pages: {
			get() {
				return this.$store.getters['pages/getPages']
			}
		},
		selectedPage: {
			get() {
				return this.$store.getters['pages/getSelectedPage']
			}
		},
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
	.form-control-link {
		display: flex;
		font-size: 16px;
		padding: 0.5rem 1rem;
		justify-content: space-between;
		align-items: center;
	}
</style>