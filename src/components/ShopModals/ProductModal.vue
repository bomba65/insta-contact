<template>
    <b-modal title="Товар" size="lg" class="modal-primary block-modal" v-model="showModal" @hidden="$emit('close')">
        <b-row>
            <b-col sm="12 mb-3">
                <label>Название товара</label>
                <b-form-input type="text" v-model="modalData.data.name" placeholder="Название товара"></b-form-input>
            </b-col>
            <b-col sm="4">
                <label>Изображение товара</label>
                <div class="product-image" v-if="!modalData.data.image" :style="{ backgroundImage: 'url(https://iep.org.pe/fondo-editorial/wp-content/plugins/jigoshop/assets/images/placeholder.png)' }">
                    
                </div>
                <div v-else class="product-image" :style="{ backgroundImage: 'url(' + modalData.data.image + ')' }">
                    <div class="image-remove" @click="removeImage">
                        <i class="fa fa-2x fa-close text-danger"></i>
                    </div>
                </div>
                <label href="javascript:void(0)" class="add-link mt-3"  @dragover.prevent @drop="onDrop">
                        <i class="fa fa-2x fa-plus-circle mr-2"></i> Изменить избражение
                        <input type="file" @change="onFileChange" class="d-none">
                </label>
            </b-col>
            <b-col sm="8">
                <label>Дополнительные изображения</label>
                <div class="carousel-add">
                    <b-carousel id="carousel1"
                            style="text-shadow: 1px 1px 2px #333;"
                            controls
                            indicators
                            background="#ababab"
                            :interval="4000"
                            img-width="1024"
                            img-height="480"
                            v-if="modalData.data.images.length">
                        <b-carousel-slide :key="index" v-for="(image, index) in modalData.data.images" class="carousel-slide" :style="'background-image: url(' + image + ')'">
                            <div class="image-remove" @click="removeImage(index, true)">
                                <i class="fa fa-2x fa-close text-danger"></i>
                            </div>
                        </b-carousel-slide>
                    </b-carousel>
                    <label href="javascript:void(0);" class="add-link mt-3"  @dragover.prevent @drop="onDropCarousel">
                            <i class="fa fa-2x fa-plus-circle mr-2"></i> Добавить избражение
                            <input type="file" @change="onFileChangeCarousel" class="d-none">
                    </label>
                </div>
            </b-col>
            
            <b-col sm="12" class="my-3">
                <label>Описание товара</label>
                <ckeditor :editor="editor" v-model="modalData.data.description"></ckeditor>
            </b-col>
            <b-col sm="6">
                <label>Цена товара</label>
                <b-form-input type="number" v-model="modalData.data.price" placeholder="Цена товара"></b-form-input>
            </b-col>
            <b-col sm="6">
                <label>Показывать в категориях</label>
                <multiselect v-model="modalData.data.categories" :options="categories" :multiple="true" selected-label="Выбран" select-label="Добавить категорию" deselect-label="Убрать категорию" placeholder="Выберите категории"></multiselect>
            </b-col>
        </b-row>
        <div slot="modal-footer" class="w-100">
            <b-button
                v-if="updateModal"
                variant="danger"
                class="float-left align-items-center"
                @click="deleteProduct"
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
                @click="setProduct"
                v-if="updateModal"
            >
                Сохранить
            </b-button>
            <b-button
                variant="primary"
                class="float-right"
                @click="addProduct"
                v-else
            >
                Добавить
            </b-button>
        </div>
    </b-modal>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    export default {
        data() {
            return {
                showModal: true,
                editor: ClassicEditor,
            }
        },
        props: {
          modalData: {
            type: Object,
            default: () => ({
                data: {
                    name,
                    image: '',
                    images: [],
                    description: '',
                    price: 0,
                    categories: []
                },
                type: '',
                index: null
            }),
          },
          updateModal: {
              default: false
          }
        },
          computed: {
            categories: {
              get() {
                return this.$store.getters['shop/getCategories']
              }
            },
          },
        methods: {
            addProduct() {
                this.$store.commit('shop/addProduct', this.modalData.data)
                this.$emit('close')
            },
            setProduct() {
              this.$store.commit('shop/setProduct', { name: this.modalData.data, index: this.modalData.index})
              this.$emit('close')
            },
            deleteProduct() {
              this.$store.commit('shop/deleteProduct', this.modalData.index)
              this.$emit('close')
            },
            onDropCarousel(e) {
              e.stopPropagation();
              e.preventDefault();
              var files = e.dataTransfer.files;
              this.createImage(files[0], 'carousel');
            },
            onFileChangeCarousel(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0], true);
            },
            onDrop(e) {
              e.stopPropagation();
              e.preventDefault();
              var files = e.dataTransfer.files;
              this.createImage(files[0], true);
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file, variant=false) {
              var image = new Image();
              var reader = new FileReader();

              reader.onload = (e) => {
                    if(variant) this.modalData.data.images.push(e.target.result)
                    else this.modalData.data.image = e.target.result
              };
              reader.readAsDataURL(file);
            },
            removeImage(index=-1, variant=false) {
              if(variant) this.modalData.data.images.splice(index, 1)
              else this.modalData.data.image = ''
            },
        },
    }
</script>


<style scoped lang="scss">
    .product-image {
        position: relative;
        padding-bottom: 100%;
        background-size: cover;
        background-position: center;
        
        .image-remove {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: none;
            font-size: 3rem;
            cursor: pointer;
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
    .carousel-add {
        height: calc(100% - 28.2px);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .carousel {
        width: 100%;
    }

    .carousel-slide {
        padding-bottom: calc(50% - 15px)
    }
</style>