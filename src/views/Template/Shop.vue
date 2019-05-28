<template>
    <div class="screen page-2">
        <div class="container">
            <div class="page-header">
                <div class="page-header-items"  @click="toggleSideBar">
                    <i class="icon-menu icons font-2xl d-block"></i>
                </div>
                <div class="ml-3">{{ shopName }}</div>
                <div class="ml-auto mr-3 page-header-items" @click="searchShow = !searchShow">
                    <i class="icon-magnifier icons font-2xl d-block"></i>
                </div>
                
                <a class="basket page-header-items">
                    <i class="icon-handbag icons font-2xl d-block">
                        <b-badge variant="danger">9</b-badge>
                    </i>
                </a>
            </div>
            <div class="page-search" v-if="searchShow">
                <b-input-group class="search-group" >
                    <b-form-input ref="search"></b-form-input>
                    <b-input-group-append>
                    <b-button variant="outline-primary">Найти</b-button>
                    </b-input-group-append>
                </b-input-group>

                <div class="search-closer" @click="searchShow = !searchShow">
                    
                </div>
            </div>
            <div class="page-sidebar" :class="{ active: sidebarShow }">
                <div class="page-sidebar-content">
                    <h4>Категории</h4>
                    <ul>
                        <li :class="{ active: index === 0 }" v-for="(category, index) in categories" :key="index">{{ category }}</li>
                    </ul>
                </div>
                <div class="page-sidebar-closer" @click="toggleSideBar"></div>
            </div>

            <b-row v-if="products" class="products-list">
                <b-col cols="6" v-for="(product, index) in products" :key="index" class="products-list-item">
                    <div class="product-image" :style="{ backgroundImage: 'url(' + product.image + ')'}"></div>
                    <router-link :to="'/template/shop/product'" class="my-2 d-block">{{ product.name }}</router-link>
                    <b-button class="w-100" variant="primary">Добавить в корзину</b-button>
                </b-col>
            </b-row>
            <div v-else class="text-center">
                Товаров нет
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
		return {
            activeTheme: 'default',
            searchShow: false,
            sidebarShow: false,
		};
    },
    props: {
        shopName: {
            type: String
        }
    },
	computed: {
		design: {
			get() {
				return this.$store.getters['settings/getDesign']
			}
        },
        products: {
			get() {
				return this.$store.getters['shop/getProducts']
			}
        },
        categories: {
			get() {
				return this.$store.getters['shop/getCategories']
			}
		},
	},
	methods: {
        toggleSideBar() {
            this.sidebarShow = !this.sidebarShow
        },
    },
}
</script>

<style scoped lang='scss'>
    .products-list {
        & /deep/ .products-list-item {
            margin-bottom: 15px;
            .product-image {
                border-radius: 3px;
                padding-bottom: 100%;
                background-size: cover;
                background-position: center;
            }
        }
    }
</style>