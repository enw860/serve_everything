<template>
	<div
		class="Tooltip"
		v-bind:class="tooltipSize"
		@mouseenter="hoverToggle"
		@mouseleave="hoverToggle"
	>
		<slot name="content"></slot>
		<div
			:id="labelID"
			:aria-hidden="isVisible"
			role="tooltip"
			class="tooltipContent"
			v-bind:class="[sClass, mClass, isVisible ? 'show' : 'hide']"
		>
			<div class="tooltipText">{{ value }}</div>
		</div>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../util/utilities";
import "../../style/toolkit/wrapper/Tooltip.less";

export default {
	name: "Tooltip",
	data: function () {
		return {
			isVisible: false,
			INPUTSIZE: {
				small: "size-small",
				default: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
			},
			MPOS: {
				top: "m-top",
				bottom: "m-bottom",
				left: "m-left",
				right: "m-right",
			},
			SPOS: {
				start: "s-start",
				center: "s-center",
				end: "s-end",
			},
		};
	},
	props: {
		value: {
			type: String,
			default: "Tooltip",
		},
		mPosition: {
			type: String,
			default: "top",
		},
		sPosition: {
			type: String,
			default: "start",
		},
		size: {
			type: String,
			default: "",
		},
		displayOnHover: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		tooltipSize: function () {
			return this.size
				? normalizeInput(this.INPUTSIZE, this.size)
				: this.$parent.labelSize
				? ""
				: normalizeInput(this.INPUTSIZE, "default");
		},
		mClass: function () {
			return normalizeInput(this.MPOS, this.mPosition);
		},
		sClass: function () {
			return normalizeInput(this.SPOS, this.sPosition);
		},
		labelID: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}
			return this.controlID;
		},
	},
	methods: {
		hoverToggle: function (event) {
			if (this.displayOnHover) {
				this.toggleTooltip(event);
			}
		},
		toggleTooltip: function (event) {
			if (this.isVisible) {
				this.hideTooltip(event);
			} else {
				this.showTooltip(event);
			}
		},
		showTooltip: function (event) {
			this.isVisible = true;
			!!this._events.show && this.$emit("show", event);
		},
		hideTooltip: function (event) {
			this.isVisible = false;
			!!this._events.hide && this.$emit("hide", event);
		},
	},
};
</script>