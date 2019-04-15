<template>
    <b-modal title="Аватар" size="lg" class="modal-primary" v-model="showModal">
        <b-row>
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
</template>

<script>
    export default {
        name: 'text-block-modal',
        data() {
            return {
                showModal: true,
            }
        },
        methods: {
            goBack() {
                this.$emit('go-back');
            }
        },
        computed: {
            
        },
        mounted() {
            
        },
        beforeDestroy() {
            
        }
    }
</script>

<style scoped="">
</style>