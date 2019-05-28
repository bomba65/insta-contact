<template>
	<a :href="'viber://chat?number=' + data.phoneNumber">
		<i class="fa fa-2x fa-phone"></i>
		<span>{{ data.linkText }}</span>
	</a>
</template>

<script>

export default {
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
		background: #8f5db7;
	}
</style>