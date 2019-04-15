<template>
    <b-modal title="Текст" size="lg" class="modal-primary" v-model="showModal" @hidden="$emit('close')">
        <b-row class="mt-2">
            <b-col sm="12">
              <label for="textarea-default">Текст</label>
            </b-col>
            <b-col sm="12">
              <b-form-textarea
                id="textarea-default"
                placeholder=""
                v-model="textarea"
              ></b-form-textarea>
            </b-col>
        </b-row>
        <div slot="modal-footer" class="w-100">
            <b-button
              variant="secondary"
              class="float-left align-items-center"
              @click="goBack"
            >
               <i class="fa fa-lg fa-angle-left mr-2"></i>
               <span>Назад</span>
            </b-button>
            <b-button
              variant="primary"
              class="float-right"
              @click="goBack"
            >
              Сохранить
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
                textarea: '',
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