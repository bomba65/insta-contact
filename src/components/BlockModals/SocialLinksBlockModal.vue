<template>
  <b-modal
    title="Социальные сети"
    size="lg"
    class="modal-primary block-modal"
    v-model="showModal"
    @hidden="$emit('close')"
  >
    <b-row>
      <b-col sm="12">
        <label>Вид ссылок</label>
        <b-form-select
          :plain="true"
          class="mb-3"
          v-model="block.data.linkType"
          :options="[
                {
                  text: 'Компактные ссылки без текста',
                  value: 'compact'
                  }, {
                  text: 'Ссылки на всю ширину с текстом',
                  value: 'default'
                }]"
        ></b-form-select>
      </b-col>

      <b-col>
        <SortableList lockAxis="y" v-model="block.data.socialLinks" :useDragHandle="true">
          <SortableItem
            v-for="(socialLink, index) in block.data.socialLinks"
            :index="index"
            :key="index"
            :item="socialLink"
          />
        </SortableList>
      </b-col>
    </b-row>
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
      <b-button v-else variant="secondary" class="float-left align-items-center" @click="goBack">
        <i class="fa fa-lg fa-angle-left mr-2"></i>
        <span>Назад</span>
      </b-button>
      <b-button
        variant="primary"
        class="float-right"
        @click="editBlock"
        v-if="updateBlock"
      >Сохранить</b-button>
      <b-button variant="primary" class="float-right" @click="addBlock" v-else>Сохранить</b-button>
    </div>
  </b-modal>
</template>

<script>
import { ContainerMixin, ElementMixin, HandleDirective } from "vue-slicksort";

const SortableList = {
  mixins: [ContainerMixin],
  template: `
        <div class="form-fields-item-list">
        <slot />
        </div>
        `
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ["item"],
  directives: { handle: HandleDirective },
  components: {},
  template: `
		<div class="form-fields-item">
			<div class="form-fields-item-header py-3">
          <div v-handle class="form-fields-item-handle"><span></span></div>
          <span>
            {{ item.name }}
          </span>
				<b-form-checkbox v-model="item.isActive" switch class="custom-control custom-switch mr-3">
				</b-form-checkbox>
            </div>

            <div class="form-fields-item-body" v-if="item.isActive">
                <label>Текст ссылки</label>
                <b-form-input type="text" v-model="item.linkText" class="mb-2" :placeholder="'Например: Моя страница в ' + item.name"></b-form-input>
                <label>Ссылка {{ item.name }}</label>
                <b-form-input type="text" v-model="item.link"></b-form-input>
            </div>
        </div>
        `
};

export default {
  name: "text-block-modal",
  data() {
    return {
      showModal: true
    };
  },
  props: {
    block: {
      type: Object,
      default: () => ({
        type: "SocialLinksBlock",
        data: {
          linkType: "default",
          socialLinks: [
            {
              componentName: "Facebook",
              name: "Facebook",
              linkText: "",
              link: "",
              isActive: false
            },
            {
              componentName: "Vk",
              name: "ВКонтакте",
              linkText: "",
              link: "",
              isActive: false
            },
            {
              componentName: "Instagram",
              name: "Instagram",
              linkText: "",
              link: "",
              isActive: false
            },
            {
              componentName: "Twitter",
              name: "Twitter",
              linkText: "",
              link: "",
              isActive: false
            },
            {
              componentName: "Youtube",
              name: "Youtube",
              linkText: "",
              link: "",
              isActive: false
            },
            {
              componentName: "Snapchat",
              name: "Snapchat",
              linkText: "",
              link: "",
              isActive: false
            }
          ]
        }
      })
    },
    updateBlock: {
      default: false
    },
    indexOfBlock: {
      default: 0
    }
  },
  components: {
    SortableItem,
    SortableList
  },
  methods: {
    goBack() {
      this.$emit("go-back");
    },
    addBlock() {
      this.$store.commit("blocks/addBlock", this.block);
      this.$emit("close");
    },
    editBlock() {
      this.$store.commit("blocks/editBlock", {
        block: this.block,
        index: this.indexOfBlock
      });
      this.$emit("close");
    },
    deleteBlock() {
      this.$store.commit("blocks/deleteBlock", this.indexOfBlock);
      this.$emit("close");
    }
  }
};
</script>

<style scoped="">
</style>