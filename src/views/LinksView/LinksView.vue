<template>
	<section class="section-links">
		<div class="container-fluid">
			<b-row>
				<b-col sm="3" v-for="(link, index) in links" :index="index" :key="index" class="mb-4">
					<b-card
						:title="'https://insta-contact.com/' + link"
						img-src="https://picsum.photos/600/300/?image=25"
						img-alt="Image"
						img-top
						tag="article"
						class="m-0"
					>

						<b-button :to="{ name: 'Pages', params: { link: link }}" variant="primary" class="d-block mt-auto">Редактировать ссылку</b-button>
					</b-card>
				</b-col>

				<b-col sm="3" class="mb-4 new-link">
					<a href="#" @click="showModal = true">
						<i class="fa fa-2x fa-plus-circle"></i>
					</a>
				</b-col>
			</b-row>
		</div>
		<b-modal title="Добавить новую ссылку" size="lg" class="modal-primary block-modal-cards" v-model="showModal">
			<div>
				<label>Текст ссылки</label>
				<b-form-input :state="validation" v-model="newLink"></b-form-input>
        <b-form-invalid-feedback :state="validation">
          Длина ссылки должна состоять минимум из 2 символов и быть уникальной
        </b-form-invalid-feedback>
			</div>
			<div slot="modal-footer" class="w-100">
				
		        <b-button
		          variant="secondary"
		          class="float-right"
		          @click="showModal=false"
		        >
		          Закрыть
		        </b-button>
				<b-button
					variant="primary"
					class="float-right mr-3"
					@click="addLink"
				>
					Сохранить
				</b-button>
			</div>
		</b-modal>
    </section>
</template>

<script>

export default {
	name: 'Pages',
	data() {
		return {
			showModal: false,
			newLink: ''
		};
	},
	computed: {
		links: {
			get() {
				return this.$store.getters['links/getLinks']
			}
		},
    validation() {
      if(this.links.indexOf(this.newLink) != -1) return false
      return this.newLink.length > 1
    }
	},
	methods: {
		addLink() {
			if(!this.validation) return
			
			this.$store.commit('links/addLink', this.newLink)
			this.newLink = ''
			this.showModal = false
		},
    },
}
</script>

<style scoped lang='scss'>
	.card {
		height: 100%;
	}
	.card-body {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.new-link {
		min-height: 300px;
		text-align: center;
		a {
			font-size: 30px;
			color: #ccc;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			border-radius: 5px;
			transition: 0.3s;
			justify-content: center;

			&:hover {
				text-decoration: none;
				background: #f7f7f7;
				color: #2c2c2c;
			}
		}
	}
</style>