<style lang="less">
.SeparatorDemo .temp-wrapper {
	width: 80%;
	height: 80%;
	position: relative;
}
</style>

<template>
	<div class="SeparatorDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used to divide views.</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<div
				class="temp-wrapper HLayout align-center flow-center"
				slot="widgit"
			>
				<Separator
					ref="control"
					:direction="state.direction"
					:thickness="state.thickness"
					:color="state.color"
				/>
			</div>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Direction:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.direction"
						:options="DIRECTIONS"
						@change="updateDirection"
					/>
				</LabelWrapper>

				<LabelWrapper value="Color:" size="small">
					<ColorInput
						slot="labelContent"
						:value="state.color"
						@change="updateColor"
					/>
				</LabelWrapper>

				<LabelWrapper value="Thickness:" size="small">
					<Number
						slot="labelContent"
						:value="state.thickness"
						@blur="updateThickness"
						placeholder="Thickness"
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

import Separator from "../../../controls/vue/layout/Separator.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import Number from "../../../controls/vue/inputs/Number.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "SeparatorDemo",
	displayName: "Separator",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Separator,
		DisplayText,
		LabelWrapper,
		SingleSelect,
		Number,
		ColorInput,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			DIRECTIONS: ["Horizontal", "Vertical"],
			state: {
				codeStructure: "",
				direction: "Horizontal",
				thickness: 1,
				color: "#000000",
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
					prop: "direction",
					type: "String",
					default: "horizontal",
					required: "",
					description:
						"Direction of the separator, Options are horizontal and vertical.",
				},
				{
					prop: "thickness",
					type: "Number",
					default: "0",
					required: "",
					description: "Thickness of the separator.",
				},
				{
					prop: "color",
					type: "Hex",
					default: "",
					required: "",
					description: "Color of the separator.",
				},
			],
		};
	},
	methods: {
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		updateColor: function (event) {
			this.state.color = event.target.value;
		},
		updateThickness: function (event) {
			this.state.thickness = parseFloat(event.target.value);
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