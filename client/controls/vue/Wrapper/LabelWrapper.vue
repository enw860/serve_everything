<template>
	<div
		class="LabelWrapper"
		v-bind:class="[
			labelPositionClass,
			labelSize,
			isDisabled ? 'disabled' : '',
		]"
	>
		<label :id="controlID" class="Label">{{ this.labelContent }}</label>
		<slot name="labelContent"></slot>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../util/utilities";
import "../../style/toolkit/wrapper/LabelWrapper.less";

export default {
	name: "LabelWrapper",
	data: function () {
		return {
			controlID: "",
			POSITION: {
				left: "label-left",
				top: "label-top",
			},
			LABELSIZE: {
				small: "size-small",
				default: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
			},
		};
	},
	props: {
		value: {
			type: String,
			default: "Default label",
		},
		position: {
			type: String,
			default: "top",
		},
		size: {
			type: String,
			default: "default",
		},
		required: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		labelPositionClass: function () {
			return normalizeInput(this.POSITION, this.position);
		},
		labelSize: function () {
			return normalizeInput(this.LABELSIZE, this.size);
		},
		labelContent: function () {
			return this.required ? "*" + this.value : this.value;
		},
		labelID: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}
			return this.controlID;
		},
		isDisabled: function () {
			return this.$parent.sdisabled || this.disabled;
		},
	},
};
</script>