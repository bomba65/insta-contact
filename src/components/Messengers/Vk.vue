<template>
	<div>
		<a :href="'https://vk.com/' + data.userName">{{ data.linkText }}</a>
	</div>
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