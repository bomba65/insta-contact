<template>
	<section class="section-shop">
		<div class="container-fluid">
            <h2>Магазин</h2>
            <b-tabs>
                <b-tab title="Товары" active>
                    <b-row>
                        <b-col sm="7">
                            <ProductsList lockAxis="y" v-model="products" :useDragHandle="true">
                                <ProductsItem v-for="(product, index) in products" :index="index" :key="index" :item="product"  @edit-modal="editModal(index, 'ProductModal', product)"/>
                            </ProductsList>
                            <div>
                                <a href="javascript:void(0);" class="add-link" @click="currentModal = 'ProductModal'"><i class="fa fa-2x fa-plus-circle mr-2"></i> Добавить категорию</a>
                            </div>
                        </b-col>
                        <b-col sm="5">
                            <iPhone6 :products="products" />
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Категории">
                    <b-row>
                        <b-col sm="7">
                            <h3>Категории</h3>

                            <ul class="categories-list">
                                <li class="category" v-for="(category, index) in categories" :key="index">
                                    <div>{{ category }}</div>
                                    <div>
                                        <b-button type="button" variant="primary" class="mx-auto d-block" @click="editModal(index, 'CategoryModal', category)">Редактировать</b-button>
                                    </div>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" class="add-link" @click="currentModal = 'CategoryModal'"><i class="fa fa-2x fa-plus-circle mr-2"></i> Добавить категорию</a>
                                </li>
                            </ul>
                        </b-col>
                        <b-col sm="5">
                            <iPhone6 />
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Настройки">
                    <b-row>
                        <b-col sm="7">
                            <b-row class="theme-list">
                                <b-col sm="2" class="theme-item default" :class="{ active : activeTheme == 'default' }" @click="setDesign('default')">
                                    <div>Текст</div>
                                    <a href="#">Ссылка</a>
                                </b-col>
                                <b-col sm="2" class="theme-item red"  :class="{ active : activeTheme == 'red' }" @click="setDesign('red')">
                                    <div>Текст</div>
                                    <a href="#">Ссылка</a>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col sm="5">
                            <iPhone6 />
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
		</div>

        <component :is="currentModal" @close="handleHideModal"></component>
        <component :is="editItem.type" @close="handleHideModal" :updateModal="true" :modalData="editItem"></component>
	</section>
</template>

<script>

import iPhone6 from '../../components/Devices/iPhone6'
import CategoryModal from '../../components/ShopModals/CategoryModal'
import ProductModal from '../../components/ShopModals/ProductModal'

import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'

const ProductsList = {
	mixins: [ContainerMixin],
	template: `
	<div class="products-list">
		<slot />
	</div>
	`
};
const ProductsItem = {
	mixins: [ElementMixin],
	props: ['item'],
	directives: { handle: HandleDirective },
	template: `
	<div class="products-list-item sortable" style="z-index: 3;">
		<div v-handle class="product-handle"><span></span></div>
		<div class="product-body">
            <div class="product-image" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
            <div class="product-name">{{ item.name }}</div>
            <b-button type="button" variant="primary" class="ml-auto d-block" @click="$emit('edit-modal')">Редактировать</b-button>
		</div>
	</div>
	`
};

export default {
	name: 'Shop',
	data() {
		return {
            activeTheme: 'default',
            currentModal: null,
            editItem: {
                type: '',
                index: null,
                data: null
            }
		};
	},
	computed: {
		design: {
			get() {
				return this.$store.getters['settings/getDesign']
			}
    },
    categories: {
			get() {
				return this.$store.getters['shop/getCategories']
			}
    },
    products: {
			get() {
				return this.$store.getters['shop/getProducts']
			},
			set(i) {
				this.$store.commit('shop/setProducts', i)
			}
		},
	},
	methods: {
    handleHideModal(event, value) {
			this.currentModal = null
			this.editItem = {
                type: '',
                index: null,
                data: null
            }
        },
        editModal(index, type, data) {
            this.editItem.index = index
            this.editItem.type = type
            this.editItem.data = data
        }
    },
    components: {
        iPhone6,
        CategoryModal,
        ProductModal,
		ProductsItem,
		ProductsList,
    }
}
</script>

<style scoped lang="scss">
    .categories-list {
        padding: 0;
        font-size: 16px;
        list-style: none;

        .category {
            display: flex;
            padding: 15px;
            align-items: center;
            justify-content: space-between;

            &:nth-child(even) {
                background: #eee;
            }
        }
    }
</style>
