<template>
	<div class="ButtonDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					The button control is used to perform some actions while
					being clicked. Could be also used as an static icon (e.g.
					empty btn value + icon + no on click function)
				</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<Button
				slot="widgit"
				ref="control"
				:value="state.value"
				:icon="state.icon"
				:iconPosition="state.iconPosition"
				:btnStyle="state.btnStyle"
				:size="state.btnSize"
				:disabled="!state.isActive"
				@click="btnOnClick"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Button text:" size="small">
					<InputText
						slot="labelContent"
						placeholder="Button text"
						:value="state.value"
						@blur="updateButtonValue"
					/>
				</LabelWrapper>

				<LabelWrapper value="Icon:" size="small">
					<InputText
						slot="labelContent"
						placeholder="Fontawsome icon class"
						:value="state.icon"
						@blur="updateIcon"
					/>
				</LabelWrapper>

				<LabelWrapper value="Icon position:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.iconPosition"
						:options="ICON_POSITION"
						@change="updateIconPosition"
					/>
				</LabelWrapper>

				<LabelWrapper value="Button size:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.btnSize"
						:options="SIZES"
						@change="updateBtnSize"
					/>
				</LabelWrapper>

				<LabelWrapper value="Button style:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.btnStyle"
						:options="BUTTON_STYLE"
						@change="updateBtnStyle"
					/>
				</LabelWrapper>

				<LabelWrapper value="Disable:" size="small">
					<Toggle
						slot="labelContent"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
						:state="state.isActive"
						@toggle="updateActive"
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

import Button from "../../../controls/vue/infomational/Button.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "ButtonDemo",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Button,
		DisplayText,
		InputText,
		LabelWrapper,
		SingleSelect,
		Toggle,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			SIZES: ["Default", "Small", "Large", "xLarge"],
			ICON_POSITION: ["left", "right"],
			BUTTON_STYLE: [
				"Default",
				"Primary",
				"Success",
				"Danger",
				"Info",
				"Dark",
				"White",
				"Transparent",
			],
			state: {
				codeStructure: "",
				value: "Click me",
				icon: "",
				iconPosition: "left",
				btnStyle: "Primary",
				btnSize: "Default",
				isActive: true,
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
					default: "Button",
					required: "true",
					description: "Context of button control.",
				},
				{
					prop: "size",
					type: "String",
					default: "Default",
					required: "",
					description: "Size of the button control.",
				},
				{
					prop: "icon",
					type: "String",
					default: "",
					required: "",
					description: "Fontawsome icon class, e.g fa-apple.",
				},
				{
					prop: "iconPosition",
					type: "String",
					default: "left",
					required: "",
					description: "Position of the icon, either left or right.",
				},
				{
					prop: "btnStyle",
					type: "String",
					default: "Default",
					required: "",
					description: "Predefined button color style.",
				},
				{
					prop: "disabled",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Whether the button is disabled or not.",
				},
				{
					prop: "@click",
					type: "event",
					default: "",
					required: "",
					description: "On click function.",
				},
			],
		};
	},
	methods: {
		updateButtonValue: function (event) {
			this.state.value = event.target.value;
		},
		updateIcon: function (event) {
			this.state.icon = event.target.value;
		},
		updateIconPosition: function (event) {
			this.state.iconPosition = event.target.value;
		},
		updateBtnSize: function (event) {
			this.state.btnSize = event.target.value;
		},
		updateBtnStyle: function (event) {
			this.state.btnStyle = event.target.value;
		},
		updateActive: function (event) {
			this.state.isActive = event.target.checked;
		},
		btnOnClick: function (event) {
			alert("Response to click action on button");
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