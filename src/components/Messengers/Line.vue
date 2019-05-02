<template>
	<div>
		<a :href="'line://ti/p/' + data.userName">{{ data.linkText }}</a>
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