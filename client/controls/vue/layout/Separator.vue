<template>
	<div
		class="Separator"
		v-bind:class="directionClass"
		v-bind:style="style"
	></div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/layout/Separator.less";

export default {
	name: "Separator",
	data: function () {
		return {
			DIRECTION: {
				horizontal: "divide-horizontal",
				vertical: "divide-vertical",
			},
		};
	},
	props: {
		direction: {
			type: String,
			default: "horizontal",
		},
		color: {
			type: String,
			default: "",
		},
		thickness: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		directionClass: function () {
			return normalizeInput(this.DIRECTION, this.direction);
		},
		style: function () {
			return {
				borderColor: this.color,
				borderWidth: this.thickness ? `${this.thickness}px` : "",
			};
		},
	},
};
</script>