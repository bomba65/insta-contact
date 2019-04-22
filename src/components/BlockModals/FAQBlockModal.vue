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
        <div class="questions-list">
        <slot />
        </div>
        `
    }

    const SortableItem = {
        mixins: [ElementMixin],
        props: ['item'],
        directives: { handle: HandleDirective },
        template: `
        <div class="questions-list-item mb-3">
            <div class="question-header">
                <div v-handle class="question-handle"><span></span></div>
                <span>
                    <template v-if="item.title == ''">Заголовок</template>
                    {{ item.title }}
                </span>
                <a href="#" class="text-danger" @click="$emit('delete-item')"><i class="fa fa-lg fa-trash-o"></i></a>
            </div>

            <div class="question-body">
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

<style lang="scss">
    .questions-list-item {
        z-index: 2000;
        background: #eee;
        border-radius: 2px;

        .question-header {
            display: flex;
            position: relative;
            align-items: center;
            padding-left: 40px;
            justify-content: space-between;

            a {
                padding: 10px;
            }
        }

        .question-body {
            padding: 15px;
        }
    }
    .question-handle {
		top: 0;
		bottom: 0;
		left: 0;
		width: 30px;
		opacity: .6;
		border-radius: 2px;
		position: absolute;
		background: #273444;
		cursor: -webkit-grab;
		transition: opacity .15s ease;

		&:hover {
			opacity: 1;
		}

		span {
			top: 50%;
			left: 50%;
			width: 15px;
			height: 2px;
			display: block;
			background: #fff;
			position: absolute;
			transform: translate(-50%,-50%);

			&::before, &::after {
				left: 0;
				right: 0;
				top: -5px;
				content: '';
				height: 2px;
				background: #fff;
				position: absolute;
			}
			&::after {
				top: initial;
				bottom: -5px;
			}
		}
	}
</style>