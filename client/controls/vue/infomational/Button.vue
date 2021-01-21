<template>
	<div
		class="Button HLayout flow-between align-center"
		v-bind:class="[sizeClass, styleClass, isDisabled ? 'disabled' : '']"
		:role="isClickable ? 'button' : 'img'"
		:tabindex="isClickable && !isDisabled ? '0' : ''"
		:aria-disabled="isClickable && !isClickable"
		:aria-describedby="labelID"
		@click="onclick"
		@keypress="onkeypress"
	>
		<a
			v-if="!!icon && iconPosition === 'left'"
			class="fa"
			v-bind:class="icon"
		></a>

		<span v-if="!!value">{{ value }}</span>

		<a
			v-if="!!icon && iconPosition === 'right'"
			class="fa"
			v-bind:class="icon"
		></a>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../util/utilities";
import "../../style/toolkit/infomational/Button.less";

export default {
	name: "Button",
	data: function () {
		return {
			SIZE: {
				small: "size-small",
				normal: "size-normal",
				default: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
			},
			STYLE: {
				primary: "btn-primary",
				success: "btn-success",
				danger: "btn-danger",
				info: "btn-info",
				dark: "btn-dark",
				white: "btn-white",
				default: "btn-white",
				transparent: "btn-transparent",
			},
		};
	},
	props: {
		size: {
			type: String,
			default: "default",
		},
		value: {
			type: String,
			default: "Button",
		},
		icon: {
			type: String,
			default: "",
		},
		iconPosition: {
			type: String,
			default: "left",
		},
		btnStyle: {
			type: String,
			default: "default",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		sizeClass: function () {
			return normalizeInput(this.SIZE, this.size);
		},
		styleClass: function () {
			return normalizeInput(this.STYLE, this.btnStyle);
		},
		hasIcon: function () {
			return !!this.icon;
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		isClickable: function () {
			return !!this._events.click;
		},
		labelID: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}
			return this.controlID;
		},
	},
	methods: {
		onclick: function (event) {
			!this.isDisabled &&
				!!this._events.click &&
				this.$emit("click", event);
		},
		onkeypress: function (event) {
			if (
				[13, 32].some((code) => code === (event.keyCode || event.which))
			) {
				this.onclick(event);
			}
		},
	},
};
</script>