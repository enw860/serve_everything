<template>
	<div class="DisplayTextDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to display plain text.</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<DisplayText
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.color"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Value:" size="small">
					<InputText
						ref="content"
						slot="labelContent"
						:value="state.value"
						@blur="updateValue"
						placeholder="Text"
					/>
				</LabelWrapper>

				<LabelWrapper value="Font size:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.fontSize"
						:options="FONT_SIZES"
						@change="updateFontSize"
					/>
				</LabelWrapper>

				<LabelWrapper value="Font weight:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
						@change="updateFontWeight"
					/>
				</LabelWrapper>

				<LabelWrapper value="Font color:" size="small">
					<ColorInput
						slot="labelContent"
						:value="state.color"
						@change="updateFontColor"
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

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";

import LabelWrapper from "../../../controls/vue/wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "DisplayTextDemo",
	displayName: "Plain text",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		DisplayText,
		InputText,
		LabelWrapper,
		SingleSelect,
		ColorInput,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			FONT_SIZES: [
				"Default",
				"xSmall",
				"Small",
				"Large",
				"xLarge",
				"xxLarge",
				"xxxLarge",
			],
			FONT_WEIGHT: ["400", "600", "800"],
			state: {
				value: "Some text",
				fontSize: "Default",
				fontWeight: "400",
				color: "#000",
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
					prop: "value",
					type: "String",
					default: "",
					required: "true",
					description: "Content of display.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "fontWeight",
					type: "Number",
					default: 400,
					required: "",
					description: "Font weight of the text.",
				},
				{
					prop: "color",
					type: "Hex",
					default: "#000000",
					required: "",
					description: "Font color of the text.",
				},
			],
		};
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateFontWeight: function (event) {
			this.state.fontWeight = event.target.value;
		},
		updateFontColor: function (event) {
			this.state.color = event.target.value;
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