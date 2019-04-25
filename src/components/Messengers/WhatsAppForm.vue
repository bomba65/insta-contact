<template>
	<div>
		<label>Текст ссылки</label>
  		<b-form-input type="text" v-model="data.linkText" :placeholder="'Например: Написать в ' + data.name" class="mb-3"></b-form-input>

		<label>Укажите ваш номер телефона</label>
  		<b-form-input type="text" v-model="data.phoneNumber" placeholder="+7 775 777 77 77" class="mb-3"></b-form-input>

		<label>Текст-шаблон сообщенияа</label>
		<b-form-textarea
			placeholder="Пример: Здравствуйте, как можно сделать заказ?"
			v-model="data.templateText"
		></b-form-textarea>
	</div>
</template>

<script>

export default {
	name: 'WhatsAppForm',
	data() {
		return {
			showForm: false,
		};
	},
	props: {
		data: {
			type: Object,
		}
	},
}
</script>