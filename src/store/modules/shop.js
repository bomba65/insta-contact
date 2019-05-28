import api, {baseURL} from '../api/main'

const removerAcentos = (string) => {
    const mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g
    }

    for (let letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra]
        string = string.replace(expressaoRegular, letra)
    }

    return string
}

const state = {
    categories: ['Все', 'Обувь', 'Толстовки', 'Мужская', 'Женская'],
    products: [
        {
            name: 'Название 1',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название 2',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара 3',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара 4',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
        {
            name: 'Название Товара 5',
            image: 'https://img.ostin.com/images/product/312_432/LJ6U5T-65_1.jpg',
            images: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolorum libero nihil quisquam eius cum ex repellat fugiat facere repellendus similique eligendi quas, debitis quasi? Alias architecto officia voluptas inventore!',
            price: 1000,
            status: 'В наличии'
        },
    ],
    shopName: 'Название Магазина',
    whatsAppCall: {
        isActive: false,
        phoneNumber: ''
    },
    filteredProducts: null,
    searchProduct: null,
}


const getters = {
    getCategories: (state) => state.categories,

    getProducts: (state) => state.products,

    getShopName: (state) => state.shopName,

    getWhatsAppCall: (state) => state.whatsAppCall,
    
    getSearchProduct: (state) => state.searchProduct,

    getFilteredProducts: (state) => state.filteredProducts
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
    setCategories: (state, payload) => {
        state.categories = payload;
    },
    addProduct: (state, payload) => {
        state.products.push(payload)
    },
    filterProducts (state, payload) {
        if (!(payload) || payload === '{}') {
            state.searchProduct = null
            state.filteredProducts = null
        } else {
            state.searchProduct = payload
            payload = removerAcentos(payload.trim().toLowerCase())
            state.filteredProducts = state.products.filter((product) => {
                return product.name.toLowerCase().includes(payload)
            })
        }
    },
    deleteProduct: (state, payload) => {
        state.products.splice(payload, 1)
    },
    setProducts: (state, payload) => {
        state.products = payload
    },
    setShopName: (state, payload) => {
        state.shopName = payload
    },
    setWhatsAppCall: (state, payload) => {
        state.whatsAppCall = payload.isActive
        state.phoneNumber = payload.phoneNumber
    }
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