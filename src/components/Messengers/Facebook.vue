<template>
	<a :href="'https://m.me/' + data.userName">
		<i class="fa fa-2x fa-facebook"></i>
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
		background: #3b5998;
	}
</style>