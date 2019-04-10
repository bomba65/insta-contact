<template>
	<section class="section-pages">
		<div class="marvel-device iphone6 mx-auto">
			<div class="top-bar"></div>
			<div class="sleep"></div>
			<div class="volume"></div>
			<div class="camera"></div>
			<div class="sensor"></div>
			<div class="speaker"></div>
			<div class="screen page">
				<div class="root">
					<SortableList lockAxis="y" v-model="items" :useDragHandle="true">
						<SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item"/>
					</SortableList>
				</div>
			</div>
			<div class="home"></div>
			<div class="bottom-bar"></div>
		</div>
	</section>
</template>

<script>

import { ContainerMixin, ElementMixin, HandleDirective } from 'vue-slicksort';

const SortableList = {
	mixins: [ContainerMixin],
	template: `
	<div class="blocks-list">
	<slot />
	</div>
	`
};

const SortableItem = {
	mixins: [ElementMixin],
	props: ['item'],
	directives: { handle: HandleDirective },
	template: `
	<div class="blocks-list-item" style="z-index: 3;">
		<div class="block-text">
			<div v-handle class="block-handle"><span></span></div>
			{{item}}
		</div>
	</div>
	`
};

export default {
	name: 'Pages',
	components: {
		SortableItem,
		SortableList
	},
	data() {
		return {
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
		};
	}
}
</script>

<style lang='scss'>
</style>