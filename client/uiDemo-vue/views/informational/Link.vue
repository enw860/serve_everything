<style lang="less">
.LinkDemo textarea {
	resize: vertical;
}
</style>

<template>
	<div class="LinkDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to display a link.</p>
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

			<Link
				slot="widgit"
				ref="control"
				:value="state.value"
				:href="state.href"
				:size="state.fontSize"
				:fontWeight="parseInt(state.fontWeight)"
				:color="state.color"
				:openInNewTab="state.openInNewTab"
				:disabled="state.disabled"
				@click="linkOnClick"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Value:" size="small">
					<InputText
						slot="labelContent"
						:value="state.value"
						@blur="updateValue"
						placeholder="Text"
					/>
				</LabelWrapper>

				<LabelWrapper value="Href:" size="small">
					<InputText
						slot="labelContent"
						:value="state.href"
						@blur="updateHref"
						placeholder="link"
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

				<LabelWrapper value="On click:" size="small">
					<TextArea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onClickFunctionBody"
						@blur="updateFunctionBody"
					/>
				</LabelWrapper>

				<LabelWrapper value="Open in a new tab:" size="small">
					<Toggle
						slot="labelContent"
						:state="state.openInNewTab"
						onLabel="True"
						offLabel="False"
						toggleStyle="success"
						@toggle="updateOpenInNewTab"
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

import Link from "../../../controls/vue/infomational/Link.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import TextArea from "../../../controls/vue/inputs/TextArea.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "LinkDemo",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Link,
		DisplayText,
		InputText,
		TextArea,
		LabelWrapper,
		SingleSelect,
		ColorInput,
		Toggle,
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
				color: "#0f62fe",
				href: "",
				openInNewTab: true,
				disabled: false,
				onClickFunctionBody: "javascript:void(0);",
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
				{
					prop: "herf",
					type: "String",
					default: "",
					required: "",
					description: "The relevant link.",
				},
				{
					prop: "openInNewTab",
					type: "Boolean",
					default: "true",
					required: "",
					description: "Open the link address in a new window.",
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
					method: "@click",
					description:
						"Customized binded action, triggered on link onclick.",
				},
				{
					method: "onclick",
					description:
						"External control, triggers on button link event.",
				},
			],
		};
	},
	methods: {
		updateValue: function (event) {
			this.state.value = event.target.value;
		},
		updateHref: function (event) {
			this.state.href = event.target.value;
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
		updateFunctionBody: function (event) {
			this.state.onClickFunctionBody = event.target.value;
		},
		updateOpenInNewTab: function (event) {
			this.state.openInNewTab = event.target.checked;
		},
		updateDisabled: function (event) {
			this.state.disabled = !event.target.checked;
		},
		linkOnClick: function (event) {
			(() => eval(this.state.onClickFunctionBody))(event);
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