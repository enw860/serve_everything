<template>
	<div class="FileInputDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>Use to upload one or more files.</p>
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

			<FileInput
				slot="widgit"
				ref="control"
				:size="state.size"
				:disabled="state.disabled"
				:multipleFile="state.multipleFiles"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Size:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.size"
						:options="SIZES"
						@change="updateSize"
					/>
				</LabelWrapper>

				<LabelWrapper value="Enable select multiple file:" size="small">
					<Toggle
						slot="labelContent"
						:state="state.multipleFiles"
						onLabel="Multiple files"
						offLabel="Single file"
						toggleStyle="success"
						@toggle="updateMultipleFiles"
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

import FileInput from "../../../controls/vue/inputs/FileInput.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "FileInputDemo",
	displayName: "File input",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		DisplayText,
		FileInput,
		LabelWrapper,
		SingleSelect,
		Toggle,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			SIZES: ["Small", "Default", "Large", "xLarge"],
			state: {
				size: "Default",
				disabled: false,
				multipleFiles: false,
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
					prop: "multipleFile",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Enable to choose multiple files.",
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
					method: "getValue()",
					description: "Get choosed file/files.",
				},
			],
		};
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateMultipleFiles: function (event) {
			this.state.multipleFiles = event.target.checked;
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