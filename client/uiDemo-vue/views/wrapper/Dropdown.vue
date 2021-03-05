<style lang="less">
.DropdownDemo {
	.temp-block {
		height: 150px;
		width: 200px;
		background-color: white;
	}
}
</style>

<template>
	<div class="DropdownDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to hide and expand views.</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<Dropdown
				slot="widgit"
				ref="control"
				:title="state.title"
				:expanded="state.expanded"
				:colorStyle="state.colorStyle"
				:size="state.size"
			>
				<div
					class="temp-block VLayout flow-center align-center"
					slot="content"
				>
					<DisplayText
						value="<Demo block>"
						size="xxxlarge"
						color="#000000"
					/>
				</div>
			</Dropdown>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Title:" size="small">
					<InputText
						slot="labelContent"
						:value="state.title"
						@blur="updateTitle"
						placeholder="Title"
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

				<LabelWrapper value="Style:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.colorStyle"
						:options="STYLES"
						@change="updateColorStyle"
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

import Dropdown from "../../../controls/vue/Wrapper/Dropdown.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "DropdownDemo",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Dropdown,
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
			SIZES: ["Small", "Default", "Large", "xLarge"],
			STYLES: ["Default", "Dark"],
			state: {
				codeStructure: "",
				expanded: false,
				title: "This is a demo block",
				size: "Default",
				colorStyle: "Default",
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
					prop: "title",
					type: "String",
					default: "Title",
					required: "",
					description: "Title of the expanded control.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the expanded control",
				},
				{
					prop: "colorStyle",
					type: "String",
					default: "default",
					required: "",
					description: "Color of the expanded control.",
				},
				{
					prop: "expanded",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Init state of the expanded control.",
				},
			],
		};
	},
	methods: {
		updateTitle: function (event) {
			this.state.title = event.target.value;
		},
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateColorStyle: function (event) {
			this.state.colorStyle = event.target.value;
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