<template>
	<section class="section-pages">
		<div class="container-fluid">
			<div class="form-control-link mb-md-5 mb-3">
					<div class="form-control-link-text">
						<span class="mr-3 d-md-inline d-none">Моя ссылка:</span>
						<b-link :to="'/template'"><span class="d-sm-inline d-none">http://localhost:8080/#/{{ $route.params.link }}/</span>{{ $route.params.page }}</b-link>
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
			<div class="screen page" :class="design">
				<SortableList lockAxis="y" v-model="blocks" :useDragHandle="true">
					<SortableItem v-for="(block, index) in blocks" :index="index" :key="index" :item="block" @edit-modal="editModal(index)"/>
				</SortableList>

				<b-button type="button" variant="primary" class="mx-auto d-block" @click="showModal = true">Добавить новый блок</b-button>
			</div>
			<div class="home"></div>
			<div class="bottom-bar"></div>
		</div>
		<b-modal title="Добавить новый блок" size="lg" class="modal-primary block-modal-cards" v-model="showModal">
			<b-row>
				<b-col class="block-modal-card" sm="4" md="3" @click="swapModal(modal.tag)" v-for="(modal, index) in modalsArray" :key="index">
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
				<b-link class="d-block mb-3" href="javascript:void(0)"><span class="d-sm-inline d-none">http://localhost:8080/#/{{ mainLink }}/{{ pageLink }}</span></b-link>

				<label>Ваша главная ссылка</label>
				<b-form-input class="mb-3" type="text" v-model="mainLink" placeholder=""></b-form-input>

				<label>Cсылка страницы</label>
				<b-form-input type="text" v-model="pageLink" placeholder=""></b-form-input>
			</div>
			<div slot="modal-footer" class="w-100">
		        
          <b-button
            variant="danger"
            class="float-left align-items-center"
            @click="deleteLink"
          >
              <i class="fa fa-lg fa-trash-o mr-2"></i>
              <span>Удалить</span>
          </b-button>

          <b-button
            variant="primary"
            class="float-right"
            @click="setLink"
          >
            Сохранить
          </b-button>
		  </div>
		</b-modal>
		<component :is="currentModal" @go-back="handleShowModal"  @close="handleHideModal"></component>
		<component v-if="editBlock.type" :is="editBlock.type + 'Modal'" @go-back="handleShowModal"  @close="handleHideModal" :updateBlock="true" :block="editBlock" :indexOfBlock="editBlockIndex"></component>
	</section>
</template>

<script>

import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'

import TextBlockModal from '../../components/BlockModals/TextBlockModal'
import ImagesBlockModal from '../../components/BlockModals/ImagesBlockModal'
import LinkBlockModal from '../../components/BlockModals/LinkBlockModal'
import SeparatorBlockModal from '../../components/BlockModals/SeparatorBlockModal'
import SocialLinksBlockModal from '../../components/BlockModals/SocialLinksBlockModal'
import VideoBlockModal from '../../components/BlockModals/VideoBlockModal'
import FAQBlockModal from '../../components/BlockModals/FAQBlockModal'
import MapBlockModal from '../../components/BlockModals/MapBlockModal'
import MessengersBlockModal from '../../components/BlockModals/MessengersBlockModal'
import CarouselBlockModal from '../../components/BlockModals/CarouselBlockModal'
import ShopBlockModal from '../../components/BlockModals/ShopBlockModal'

import TextBlock from '../../components/Blocks/TextBlock'
import ImagesBlock from '../../components/Blocks/ImagesBlock'
import LinkBlock from '../../components/Blocks/LinkBlock'
import SeparatorBlock from '../../components/Blocks/SeparatorBlock'
import SocialLinksBlock from '../../components/Blocks/SocialLinksBlock'
import VideoBlock from '../../components/Blocks/VideoBlock'
import FAQBlock from '../../components/Blocks/FAQBlock'
import MapBlock from '../../components/Blocks/MapBlock'
import MessengersBlock from '../../components/Blocks/MessengersBlock'
import CarouselBlock from '../../components/Blocks/CarouselBlock'
import ShopBlock from '../../components/Blocks/ShopBlock'

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
		ImagesBlock,
		LinkBlock,
		SeparatorBlock,
		MapBlock,
		VideoBlock,
		FAQBlock,
		MessengersBlock,
		SocialLinksBlock,
		CarouselBlock,
		ShopBlock
	},
	template: `
	<div class="blocks-list-item" style="z-index: 3;">
		<div v-handle class="block-handle"><i class="icon-menu icons d-block"></i></div>
		<div class="block-text">
			<div class="block-edit" @click="$emit('edit-modal')"></div>
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
			mainLink: this.$route.params.link,
			pageLink: this.$route.params.page,
			currentModal: null,
			currentEditModal: null,
			editBlock: {},
			editBlockIndex: null,
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
					tag: 'ImagesBlockModal',
					text: 'Изображения',
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
				{
					tag: 'ShopBlockModal',
					text: 'Магазин',
					icon: 'fa-shopping-bag'
				},
			],
		};
	},
	components: {
		SortableItem,
		SortableList,
		TextBlockModal,
		ImagesBlockModal,
		LinkBlockModal,
		SeparatorBlockModal,
		MapBlockModal,
		MessengersBlockModal,
		VideoBlockModal,
		FAQBlockModal,
		SocialLinksBlockModal,
		CarouselBlockModal,
		ShopBlockModal,
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
		design: {
			get() {
				return this.$store.getters['settings/getDesign']
			}
		},
	},
	methods: {
    handleShowModal(event, value) {
			this.showModal = true
			this.editBlock = {}
            this.currentModal = null
        },
        handleHideModal(event, value) {
			this.currentModal = null
			this.editBlock = {}
        },
        swapModal(modal) {
			this.currentModal = modal
		},
		editModal(index) {
			this.editBlock = this.blocks[index]
			this.editBlockIndex = index
		},
		setLink() {
			this.showLinkEditModal = false
			this.$store.commit('pages/setPage', this.pageLink)
			this.$router.push({ name: 'Pages', params: { link: this.mainLink, page: this.pageLink }})
		},
		deleteLink() {
			this.showLinkEditModal = false
			this.$store.commit('pages/deletePage', this.pageLink)
			this.$store.commit('pages/setSelectedPage', 0)
			this.$router.push({ name: 'Pages', params: { link: this.mainLink, page: this.pageLink }})
		}
  },
}
</script>

<style scoped lang='scss'>
	.form-control-link {
		display: flex;
		font-size: 16px;
		padding: 0.5rem 1rem;
		justify-content: space-between;
		align-items: center;
	}
</style>