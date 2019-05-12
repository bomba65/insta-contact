<template>
    <b-modal title="Категория" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
        <b-row>
            <b-col sm="12">
                <label>Название категории</label>
                <b-form-input type="text" v-model="modalData.data" placeholder="Название категории"></b-form-input>
            </b-col>
        </b-row>
        <div slot="modal-footer" class="w-100">
            <b-button
                v-if="updateModal"
                variant="danger"
                class="float-left align-items-center"
                @click="deleteCategory"
            >
                <i class="fa fa-lg fa-trash-o mr-2"></i>
                <span>Удалить</span>
            </b-button>
            <b-button
                v-else
                variant="secondary"
                class="float-left align-items-center"
                @click="$emit('close')"
            >
                <i class="fa fa-lg fa-angle-left mr-2"></i>
                <span>Назад</span>
            </b-button>
            <b-button
                variant="primary"
                class="float-right"
                @click="setCategory"
                v-if="updateModal"
            >
                Сохранить
            </b-button>
            <b-button
                variant="primary"
                class="float-right"
                @click="addCategory"
                v-else
            >
                Добавить
            </b-button>
        </div>
    </b-modal>
</template>

<script>

    export default {
        data() {
            return {
                showModal: true,
            }
        },
        props: {
          modalData: {
            type: Object,
            default: () => ({
                data: '',
                type: '',
                index: null
            }),
          },
          updateModal: {
              default: false
          }
        },
        methods: {
            addCategory() {
                this.$store.commit('shop/addCategory', this.modalData.data)
                this.$emit('close')
            },
            setCategory() {
              this.$store.commit('shop/setCategory', { name: this.modalData.data, index: this.modalData.index})
              this.$emit('close')
            },
            deleteCategory() {
              this.$store.commit('shop/deleteCategory', this.modalData.index)
              this.$emit('close')
            },
        },
    }
</script>

<style scoped lang="scss">
</style>