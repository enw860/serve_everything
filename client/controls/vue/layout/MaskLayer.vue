<template>
	<div
		class="MaskLayer HLayout align-center flow-center"
		v-bind:class="show ? 'show' : 'hide'"
		@click="hideMask"
	>
		<div class="MaskContentWrapper">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import "../../style/toolkit/layout/MaskLayer.less";

export default {
	name: "MaskLayer",
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		hideMask: function (event) {
			if (!this._events.clickOutside) {
				return;
			}

			const maskContent = this.$el.querySelector(".MaskContentWrapper");
			if (!maskContent || !maskContent.contains(event.target)) {
				this.$emit("clickOutside", event);
			}
		},
	},
};
</script>