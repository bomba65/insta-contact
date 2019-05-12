import api, {baseURL} from '../api/main'

const state = {
    categories: ['Все', 'Обувь', 'Толстовки', 'Мужская', 'Женская'],
    products: [
        {
            name: 'Название Товара',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
    ],
    shopStatus: false
}


const getters = {
    getCategories: (state, getters) => {
        return state.categories
    },
    getProducts: (state, getters) => {
        return state.products
    },
}

const mutations = {
    addCategory: (state, payload) => {
        state.categories.push(payload)
    },
    deleteCategory: (state, payload) => {
        state.categories.splice(payload, 1)
    },
    setCategory: (state, payload) => {
        state.categories[payload.index] = payload.name;
    },
    addProduct: (state, payload) => {
        state.products.push(payload)
    },
    deleteProduct: (state, payload) => {
        state.products.splice(payload, 1)
    },
    setProducts: (state, payload) => {
        state.products = payload
    },
}
const actions = {

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}