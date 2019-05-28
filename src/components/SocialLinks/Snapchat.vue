<template>
	<a :href="data.link" target="_blank">
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
        color: #000 !important;
        background: #FFFC00;
	}
</style>