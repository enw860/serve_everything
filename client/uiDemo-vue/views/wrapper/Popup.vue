<template>
	<div class="PopupDemo">
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

			<div slot="events">
				<Table
					:colSettings="ENENTS_COL_SETTINGS"
					:tableData="ENENTS_TABLE_DATA"
				></Table>
			</div>

			<Popup
				slot="widgit"
				ref="control"
				:value="state.value"
				:size="state.size"
				:direction="state.direction"
			>
				<Button
					slot="trigger"
					value="Click me"
					btnStyle="Danger"
					@click="showPopup"
				/>
			</Popup>

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

				<LabelWrapper value="Direction:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.direction"
						:options="DIRECTIONS"
						@change="updateDirection"
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

import Popup from "../../../controls/vue/Wrapper/Popup.vue";

import Button from "../../../controls/vue/infomational/Button.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";

export default {
	name: "PopupDemo",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Popup,
		Button,
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
			DIRECTIONS: ["Right", "Left"],
			SIZES: ["Small", "Default", "Large", "xLarge"],
			state: {
				codeStructure: "",
				value: [
					{
						name: "Center",
						icon: "fa-align-center",
						method: () => alert("Align center"),
						disabled: false,
					},
					{
						name: "Justify",
						icon: "fa-align-justify",
						method: () => alert("Align justify"),
						disabled: false,
					},
					{
						name: "Left",
						icon: "fa-align-left",
						method: () => alert("Align left"),
						disabled: false,
					},
					{
						name: "Right",
						icon: "fa-align-right",
						method: () => alert("Align right"),
						disabled: true,
					},
				],
				direction: "Right",
				size: "Default",
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
					type: "Array",
					default: "[]",
					required: "",
					description:
						"Options of the popup menu. {name, icon, method, disabled}",
				},
				{
					prop: "direction",
					type: "String",
					default: "left",
					required: "",
					description:
						"Position of the icon in pop up menu. Options are left and right",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
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
					method: "showPopup()",
					description: "Display the popup menu.",
				},
				{
					method: "hidePopup(event)",
					description: "Hide the popup menu.",
				},
			],
		};
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		showPopup: function (event) {
			this.$refs.control.showPopup();
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