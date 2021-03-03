<template>
	<div class="BadgeDemo">
		<ControlDemoTemplate>
			<div slot="overview">
				<p>
					The badge is a sub-component of avatar. It is used to
					representing if there is an update for a user/events.
				</p>
			</div>

			<div slot="properties">
				<Table
					:colSettings="PROPS_COL_SETTINGS"
					:tableData="PROPS_TABLE_DATA"
				></Table>
			</div>

			<Avatar
				slot="widgit"
				content="Lionel Wu"
				avatarSize="large"
				:shape="state.shape"
				:isActive="state.isActive"
			>
				<Badge
					ref="badge"
					slot="badge"
					:content="state.content"
					:vPosition="state.vPosition"
					:backgroundColor="state.backgroundColor"
				/>
			</Avatar>

			<div slot="control">
				<DisplayText value="Controls" size="xxxlarge" />

				<LabelWrapper value="Badge content:" size="small">
					<Number
						ref="content"
						slot="labelContent"
						:value="state.content"
						@blur="updateContent"
						placeholder="Please enter a positive number"
					/>
				</LabelWrapper>

				<LabelWrapper value="Badge background color:" size="small">
					<ColorInput
						slot="labelContent"
						:value="state.backgroundColor"
						@change="updateBackgroundColor"
					/>
				</LabelWrapper>

				<LabelWrapper value="Badge position:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.vPosition"
						:options="VPOSITION"
						@change="updatePosition"
					/>
				</LabelWrapper>

				<LabelWrapper value="Avatar shape:" size="small">
					<SingleSelect
						slot="labelContent"
						:value="state.shape"
						:options="SHAPES"
						@change="updateShape"
					/>
				</LabelWrapper>

				<LabelWrapper value="Avatar status:" size="small">
					<Toggle
						slot="labelContent"
						:state="state.isActive"
						onLabel="Active"
						offLabel="Disabled"
						toggleStyle="success"
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

import Avatar from "../../../controls/vue/infomational/Avatar.vue";
import Badge from "../../../controls/vue/infomational/Badge.vue";

import DisplayText from "../../controls/vue/infomational/DisplayText";
import LabelWrapper from "../../../controls/vue/Wrapper/LabelWrapper.vue";
import SingleSelect from "../../../controls/vue/inputs/SingleSelect.vue";
import Number from "../../../controls/vue/inputs/Number.vue";
import ColorInput from "../../../controls/vue/inputs/ColorInput.vue";
import Toggle from "../../../controls/vue/inputs/Toggle.vue";
import HTMLTextLoader from "../../../controls/vue/infomational/HTMLTextLoader.vue";
import Table from "../../../controls/vue/infomational/Table.vue";

export default {
	name: "BadgeDemo",
	components: {
		WidgitDemo,
		ControlDemoTemplate,
		Avatar,
		Badge,
		DisplayText,
		Number,
		LabelWrapper,
		SingleSelect,
		ColorInput,
		Toggle,
		HTMLTextLoader,
		Table,
	},
	data: function () {
		return {
			SHAPES: ["Round", "Square"],
			SIZES: ["Default", "Small", "Large", "xLarge"],
			VPOSITION: ["Top", "Center", "Bottom"],
			state: {
				isActive: true,
				shape: "Square",
				content: 18,
				vPosition: "Top",
				backgroundColor: "#da1e28",
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
					prop: "content",
					type: "Number",
					default: "99",
					required: "true",
					description:
						"Number of news. will cap to +99 if the value greater than 99 or -99 if less than -99.",
				},
				{
					prop: "vPosition",
					type: "String",
					default: "Top",
					required: "",
					description: "Position where the badge shows.",
				},
				{
					prop: "backgroundColor",
					type: "Hex",
					default: "#da1e28",
					required: "",
					description: "Background color of the badge control.",
				},
			],
		};
	},
	methods: {
		updateContent: function (event) {
			this.state.content = parseInt(this.$refs.content.getValue());
		},
		updateBackgroundColor: function (event) {
			this.state.backgroundColor = event.target.value;
		},
		updatePosition: function (event) {
			this.state.vPosition = event.target.value;
		},
		updateShape: function (event) {
			this.state.shape = event.target.value;
		},
		updateActive: function (event) {
			this.state.isActive = event.target.checked;
		},
	},
	mounted: function () {
		this.state.codeStructure = `${this.$refs.badge.$el.outerHTML}`;
	},
	updated: function () {
		this.state.codeStructure = `${this.$refs.badge.$el.outerHTML}`;
	},
};
</script>