<template>
	<div>
		<label>Текст ссылки</label>
  		<b-form-input type="text" v-model="data.linkText" :placeholder="'Например: Написать в ' + data.name" class="mb-3"></b-form-input>

		<label>Укажите ваш номер телефона</label>
		<vue-tel-input v-model="data.phoneNumber"
						placeholder="Укажите ваш номер телефона"
						:preferredCountries="['kz']"
						class="mb-3">
		</vue-tel-input>
		<label>Текст-шаблон сообщенияа</label>
		<b-form-textarea
			placeholder="Пример: Здравствуйте, как можно сделать заказ?"
			v-model="data.templateText"
		></b-form-textarea>
	</div>
</template>

<script>
import VueTelInput from 'vue-tel-input'

export default {
	name: 'WhatsAppForm',
	data() {
		return {
			showForm: false,
		}
	},
	props: {
		data: {
			type: Object,
		}
	},
	components: {
		VueTelInput,
	},
}
</script>