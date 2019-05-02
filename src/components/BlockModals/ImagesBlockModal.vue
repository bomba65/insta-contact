<template>
    <b-modal title="Изображения" size="lg" class="modal-primary" v-model="showModal" @hidden="$emit('close')">
        <b-row class="mt-2">
            <b-col sm="12">
              <b-form-group >
                  <label class="drop-image"  @dragover.prevent @drop="onDrop">
                        <i class="fa fa-2x fa-plus-circle"></i>
                        <span>Добавить избражение</span>
                        <input type="file" @change="onFileChange" class="d-none">
                  </label>
                  <div :key="index" v-for="(image, index) in block.data.images" class="images mt-3">
                    <img :src="image" class="img-thumbnail" />
                    <div class="image-remove" @click="removeImage(index)">
                      <i class="fa fa-2x fa-close text-danger"></i>
                    </div>
                  </div>
              </b-form-group>
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
              type: 'ImagesBlock',
              data: {
                images: []
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
            onDrop: function(e) {
              e.stopPropagation();
              e.preventDefault();
              var files = e.dataTransfer.files;
              this.createImage(files[0]);
            },
            onFileChange(e) {
              var files = e.target.files || e.dataTransfer.files;
              if (!files.length)
                return;
              this.createImage(files[0]);
            },
            createImage(file) {
              var image = new Image();
              var reader = new FileReader();

              reader.onload = (e) => {
                this.block.data.images.push(e.target.result);
              };
              reader.readAsDataURL(file);
            },
            removeImage(index) {
              this.block.data.images.splice(index, 1);
            },
        },
    }
</script>

<style scoped lang="scss">

.images {
  width: 100%;
  cursor: pointer;
  position: relative;

  .image-remove {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    font-size: 3rem;
    position: absolute;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
  }

  &:hover {
    .image-remove {
      display: flex;
    }
  }
}

</style>