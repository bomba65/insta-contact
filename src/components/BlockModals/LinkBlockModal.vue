<template>
    <b-modal title="Ссылка" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Ссылка" active>
          <b-row>
            <b-col sm="12">
                <label>Текст ссылки</label>
                <b-form-input type="text" v-model="block.data.title" placeholder="Заголовок"></b-form-input>
                <b-form-input type="text" v-model="block.data.subtitle" placeholder="Подзаголовок" class="mt-2"></b-form-input>
            </b-col>
            <b-col sm="12" class="mt-3">
                <label>Открыть сайт</label>
            </b-col>
            <b-col sm="4">
                <b-form-select
                    :plain="true"
                    v-model="block.data.linkType"
                    :options="[
                    {
                    text: 'Открыть сайт',
                    value: ''
                    },
                    {
                    text: 'Ссылка на свою страницу',
                    value: 'http://localhost:8080/#/pages/'
                    }, {
                    text: 'Отправить эл.письмо',
                    value: 'mailto: '
                    }, {
                    text: 'Позвонить',
                    value: 'tel: '
                    }]">
                </b-form-select>
            </b-col>
            <b-col sm-8>
                <b-form-input v-if="block.data.linkType == ''" type="text" v-model="block.data.link" placeholder="http://"></b-form-input>
                <b-form-input v-if="block.data.linkType == 'mailto: '" type="text" v-model="block.data.link" placeholder="example@example.com"></b-form-input>
                <vue-tel-input
						v-if="block.data.linkType == 'tel: '" 
						v-model="block.data.link"
                        placeholder="Укажите ваш номер телефона"
                        :preferredCountries="['kz']">
                </vue-tel-input>
                <b-form-select
                    :plain="true"
                    v-if="block.data.linkType == 'http://localhost:8080/#/pages/'"
                    v-model="block.data.link">
                    <option :value="page" v-for="(page, index) in pages" :key="index">{{ page }}</option>
                </b-form-select>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Настройки">
            <b-row>
                <b-col sm="6">
                    <label>Выберите цвет текста ссылки</label>
                    <div class="dropdown">
                        <div class="color-box" :style="'background: ' + block.data.textColor.hex" @click="showDropdown"></div>
                        <div class="color-picker">
                            <chrome-picker :value="block.data.textColor" v-model="block.data.textColor"/>
                            <i class="fa fa-2x fa-window-close" @click="hideDropdown"></i>
                        </div>
                    </div>
                </b-col>
                <b-col sm="6">
                    <label>Выберите цвет заднего фона</label>
                    <div class="dropdown">
                        <div class="color-box" :style="'background: ' + block.data.bgColor.hex" @click="showDropdown"></div>
                        <div class="color-picker">
                            <chrome-picker :value="block.data.bgColor" v-model="block.data.bgColor"/>
                            <i class="fa fa-2x fa-window-close" @click="hideDropdown"></i>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-tab>
      </b-tabs>
      <div slot="modal-footer" class="w-100">
          <b-button
            v-if="updateBlock"
            variant="danger"
            class="float-left align-items-center"
            @click="deleteBlock"
          >
              <i class="fa fa-lg fa-trash-o mr-2"></i>
              <span>Удалить</span>
          </b-button>
          <b-button
            v-else
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
            @click="editBlock"
            v-if="updateBlock"
          >
            Сохранить
          </b-button>
          <b-button
            variant="primary"
            class="float-right"
            @click="addBlock"
            v-else
          >
            Сохранить
          </b-button>
      </div>
    </b-modal>
</template>

<script>
    import VueTelInput from 'vue-tel-input';
    import { Chrome } from 'vue-color'

    export default {
        data() {
            return {
                showModal: true,
            }
        },
        props: {
          block: {
            type: Object,
            default: () => ({
                type: 'LinkBlock',
                data: {
                    title: '',
                    subtitle: '',
                    linkType: '',
                    link: '',
                    textColor: {
                        hex: '#000000',
                    },
                    bgColor: {
                        hex: '#eee',
                    },
                }
            }),
          },
          updateBlock: {
            default: false
          },
          indexOfBlock: {
            default: 0
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
            editBlock() {
              this.$store.commit('blocks/editBlock', { block: this.block, index: this.indexOfBlock})
              this.$emit('close')
            },
            deleteBlock() {
              this.$store.commit('blocks/deleteBlock', this.indexOfBlock)
              this.$emit('close')
            },
            showDropdown (event) {
                event.currentTarget.parentElement.classList.toggle('active')
            },
            hideDropdown (event) {
                event.currentTarget.parentElement.parentElement.classList.toggle('active')
            }
        },
        computed: {
            pages: {
              get() {
                return this.$store.getters['pages/getPages']
              }
            },
        },
        components: {
          VueTelInput,
          'chrome-picker': Chrome,
        },
    }
</script>

<style scoped lang="scss">
    .dropdown {
        position: relative;

        .color-box {
            width: 30px;
            height: 30px;
            cursor: pointer;
            box-shadow: 0 0 3px rgba(0,0,0,0.5);
        }

        .color-picker {
            top: 40px;
            display: none;
            position: absolute;
            i {
                cursor: pointer;
                margin-left: 10px;
            }
        }

        &.active {
            .color-picker {
                display: flex;
            }
        }
    }
</style>