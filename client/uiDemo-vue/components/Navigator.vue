<style lang="less">
@import "../../controls/style/theme/theme.less";

.Nav-slide > .SlideoutContent {
	background-color: @grey-100;
	color: @white !important;

	.Navigator {
		width: 250px;

		.DropdownContent div.Button {
			width: 100%;
		}
	}
}
</style>

<template>
	<Slideout class="Nav-slide" ref="nav" @show="() => {}" @hide="onHide">
		<div slot="content" class="Navigator">
			<Logo />
			<Dropdown
				v-for="category in Object.keys(categories)"
				:key="category"
				:title="category"
				colorStyle="dark"
			>
				<div slot="content">
					<Button
						v-for="term in categories[category]"
						:key="term.widgetName"
						:value="term.displayName"
						btnStyle="dark"
						@click="() => switchContextTerm(term)"
					></Button>
				</div>
			</Dropdown>
		</div>
	</Slideout>
</template>

<script>
import store from "../store/store";
import Logo from "./Logo.vue";
import Slideout from "../../controls/vue/layout/Slideout.vue";
import Button from "../../controls/vue/infomational/Button.vue";
import Dropdown from "../../controls/vue/Wrapper/Dropdown.vue";

export default {
	name: "Navigator",
	components: {
		Logo,
		Slideout,
		Button,
		Dropdown,
	},
	data: function () {
		return {
			categories: {
				Infomational: [
					{
						category: "Infomational",
						displayName: "Avatar",
						widgetName: "AvatarDemo",
					},
					{
						category: "Infomational",
						displayName: "Badge",
						widgetName: "BadgeDemo",
					},
					{
						category: "Infomational",
						displayName: "Breadcrumbs",
						widgetName: "BreadCrumbsDemo",
					},
					{
						category: "Infomational",
						displayName: "Button",
						widgetName: "ButtonDemo",
					},
					{
						category: "Infomational",
						displayName: "Clock",
						widgetName: "ClockDemo",
					},
					{
						category: "Infomational",
						displayName: "Display text",
						widgetName: "DisplayTextDemo",
					},
					{
						category: "Infomational",
						displayName: "Link",
						widgetName: "LinkDemo",
					},
				],
				Inputs: [
					{
						category: "Inputs",
						displayName: "Checkbox Group",
						widgetName: "CheckboxGroupDemo",
					},
					{
						category: "Inputs",
						displayName: "Radio Group",
						widgetName: "RadioGroupDemo",
					},
					{
						category: "Inputs",
						displayName: "Inputs",
						widgetName: "InputsDemo",
					},
					{
						category: "Inputs",
						displayName: "File selector",
						widgetName: "FileInputDemo",
					},
				],
				Layout: [
					{
						category: "Layout",
						displayName: "Divide Line",
						widgetName: "DivideLine",
					},
					{
						category: "Layout",
						displayName: "Mask Layer",
						widgetName: "MaskLayer",
					},
				],
				Wrapper: [
					{
						category: "Wrapper",
						displayName: "Drop Down",
						widgetName: "DropDown",
					},
					{
						category: "Wrapper",
						displayName: "Label Wrapper",
						widgetName: "LabelWrapper",
					},
				],
			},
		};
	},
	computed: {
		displayNav: function () {
			return this.$store.state.uiDemo.displayNav;
		},
	},
	methods: {
		switchContextTerm: function (term) {
			store.dispatch("uiDemo/switchMainContent", term);
		},
		onHide: function () {
			store.dispatch("uiDemo/hideNav");
		},
	},
	watch: {
		displayNav: function (newVal, oldVal) {
			newVal && this.$refs.nav.showSlideout();
		},
	},
	beforeDestroy: function () {
		this.unwatch();
	},
};
</script>