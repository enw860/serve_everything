<template>
	<div
		class="InputGroup"
		v-bind:class="[isDisabled ? 'disabled' : '', inputSize]"
	>
		<div class="GroupWrapper InputWrap" v-bind:class="layoutClass">
			<div
				class="OptionWrapper"
				v-for="optionObj in computedOptions"
				:key="optionObj.option"
			>
				<input
					type="checkbox"
					:value="optionObj.option"
					:name="describeBy"
					:id="optionObj.controlID"
					:checked="optionObj.isChecked"
					:disabled="isDisabled"
					@change="onchange"
				/>
				<label :for="optionObj.controlID" class="HLayout flow-start">
					<div class="CheckboxSelector" />
					<span>{{ optionObj.option }}</span>
				</label>
			</div>
		</div>
		<div class="error-message" v-if="!!error">{{ error }}</div>
	</div>
</template>

<script>
import { generateComponentID, normalizeInput } from "../../util/utilities";
import "../../style/toolkit/inputs/Inputs.less";

export default {
	name: "CheckboxGroup",
	data: function () {
		return {
			controlID: "",
			choice: this.value || [],
			LAYOUT: {
				vertical: "VLayout",
				horizontal: "HLayout",
			},
			INPUTSIZE: {
				small: "size-small",
				default: "size-normal",
				large: "size-large",
				xlarge: "size-xlarge",
			},
		};
	},
	props: {
		size: {
			type: String,
			default: "",
		},
		options: {
			type: Array,
			default: [],
		},
		value: {
			type: Array,
			default: [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
			default: "",
		},
		layout: {
			type: String,
			default: "Vertical",
		},
	},
	computed: {
		inputSize: function () {
			return this.size
				? normalizeInput(this.INPUTSIZE, this.size)
				: this.$parent.labelSize
				? ""
				: normalizeInput(this.INPUTSIZE, "default");
		},
		describeBy: function () {
			return this.$parent.labelID || "";
		},
		isDisabled: function () {
			return this.$parent.isDisabled || this.disabled;
		},
		errorClass: function () {
			return this.error ? "invalid-input" : "";
		},
		computedOptions: function () {
			if (!this.controlID) {
				this.controlID = generateComponentID(this.$options.name);
			}

			return this.options.map((option, index) => {
				return {
					option,
					isChecked: this.getSelectedIndex().indexOf(index) > -1,
					controlID: `${this.controlID}-CheckboxBtn${index}`,
				};
			});
		},
		layoutClass: function () {
			return normalizeInput(this.LAYOUT, this.layout);
		},
	},
	methods: {
		onchange: function (event) {
			if (this.choice.indexOf(event.target.value) < 0) {
				this.choice = [...this.choice, event.target.value];
			} else {
				this.choice = this.choice.filter(
					(value) => value !== event.target.value
				);
			}

			!this.isDisabled &&
				!!this._events.change &&
				this.$emit("change", event);
		},
		setValueByIndexs: function (indexs) {
			if (indexs.length > 0) {
				this.choice = indexs.reduce((choices, index) => {
					if (index < this.options.length) {
						return [this.options[index], ...choices];
					}
					return choices;
				}, []);
			}
		},
		setValueByValues: function (values) {
			if (values.length > 0) {
				this.choice = this.values.filter(
					(value) => this.options.indexOf(value) > -1
				);
			}
		},
		getSelectedIndex: function () {
			return this.getSelectedValue().map((value) =>
				this.options.indexOf(value)
			);
		},
		getSelectedValue: function () {
			return this.choice || [];
		},
	},
};
</script>