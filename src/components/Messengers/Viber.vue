<template>
	<div>
		<a :href="'viber://chat?number=' + data.phoneNumber">{{ data.linkText }}</a>
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