<template>
	<div>
		<label>Текст ссылки</label>
  		<b-form-input type="text" v-model="data.linkText" :placeholder="'Например: Написать в ' + data.name" class="mb-3"></b-form-input>

		<label>Укажите ваш номер телефона</label>
		<vue-tel-input v-model="data.phoneNumber"
						placeholder="Укажите ваш номер телефона"
						@onInput="onInput"
						:preferredCountries="['kz']">
		</vue-tel-input>
	</div>
</template>

<script>
import VueTelInput from 'vue-tel-input';

export default {
	name: 'ViberForm',
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
	components: {
		VueTelInput,
	},
}
</script>