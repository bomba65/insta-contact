<template>
	<a :href="'https://vk.com/' + data.userName">
		<i class="fa fa-2x fa-vk"></i>
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
		background: #4C75A3;
	}
</style>