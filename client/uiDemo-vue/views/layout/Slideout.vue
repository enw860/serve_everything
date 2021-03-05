<style lang="less">
.SlideoutDemo {
	textarea {
		resize: vertical;
	}

	.temp-block {
		height: 100%;
		width: 350px;
		background-color: #000000;
	}
}
</style>

<template>
	<div class="SlideoutDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>This control is used as slideout.</p>
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

			<div
				class="temp-wrapper HLayout align-center flow-center"
				slot="widgit"
			>
				<Slideout
					ref="control"
					:direction="state.direction"
					@show="onShow"
					@hide="onHide"
				>
					<div
						class="temp-block VLayout flow-center align-center"
						slot="content"
					>
						<DisplayText
							value="<This is a demo block>"
							size="xxxlarge"
							color="#ffffff"
						/>
					</div>
				</Slideout>
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

				<LabelWrapper value="On click:" size="small">
					<TextArea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onShowFuncBody"
						@blur="updateOnShowFuncBody"
					/>
				</LabelWrapper>

				<LabelWrapper value="On click:" size="small">
					<TextArea
						slot="labelContent"
						placeholder="function (event) { <body> }"
						:value="state.onHideFuncBody"
						@blur="updateOnHideFuncBody"
					/>
				</LabelWrapper>

				<Button
					value="Show slideout"
					size="Large"
					btnStyle="Primary"
					@click="launchSlideout"
				/>
			</div>

			<HTMLTextLoader slot="structure" :value="state.codeStructure" />
		</ControlDemoTemplate>
	</div>
</template>

<script>
import WidgitDemo from "../../components/WidgitDemo.vue";
import ControlDemoTemplate from "../ControlDemoTemplate.vue";

import Slideout from "../../../controls/vue/layout/Slideout.vue";

import DisplayText from "../../../controls/vue/infomational/DisplayText.vue";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import Button from "../../../controls/vue/infomational/Button.vue";
import TextArea from "../../../controls/vue/inputs/TextArea.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "SlideoutDemo",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Slideout,
		DisplayText,
		LabelWrapper,
		SingleSelect,
		Button,
		TextArea,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			DIRECTIONS: ["Left", "Right"],
			state: {
				codeStructure: "",
				direction: "Left",
				onShowFuncBody: "console.warn('Show slideout');",
				onHideFuncBody: "console.warn('Hide slideout');",
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
					default: "left",
					required: "",
					description:
						"Direction of the slideout, Options are left and right.",
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
					method: "@show",
					description: "Triggered on slideout show up.",
				},
				{
					method: "@hide",
					description: "Triggered on slideout hide.",
				},
				{
					method: "showSlideout(event)",
					description: "Show the slideout.",
				},
				{
					method: "hideSlideout(event)",
					description: "Hide the slideout.",
				},
			],
		};
	},
	methods: {
		updateDirection: function (event) {
			this.state.direction = event.target.value;
		},
		launchSlideout: function (event) {
			this.$refs.control.showSlideout();
		},
		updateOnShowFuncBody: function (event) {
			this.state.onShowFuncBody = event.target.value;
		},
		updateOnHideFuncBody: function (event) {
			this.state.onHideFuncBody = event.target.value;
		},
		onShow: function (event) {
			(() => eval(this.state.onShowFuncBody))(event);
		},
		onHide: function (event) {
			(() => eval(this.state.onHideFuncBody))(event);
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