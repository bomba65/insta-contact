<template>
    <b-modal title="Аватар" size="lg" class="modal-primary" v-model="showModal" @hidden="$emit('close')">
        <b-row class="mt-2">
            <b-col sm="12">
              <label for="textarea-default">Текст</label>
            </b-col>
            <b-col sm="12">
              <b-form-group >
                <label>Размер аватара</label>
                <b-form-select
                  :plain="true"
                  v-model="block.data.size"
                  :options="[
                  {
                    text: 'Маленький размер (65x65)',
                    value: 'small'
                    }, {
                    text: 'Средний размер (95x95)',
                    value: 'normal'
                    }, {
                    text: 'Большой размер (125x125)',
                    value: 'big'
                    }]">
                </b-form-select>
              </b-form-group>
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
              @click="addBlock"
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
                block: {
                  type: 'AvatarBlock',
                  data: {
                    size: 'small'
                  }
                }
            }
        },
        methods: {
            goBack() {
                this.$emit('go-back');
            },
            addBlock() {
                this.$store.commit('blocks/addBlock', this.block)
                this.$emit('close')
            },
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