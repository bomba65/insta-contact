<template>
	<div>
		<label>Текст ссылки</label>
  		<b-form-input type="text" v-model="data.linkText" :placeholder="'Например: Написать в ' + data.name" class="mb-3"></b-form-input>

		<label>Имя пользователя</label>
  		<b-form-input type="text" v-model="data.userName" placeholder="Имя пользователя"></b-form-input>
	</div>
</template>

<script>
export default {
	name: 'WhatsAppForm',
	data() {
		return {
		};
	},
	props: {
		data: {
			type: Object,
		}
	},
}
</script>