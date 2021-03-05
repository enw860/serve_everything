<template>
	<div class="LabelWrapperDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to add a label for control.</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<LabelWrapper
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:position="state.position"
				:required="state.required"
				:disabled="state.disabled"
			>
				<InputText slot="labelContent" placeholder="Demo input" />
			</LabelWrapper>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Label:" size="small">
					<InputText
						slot="labelContent"
						:value="state.value"
						@blur="updateLabel"
						placeholder="Label"
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

				<LabelWrapper value="Position:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.position"
						:options="POSITIONS"
						@change="updatePosition"
					/>
				</LabelWrapper>

				<LabelWrapper value="Ruquired:" size="small">
					<Toggle
						slot="labelContent"
						onLabel="Required"
						offLabel="Not required"
						toggleStyle="success"
						:state="state.required"
						@toggle="updateRequired"
					/>
				</LabelWrapper>

				<LabelWrapper value="Disable:" size="small">
					<Toggle
						slot="labelContent"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						:state="state.disabled"
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

import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";

export default {
	name: "LabelWrapperDemo",
	displayName: "Label wrapper",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		DisplayText,
		LabelWrapper,
		SingleSelect,
		InputText,
		HTMLTextLoader,
		Table,
		Toggle,
	},
	data: function () {
		return {
			POSITIONS: ["Top", "Left"],
			SIZES: ["Small", "Default", "Large", "xLarge"],
			state: {
				codeStructure: "",
				value: "This is a testing title: ",
				position: "Top",
				size: "Default",
				required: false,
				disabled: false,
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
					prop: "value",
					type: "String",
					default: "Title",
					required: "",
					description: "Context of the label.",
				},
				{
					prop: "position",
					type: "String",
					default: "top",
					required: "",
					description:
						"Position of the label. Options are left and top",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description:
						"Size of the label and the inner control size.",
				},
				{
					prop: "required",
					type: "Boolean",
					default: "false",
					required: "",
					description: "State if the field is required.",
				},
				{
					prop: "disabled",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Disabled the label and the inner context.",
				},
			],
		};
	},
	methods: {
		updateLabel: function (event) {
			this.state.value = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updatePosition: function (event) {
			this.state.position = event.target.value;
		},
		updateRequired: function (event) {
			this.state.required = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = event.target.checked;
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