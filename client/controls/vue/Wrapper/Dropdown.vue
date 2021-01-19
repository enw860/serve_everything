<template>
	<div
		class="DropDown VLayout"
		v-bind:class="[dropDownSize, isExpanded ? 'expand' : '']"
	>
		<button
			class="DropDownBtn HLayout align-center"
			v-bind:class="dropDownColorStyle"
			@click="toggleDropDown"
		>
			{{ title }}
		</button>
		<div
			class="DropdownContent VLayout"
			v-bind:class="isExpanded ? '' : 'hide'"
			:aria-hidden="!isExpanded"
			:aria-expanded="isExpanded"
		>
			<div class="contentPanel">
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
import { normalizeInput, generateComponentID } from "../../util/utilities";
import "../../style/toolkit/wrapper/Dropdown.less";

export default {
	name: "Dropdown",
	data: function () {
		return {
			isExpanded: this.expanded,
			INPUTSIZE: {
				small: "size-small",
				default: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
			},
			COLORSTYLE: {
				default: "",
				dark: "dark-style",
			},
		};
	},
	props: {
		title: {
			type: String,
			default: "Title",
		},
		expanded: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: "",
		},
		colorStyle: {
			type: String,
			default: "default",
		},
	},
	computed: {
		dropDownSize: function () {
			return this.size
				? normalizeInput(this.INPUTSIZE, this.size)
				: normalizeInput(this.INPUTSIZE, "default");
		},
		dropDownColorStyle: function () {
			return normalizeInput(this.COLORSTYLE, this.colorStyle);
		},
	},
	methods: {
		toggleDropDown: function (event) {
			if (this.isExpanded) {
				this.collaspeDropDown(event);
			} else {
				this.expandDropDown(event);
			}
		},
		expandDropDown: function (event) {
			this.isExpanded = true;
			!!this._events.expand && this.$emit("expand", event);
		},
		collaspeDropDown: function (event) {
			this.isExpanded = false;
			!!this._events.collaspe && this.$emit("collaspe", event);
		},
	},
};
</script>