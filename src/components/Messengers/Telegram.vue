<template>
	<a :href="'tg://resolve?domain=' + data.userName">
		<i class="fa fa-2x fa-telegram"></i>
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
		background: #0088CC;
	}
</style>