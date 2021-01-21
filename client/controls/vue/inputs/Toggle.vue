<template>
	<div class="Toggle" v-bind:class="isDisabled ? 'disabled' : ''">
		<div
			:aria-describedby="describedby"
			class="toggle-wrapper"
			v-bind:class="[sizeClass, styleClass]"
			tabindex="0"
			@click="onToggle"
			@keypress="onKeyPress"
		>
			<div
				class="toggle-pill"
				v-bind:class="currentState ? 'active' : ''"
			>
				<div class="toggle-toggler"></div>
			</div>
			<div class="toggle-label">
				<div
					class="toggle-label-on"
					v-bind:class="currentState ? '' : 'hide'"
				>
					<span v-if="isTextType">{{ onLabel }}</span>
					<a v-else class="fa" v-bind:class="onLabel"></a>
				</div>
				<div
					class="toggle-label-off"
					v-bind:class="!currentState ? '' : 'hide'"
				>
					<span v-if="isTextType">{{ offLabel }}</span>
					<a v-else class="fa" v-bind:class="offLabel"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../util/utilities";
import "../../style/toolkit/inputs/Toggle.less";

export default {
	name: "Toggle",
	data: function () {
		return {
			currentState: this.state,
			LABELTYPE: {
				text: "TEXT",
				icon: "ICON",
			},
			SIZE: {
				small: "size-small",
				default: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
			},
			STYLE: {
				primary: "toggle-primary",
				success: "toggle-success",
				danger: "toggle-danger",
				info: "toggle-info",
				default: "toggle-primary",
			},
		};
	},
	props: {
		state: {
			type: Boolean,
			default: false,
		},
		onLabel: {
			type: String,
			default: "On",
		},
		offLabel: {
			type: String,
			default: "Off",
		},
		labelType: {
			type: String,
			default: "text",
		},
		size: {
			type: String,
			default: "default",
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		toggleStyle: {
			type: String,
			default: "default",
		},
	},
	computed: {
		sizeClass: function () {
			return normalizeInput(this.SIZE, this.size);
		},
		styleClass: function () {
			return normalizeInput(this.STYLE, this.toggleStyle);
		},
		isTextType: function () {
			return normalizeInput(this.LABELTYPE, this.labelType) === "TEXT";
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		describedby: function () {
			return this.$parent.labelID || "";
		},
	},
	methods: {
		onToggle: function (event) {
			this.currentState = !this.currentState;
			event.target.checked = this.currentState;
			!this.isDisabled &&
				!!this._events.toggle &&
				this.$emit("toggle", event);
		},
		onKeyPress: function (event) {
			if (
				[13, 32].some((code) => code === (event.keyCode || event.which))
			) {
				this.onToggle(event);
			}
		},
		getState: function () {
			return this.currentState;
		},
	},
};
</script>