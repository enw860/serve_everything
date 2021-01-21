<template>
	<div
		class="DisplayText"
		v-bind:class="[sizeClass, isDisabled]"
		:aria-describedby="describeBy"
		v-bind:style="textStyle"
	>
		{{ value }}
	</div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/infomational/DisplayText.less";

export default {
	name: "DisplayText",
	data: function () {
		return {
			SIZE: {
				auto: "",
				xsmall: "size-xsmall",
				small: "size-small",
				normal: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
				xxlarge: "size-xxlarge",
				xxxlarge: "size-xxxlarge",
			},
		};
	},
	props: {
		value: {
			type: String,
			default: "auto",
		},
		size: {
			type: String,
			default: "default",
		},
		fontWeight: {
			type: Number,
			default: 400,
		},
		color: {
			type: String,
			default: "",
		},
	},
	computed: {
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		sizeClass: function () {
			return normalizeInput(this.SIZE, this.size);
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		textStyle: function () {
			return {
				fontWeight: this.fontWeight,
				color: this.color,
			};
		},
	},
};
</script>