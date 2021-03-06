<style lang="less">
@import "../../controls/style/theme/theme.less";

.Nav-slide > .SlideoutContent {
	background-color: @grey-100;
	color: @white !important;

	.Navigator {
		width: 250px;

		.DropdownContent div.Button {
			width: 100%;

			&:not(:last-child) {
				margin-bottom: 4px;
			}

			&.selected {
				border-left: 4px solid @primary-060;
			}
		}
	}
}
</style>

<template>
	<Slideout class="Nav-slide" ref="nav" @show="() => {}" @hide="onHide">
		<div slot="content" class="Navigator">
			<Logo />
			<Dropdown
				ref="categories"
				v-for="(category, i) in Object.keys(categories)"
				:key="category"
				:title="category"
				colorStyle="dark"
				size="large"
				@expand="(event) => expandCategory(event, i)"
			>
				<div slot="content">
					<Button
						v-bind:class="[term === pageContent ? 'selected' : '']"
						v-for="term in categories[category]"
						:key="term.widgetName"
						:value="term.displayName"
						btnStyle="dark"
						size="large"
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
		pageContent: function () {
			return this.$store.state.uiDemo.mainContentView;
		},
	},
	methods: {
		switchContextTerm: function (term) {
			this.$refs.nav.hideSlideout();
			store.dispatch("uiDemo/switchMainContent", term);
		},
		onHide: function () {
			store.dispatch("uiDemo/hideNav");
		},
		expandCategory: function (event, index) {
			const categories = this.$refs.categories || [];
			categories.forEach((category, i) => {
				if (i !== index) {
					category.collaspeDropDown();
				}
			});
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