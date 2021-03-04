<style lang="less">
</style>

<template>
	<div
		class="Slideout"
		v-bind:class="isVisible ? 'show' : 'hide'"
		@click="checkContentBeforeClose"
	>
		<div class="SlideoutContent" v-bind:class="directionClass">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/layout/Slideout.less";

export default {
	name: "Slideout",
	data: function () {
		return {
			isVisible: false,
			DIRECTION: {
				left: "slide-left",
				right: "slide-right",
			},
		};
	},
	props: {
		direction: {
			type: String,
			default: "left",
		},
	},
	computed: {
		directionClass: function () {
			return normalizeInput(this.DIRECTION, this.direction);
		},
	},
	methods: {
		checkContentBeforeClose: function (event) {
			if (this.isVisible) {
				!this.contentCheck(event) && this.hideSlideout(event);
			}
		},
		contentCheck: function (event) {
			const parent = this.$el.querySelector(".SlideoutContent");
			const target = event.target;
			return parent && target && parent.contains(target);
		},
		showSlideout: function (event) {
			this.isVisible = true;
			!!this._events.show && this.$emit("show", event);
		},
		hideSlideout: function (event) {
			this.isVisible = false;
			!!this._events.hide && this.$emit("hide", event);
		},
	},
};
</script>