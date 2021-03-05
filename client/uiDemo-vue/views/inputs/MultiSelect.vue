<template>
	<div class="MultiSelectDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					This control is used to display a range of options, and
					allow user to select multiple values. Could be combined with
					Label Wrapper control to provide more advance uses.
					(CheckboxGroup)
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
				:options="state.options"
				:value="state.values"
				:layout="state.layout"
				:size="state.size"
				:error="state.error"
				:disabled="state.disabled"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Type:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.widgit"
						:options="TYPES"
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

				<LabelWrapper value="Layout:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.layout"
						:options="LAYOUT"
						@change="updateLayout"
					/>
				</LabelWrapper>

				<LabelWrapper value="Error message:" size="small">
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

import CheckboxGroup from "../../../controls/vue/inputs/CheckboxGroup.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import TextArea from "../../../controls/vue/inputs/TextArea.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "MultiSelectDemo",
	displayName: "Mutiple select",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		CheckboxGroup,
		DisplayText,
		InputText,
		TextArea,
		LabelWrapper,
		SingleSelect,
		Toggle,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			TYPES: ["CheckboxGroup"],
			SIZES: ["Small", "Default", "Large", "xLarge"],
			LAYOUT: ["Vertival", "Horizontal"],
			state: {
				widgit: "CheckboxGroup",
				options: ["Item1", "Item2", "Item3", "Item4"],
				values: ["Item2", "Item3"],
				layout: "Vertival",
				size: "Default",
				error: "",
				disabled: false,
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
					prop: "options",
					type: "Array",
					default: "[<String>]",
					required: "true",
					description: "Range of options.",
				},
				{
					prop: "value",
					type: "[<String>]",
					default: "[]",
					required: "",
					description: "List of selected values.",
				},
				{
					prop: "error",
					type: "String",
					default: "",
					required: "",
					description: "Passed in error message.",
				},
				{
					prop: "layout",
					type: "String",
					default: "Vertical",
					required: "",
					description: "Layout of the checkboxes.",
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
					method: "setValueByIndexs(indexs)",
					description:
						"Set values of the control by feed in an array of selected items' indexs.",
				},
				{
					method: "setValueByValues(values)",
					description:
						"Set values of the control by feed in an array of selected items' values.",
				},
				{
					method: "getSelectedIndex()",
					description: "Get all indexs of selected values.",
				},
				{
					method: "getSelectedValue()",
					description: "Get all selected values.",
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
		updateLayout: function (event) {
			this.state.layout = event.target.value;
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