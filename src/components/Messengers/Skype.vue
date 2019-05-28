<template>
	<a :href="'skype:' + data.userName">
		<i class="fa fa-2x fa-skype"></i>
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
		background: #00AFF0;
	}
</style>