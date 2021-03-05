<template>
	<div class="ClockDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>The button control is used to display time.</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<Clock
				slot="widgit"
				ref="control"
				:clockSize="parseFloat(state.clockSize)"
				:format="state.timeFormat"
				:fontSize="state.fontSize"
				:timezoneOffset="state.timezoneOffset"
				:showTimeString="state.showTimeString"
				:showDateString="state.showDateString"
			/>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Clock size:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.clockSize"
						:options="CLOCK_SIZES"
						@change="updateClockSize"
					/>
				</LabelWrapper>

				<LabelWrapper value="Time format:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.timeFormat"
						:options="TIME_FORMAT"
						@change="updateTimeFormat"
					/>
				</LabelWrapper>

				<LabelWrapper value="Font size:" size="small">
					<InputText
						slot="labelContent"
						placeholder="Font size"
						:value="state.fontSize"
						@blur="updateFontSize"
					/>
				</LabelWrapper>

				<LabelWrapper value="Time zone offset:" size="small">
					<Number
						slot="labelContent"
						placeholder="Time zone in hours"
						:value="state.timezoneOffset"
						@blur="updateTimezoneOffset"
					/>
				</LabelWrapper>

				<LabelWrapper value="Show time string:" size="small">
					<Toggle
						slot="labelContent"
						onLabel="Show"
						offLabel="Hide"
						toggleStyle="success"
						:state="state.showTimeString"
						@toggle="updateShowTimeString"
					/>
				</LabelWrapper>

				<LabelWrapper value="Show date stirng:" size="small">
					<Toggle
						slot="labelContent"
						onLabel="Show"
						offLabel="Hide"
						toggleStyle="success"
						:state="state.showTimeString"
						@toggle="updateShowDateString"
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

import Clock from "../../../controls/vue/infomational/Clock.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import InputText from "../../../controls/vue/inputs/InputText.vue";
import Number from "../../../controls/vue/inputs/Number.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "ClockDemo",
	displayName: "Clock",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Clock,
		DisplayText,
		InputText,
		Number,
		LabelWrapper,
		SingleSelect,
		Toggle,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			CLOCK_SIZES: ["100", "150", "200", "250", "300"],
			TIME_FORMAT: ["hh:mm", "hh:mm:ss", "dd:hh:ss:mm"],
			state: {
				codeStructure: "",
				clockSize: "150",
				timeFormat: "hh:mm:ss",
				fontSize: "0.7em",
				timezoneOffset: 0,
				showTimeString: false,
				showDateString: false,
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
					prop: "clockSize",
					type: "Number",
					default: "150",
					required: "",
					description: "Width and height of the clock control",
				},
				{
					prop: "format",
					type: "String",
					default: "hh:mm:ss",
					required: "",
					description: "Time format of the displayed time string",
				},
				{
					prop: "fontSize",
					type: "String",
					default: "0.7em",
					required: "",
					description: "Font size of the time string",
				},
				{
					prop: "timezoneOffset",
					type: "Number",
					default: "0",
					required: "",
					description: "Time zone offset in hours",
				},
				{
					prop: "showTimeString",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Display time string or not.",
				},
				{
					prop: "showDateString",
					type: "Boolean",
					default: "false",
					required: "",
					description: "Display date string or not",
				},
			],
		};
	},
	methods: {
		updateClockSize: function (event) {
			this.state.clockSize = event.target.value;
		},
		updateTimeFormat: function (event) {
			this.state.timeFormat = event.target.value;
		},
		updateFontSize: function (event) {
			this.state.fontSize = event.target.value;
		},
		updateTimezoneOffset: function (event) {
			this.state.timezoneOffset = parseFloat(event.target.value);
		},
		updateShowTimeString: function (event) {
			this.state.showTimeString = event.target.checked;
		},
		updateShowDateString: function (event) {
			this.state.showDateString = event.target.checked;
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