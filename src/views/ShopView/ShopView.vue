<template>
	<section class="section-shop">
		<div class="container-fluid">
            <h2>Магазин</h2>
            <b-tabs>
                <b-tab title="Товары" active>
                    <b-row class="margin-minus">
                        <b-col sm="7" class="margin-plus">
                            <b-form-input class="mb-3" type="text" v-model="searchProduct" placeholder="Поиск"></b-form-input>
                            <ProductsList lockAxis="y" v-model="filteredProducts" :useDragHandle="true" :searchWord="searchProduct">
                                <ProductsItem v-for="(product, index) in filteredProducts.slice((currentPage-1)*5, (currentPage-1)*5+5)" :collection="0" :index="index" :key="index" :item="product"  @edit-modal="editModal(index, 'ProductModal', product)"/>
                            </ProductsList>

                            <div>
                                <a href="javascript:void(0)" class="add-link" @click="currentModal = 'ProductModal'"><i class="fa fa-2x fa-plus-circle mr-2"></i> Добавить товар</a>
                            </div>

                            <b-pagination
                                v-model="currentPage"
                                :total-rows="rows"
                                :per-page="5"
                                class="justify-content-center mt-4 mb-0"
                                aria-controls="my-table"
                            ></b-pagination>
                        </b-col>
                        <b-col sm="5" class="mt-md-0 mt-4">
                            <iPhone6 :products="filteredProducts" :shopName="shopName" />
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Категории">
                    <b-row class="margin-minus">
                        <b-col sm="7" class="margin-plus">
                            <h3>Категории</h3>

                            <CategoriesList lockAxis="y" v-model="categories" :useDragHandle="true">
                                <CategoriesItem v-for="(category, index) in categories" :index="index" :key="index" :item="category"  @edit-modal="editModal(index, 'CategoryModal', category)"/>
                            </CategoriesList>
                        </b-col>
                        <b-col sm="5" class="mt-md-0 mt-4">
                            <iPhone6 :shopName="shopName" />
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Настройки">
                    <b-row class="margin-minus">
                        <b-col sm="7" class="margin-plus">
                            <b-row class="theme-list">
                                <b-col sm="12">
                                    <label>Название магазина</label>
                                    <b-form-input type="text" v-model="shopName" placeholder="Название магазина"></b-form-input>
                                </b-col>
                                <b-col sm="12">
                                    <b-row>
                                        <b-col class="d-flex align-items-center">
                                            <label class="my-3 mr-3">Святся с нами</label>
                                            <b-form-checkbox v-model="whatsAppCall.isActive" switch class="custom-control custom-switch mr-3"></b-form-checkbox>
                                        </b-col>
                                        <b-col cols="12">
                                            <vue-tel-input v-if="whatsAppCall.isActive" v-model="whatsAppCall.phoneNumber"
                                                            placeholder="Укажите ваш номер WhatsApp"
                                                            :preferredCountries="['kz']">
                                            </vue-tel-input>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col>
                                    <b-button class="mt-3" variant="primary" @click="setShopSettings">Сохранить</b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col sm="5" class="mt-md-0 mt-4">
                            <iPhone6 :shopName="shopName" :products="products" :whatsAppCall="whatsAppCall" />
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


import VueTelInput from 'vue-tel-input';
import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'

const ProductsList = {
    mixins: [ContainerMixin],
    props: ['searchWord'],
	template: `
    <div class="products-list" :class="{ 'disabled-handle': searchWord }">
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
		<div v-handle class="product-handle"><i class="icon-menu icons d-block"></i></div>
        <div class="product-body">
            <div class="product-image" :style="{ backgroundImage: 'url(' + item.image + ')' }"></div>
            <div class="product-name">{{ item.name }}</div>
            <b-button type="button" variant="primary" class="ml-auto d-block" @click="$emit('edit-modal')">Редактировать</b-button>
		</div>
	</div>
	`
};

const CategoriesList = {
	mixins: [ContainerMixin],
	template: `
	<ul class="categories-list">
        <slot />
        <li>
            <a href="javascript:void(0);" class="add-link" @click="currentModal = 'CategoryModal'"><i class="fa fa-2x fa-plus-circle mr-2"></i> Добавить категорию</a>
        </li>
	</ul>
	`
};
const CategoriesItem = {
	mixins: [ElementMixin],
	props: ['item'],
	directives: { handle: HandleDirective },
    template: `
    <li class="category-list-item sortable" item>
        <div v-handle class="category-handle"><i class="icon-menu icons d-block"></i></div>
        <div>{{ item }}</div>
        <div>
            <b-button type="button" variant="primary" class="mx-auto d-block" @click="$emit('edit-modal')">Редактировать</b-button>
        </div>
    </li>
	`
};

export default {
	name: 'Shop',
	data() {
		return {
            perPage: 3,
            currentPage: 1,
            activeTheme: 'default',
            currentModal: null,
            editItem: {
                type: '',
                index: null,
                data: null
            },
            isActive: false
		};
	},
	computed: {
        rows() {
            return this.filteredProducts.length
        },
		design: {
			get() {
				return this.$store.getters['settings/getDesign']
			}
        },
        shopName: {
            get() {
                return this.$store.getters['shop/getShopName']
            },
            set(i) {
                this.$store.commit('shop/setShopName', i)
            }
        },
        whatsAppCall: {
            get() {
                return this.$store.getters['shop/getWhatsAppCall']
            },
            set(i) {
                this.$store.commit('shop/setWhatsAppCall', i)
            }
        },
        categories: {
            get() {
                return this.$store.getters['shop/getCategories']
            },
            set(i) {
                this.$store.commit('shop/setCategories', i)
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
        filteredProducts: {
            get() {
                return (this.$store.getters['shop/getFilteredProducts'] || this.$store.getters['shop/getProducts'])
            },
            set(i) {
                this.$store.commit('shop/setProducts', i)
            }
        },
        searchProduct: {
            get() {
                return this.$store.getters['shop/getSearchProduct']
            },
            set (i) {
                this.$store.commit('shop/filterProducts', i)
            }
        }
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
        },
        setShopSettings() {
            console.log(this.shopName)
            this.$store.commit('shop/setShopName', this.shopName)
        }
    },
    components: {
        iPhone6,
        CategoryModal,
        ProductModal,
		ProductsItem,
        ProductsList,
        CategoriesList,
        CategoriesItem,
        VueTelInput
    }
}
</script>

<style scoped lang="scss">
    .categories-list {
        padding: 0;
        list-style: none;
    }
    .category-list-item {
        font-size: 16px;
        list-style: none;
        display: flex;
        padding: 15px;
        position: relative;
        align-items: center;
        justify-content: space-between;

        &:nth-child(even) {
            background: #eee;
        }
    }
</style>
