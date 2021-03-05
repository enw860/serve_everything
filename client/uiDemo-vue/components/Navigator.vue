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

import InformationalDC from "../views/informational";
import InputsDC from "../views/inputs";
import LayoutDC from "../views/layout";
import WrapperDC from "../views/wrapper";

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
				Infomational: InformationalDC.map((control) => {
					return {
						category: "Infomational",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Inputs: InputsDC.map((control) => {
					return {
						category: "Inputs",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Layout: LayoutDC.map((control) => {
					return {
						category: "Layout",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
				Wrapper: WrapperDC.map((control) => {
					return {
						category: "Wrapper",
						displayName: control.displayName || control.name,
						widgetName: control.name,
					};
				}),
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