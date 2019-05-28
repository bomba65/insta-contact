<template>
	<a :href="data.link" target="_blank">
		<i class="fa fa-2x fa-youtube"></i>
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
		background: #E62117;
	}
</style>