<template>
	<div class="BreadCrumbsDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					The breadcrumbs are often used as page navigators. The flow
					of breadcrumbs shows the depth of the page. (the last anchor
					is always disabled)
				</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<BreadCrumbs
				slot="widgit"
				ref="control"
				:steps="state.steps"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.fontColor"
				:separator="state.separator"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Font weight:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.fontWeight"
						:options="FONT_WEIGHT"
						@change="updateFontWeight"
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

				<LabelWrapper value="Font color:" size="small">
					<ColorInput
						slot="labelContent"
						:value="state.fontColor"
						@change="updateFontColor"
					/>
				</LabelWrapper>

				<LabelWrapper value="Separator:" size="small">
					<InputText
						slot="labelContent"
						:value="state.separator"
						@blur="updateSeparator"
						placeholder="Sparator"
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

import BreadCrumbs from "../../../controls/vue/infomational/BreadCrumbs.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "BreadCrumbsDemo",
	displayName: "Bread crumbs",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		BreadCrumbs,
		DisplayText,
		LabelWrapper,
		SingleSelect,
		InputText,
		ColorInput,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			FONT_SIZES: ["Default", "Xsmall", "Small", "Large", "xlarge"],
			FONT_WEIGHT: ["400", "500", "600", "700", "800"],
			state: {
				steps: [
					{ name: "Link1", click: () => alert("Link1") },
					{ name: "Link2", click: () => alert("Link2") },
					{ name: "Link3", click: () => alert("Link3") },
				],
				codeStructure: "",
				separator: "/",
				fontSize: "Default",
				fontWeight: "400",
				fontColor: "#0f62fe",
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
					prop: "steps",
					type: "Array",
					default: "[ ]",
					required: "",
					description: "[{name: <name>, click: <function>}...]",
				},
				{
					prop: "size",
					type: "String",
					default: "auto",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "fontWeight",
					type: "Number",
					default: "400",
					required: "",
					description: "Font weight of the text.",
				},
				{
					prop: "color",
					type: "Hex",
					default: "",
					required: "",
					description: "Font color of the text.",
				},
				{
					prop: "separator",
					type: "String",
					default: "/",
					required: "",
					description: "Delimiter of bread crumbs.",
				},
			],
		};
	},
	methods: {
		updateFontColor: function (event) {
			this.state.fontColor = event.target.value;
		},
		updateFontWeight: function (event) {
			this.state.fontWeight = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateSeparator: function (event) {
			this.state.separator = event.target.value;
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