<template>
	<a :href="'https://wa.me/' + data.phoneNumber + '?text=' + data.templateText">
		<i class="fa fa-2x fa-whatsapp"></i>
		<span>{{ data.linkText }}</span>
	</a>
</template>

<script>

export default {
	name: 'WhatsApp',
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

<style scoped lang="scss">
	a {
		background: #25D366;
	}
</style>
