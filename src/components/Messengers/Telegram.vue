<template>
	<div>
		<a :href="'tg://resolve?domain=' + data.userName">{{ data.linkText }}</a>
	</div>
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