<template>
	<div class="ToggleDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>Toggle between two states.</p>
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

			<Toggle
				slot="widgit"
				ref="control"
				:state="true"
				:size="state.size"
				:toggleStyle="state.style"
				:onLabel="state.onLabel"
				:offLabel="state.offLabel"
				:labelType="toggleLabelType"
				:disabled="state.disabled"
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

				<LabelWrapper value="Style:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.style"
						:options="STYLES"
						@change="updateStyle"
					/>
				</LabelWrapper>

				<LabelWrapper value="On label:" size="small">
					<InputText
						slot="labelContent"
						ref="onLabel"
						:value="state.onLabel"
						@blur="updateOnLabel"
						placeholder="On label"
					/>
				</LabelWrapper>

				<LabelWrapper value="Off label:" size="small">
					<InputText
						slot="labelContent"
						ref="offLabel"
						:value="state.offLabel"
						@blur="updateOffLabel"
						placeholder="Off label"
					/>
				</LabelWrapper>

				<LabelWrapper value="Label type:" size="small">
					<Toggle
						slot="labelContent"
						:state="state.isIconLabel"
						onLabel="Icon"
						offLabel="Text"
						toggleStyle="success"
						@toggle="updateLabelType"
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

import Toggle from "../../../controls/vue/inputs/Toggle.vue";

import InputText from "../../../controls/vue/inputs/InputText.vue";
import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "ToggleDemo",
	displayName: "Toggle pill",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
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
			SIZES: ["Small", "Default", "Large", "xLarge"],
			STYLES: ["Primary", "Success", "Danger", "Info"],
			state: {
				style: "Danger",
				size: "Default",
				isIconLabel: false,
				disabled: false,
				onLabel: "On",
				offLabel: "Off",
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
					prop: "state",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Initial state of the toggle control.",
				},
				{
					prop: "size",
					type: "String",
					default: "default",
					required: "",
					description: "Size of the text.",
				},
				{
					prop: "toggleStyle",
					type: "String",
					default: "",
					required: "",
					description: "Style of the toggle control.",
				},
				{
					prop: "labelType",
					type: "String",
					default: "text",
					required: "",
					description: "Options are text and icon",
				},
				{
					prop: "onLabel",
					type: "String",
					default: "On",
					required: "",
					description:
						"On label, text label when label type is text, otherwise it represent the fontawsome icon class.",
				},
				{
					prop: "offLabel",
					type: "String",
					default: "Off",
					required: "",
					description:
						"Off label, text label when label type is text, otherwise it represent the fontawsome icon class.",
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
					method: "@click(event)",
					description: "Triggered on value clicked.",
				},
				{
					method: "getState()",
					description: "Get current control state.",
				},
			],
		};
	},
	computed: {
		toggleLabelType: function () {
			return this.state.isIconLabel ? "icon" : "text";
		},
	},
	methods: {
		updateSize: function (event) {
			this.state.size = event.target.value;
		},
		updateStyle: function (event) {
			this.state.style = event.target.value;
		},
		updateOnLabel: function (event) {
			this.state.onLabel = event.target.value;
		},
		updateOffLabel: function (event) {
			this.state.offLabel = event.target.value;
		},
		updateLabelType: function (event) {
			this.state.isIconLabel = event.target.checked;
			if (this.state.isIconLabel) {
				this.state.onLabel = "fa-check";
				this.state.offLabel = "fa-close";
				this.$refs.onLabel.setValue("fa-check");
				this.$refs.offLabel.setValue("fa-close");
			} else {
				this.state.onLabel = "On";
				this.state.offLabel = "Off";
				this.$refs.onLabel.setValue("On");
				this.$refs.offLabel.setValue("Off");
			}
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