import api, {baseURL} from '../api/main'

const state = {
    blocks: [
        {
            type: 'TextBlock',
            data: {
                text: 'Текст'
            }
        },
        {
            type: 'TextBlock',
            data: {
                text: 'Текст1'
            }
        },
        {
            type: 'TextBlock',
            data: {
                text: 'Текст2'
            }
        },
        {
            type: 'AvatarBlock',
            data: {
                size: 'small'
            }
        }
    ],
}


const getters = {
    getBlocks: (state, getters) => {
        return state.blocks
    },
}

const mutations = {
    addBlock: (state, payload) => {
        state.blocks.push(payload);
    },
    setBlocks: (state, payload) => {
        state.blocks = payload;
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