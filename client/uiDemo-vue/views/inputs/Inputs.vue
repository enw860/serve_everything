<template>
	<div class="InputsDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					Different types of text inputs. (Plain text, number,
					password, color and text area)
				</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<div slot="events">
				<Table
					:colSettings="ENENTS_COL_SETTINGS"
					:tableData="ENENTS_TABLE_DATA"
				></Table>
			</div>

			<component
				slot="widgit"
				ref="control"
				v-bind:is="state.widgit"
				:size="state.size"
				:placeholder="state.placeholder"
				:error="state.error"
				:disabled="state.disabled"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Type:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.widgit"
						:options="TYPE"
						@change="updateWidgit"
					/>
				</LabelWrapper>

				<LabelWrapper value="Size:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</LabelWrapper>

				<LabelWrapper
					value="Placeholder:"
					size="small"
					v-if="state.widgit !== 'ColorInput'"
				>
					<InputText
						slot="labelContent"
						:value="state.placeholder"
						@blur="updatePlaceholder"
						placeholder="Placeholder"
					/>
				</LabelWrapper>

				<LabelWrapper
					value="Error message:"
					size="small"
					v-if="state.widgit !== 'ColorInput'"
				>
					<InputText
						slot="labelContent"
						:value="state.error"
						@blur="updateError"
						placeholder="Error message"
					/>
				</LabelWrapper>

				<LabelWrapper value="Disabled:" size="small">
					<Toggle
						slot="labelContent"
						:state="!state.disabled"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						@toggle="updateDisabled"
					/>
				</LabelWrapper>
			</div>

			<HTMLTextLoader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

import InputText from "../../../controls/vue/inputs/InputText.vue";
import Number from "../../../controls/vue/inputs/Number.vue";
import Password from "../../../controls/vue/inputs/Password.vue";
import TextArea from "../../../controls/vue/inputs/TextArea.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "InputsDemo",
	displayName: "Text inputs",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		DisplayText,
		InputText,
		Number,
		Password,
		TextArea,
		ColorInput,
		LabelWrapper,
		SingleSelect,
		Toggle,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			SIZES: ["Small", "Default", "Large", "xLarge"],
			TYPE: ["InputText", "Number", "Password", "TextArea", "ColorInput"],
			state: {
				placeholder: "Enter some inputs",
				size: "Default",
				error: "",
				disabled: false,
				widgit: "InputText",
				codeStructure: "",
			},
			PROPS_COL_SETTINGS: [
				{
					name: "prop",
					displayName: "Prop",
					width: "130px",
				},
				{
					name: "type",
					displayName: "Type",
					width: "110px",
				},
				{
					name: "default",
					displayName: "Default",
					width: "110px",
				},
				{
					name: "required",
					displayName: "Required",
					width: "130px",
				},
				{
					name: "description",
					displayName: "Description",
				},
			],
			PROPS_TABLE_DATA: [
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "value",
					type: "String",
					default: "",
					required: "",
					description:
						"String for all text based input, Number for number input, Hex for color",
				},
				{
					prop: "placeholder",
					type: "String",
					default: "",
					required: "",
					description:
						"Placeholder text. (Not available for Color Input)",
				},
				{
					prop: "error",
					type: "String",
					default: "",
					required: "",
					description:
						"Passed in error message. (Not available for Color Input)",
				},
				{
					prop: "disabled",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Disable the link.",
				},
			],
			ENENTS_COL_SETTINGS: [
				{
					name: "method",
					displayName: "Method",
					width: "130px",
				},
				{
					name: "description",
					displayName: "Description",
				},
			],
			ENENTS_TABLE_DATA: [
				{
					method: "@change(event)",
					description: "Triggered on value change.",
				},
				{
					method: "@focus(event)",
					description: "Triggered on value gainning focus.",
				},
				{
					method: "@blur(event)",
					description: "Triggered on value lossing focus",
				},
				{
					method: "setValue(value)",
					description: "Set value of the control.",
				},
				{
					method: "getValue()",
					description: "Get value of the control.",
				},
			],
		};
	},
	methods: {
		updateWidgit: function (event) {
			this.state.widgit = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updatePlaceholder: function (event) {
			this.state.placeholder = event.target.value;
		},
		updateError: function (event) {
			this.state.error = event.target.value;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
	},
	mounted: function () {
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
	updated: function () {
		this.state.codeStructure = `${this.$refs.control.$el.outerHTML}`;
	},
};
</script>