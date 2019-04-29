<template>
    <b-modal title="Вопросы и ответы" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
      <b-tabs>
        <b-tab title="Вопросы и ответы" active>
          <b-row>
            <b-col>
                <SortableList lockAxis="y" v-model="block.data.questions" :useDragHandle="true">
                  <SortableItem v-for="(question, index) in block.data.questions" :index="index" :key="index" :item="question"  @delete-item="deleteQuestion(index)"/>
                </SortableList>

                <a href="#" @click="addNewQuestion">Добавить новый пункт</a>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Настройки"></b-tab>
      </b-tabs>
      <div slot="modal-footer" class="w-100">
          <b-button
            v-if="updateBlock"
            variant="danger"
            class="float-left align-items-center"
            @click="goBack"
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
            @click="addBlock"
          >
            Сохранить
          </b-button>
      </div>
    </b-modal>
</template>

<script>
    import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort'
    const SortableList = {
        mixins: [ContainerMixin],
        template: `
        <div class="form-fields-item-list">
        <slot />
        </div>
        `
    }

    const SortableItem = {
        mixins: [ElementMixin],
        props: ['item'],
        directives: { handle: HandleDirective },
        template: `
        <div class="form-fields-item">
            <div class="form-fields-item-header">
                <div v-handle class="form-fields-item-handle"><span></span></div>
                <span>
                    <template v-if="item.title == ''">Заголовок</template>
                    {{ item.title }}
                </span>
                <a href="#" class="text-danger" @click="$emit('delete-item')"><i class="fa fa-lg fa-trash-o"></i></a>
            </div>

            <div class="form-fields-item-body">
                <label>Заголовок</label>
                <b-form-input type="text" v-model="item.title" class="mb-2"></b-form-input>
                
                <label for="textarea-default">Текст</label>
                <b-form-textarea
                    id="textarea-default"
                    v-model="item.text"
                ></b-form-textarea>
            </div>
        </div>
        `
    }

    export default {
        name: 'text-block-modal',
        data() {
            return {
                showModal: true,
            }
        },
        props: {
          block: {
            type: Object,
            default: () => ({
              type: 'FAQBlock',
              data: {
                linkType: 'default',
                questions: [
                    {
                        title: '',
                        text: ''
                    },
                ]
              }
            }),
          },
          updateBlock: {
            default: false
          }
        },
        components: {        
            SortableItem,
            SortableList,
        },
        methods: {
            goBack() {
                this.$emit('go-back');
            },
            addBlock() {
                this.$store.commit('blocks/addBlock', this.block)
                this.$emit('close')
            },
            addNewQuestion() {
                const newQuestion = {
                    title: '',
                    text: ''
                }
                this.block.data.questions.push(newQuestion);
            },
            deleteQuestion(index) {
                this.block.data.questions.splice(index, 1);
            }
        },
    }
</script>
