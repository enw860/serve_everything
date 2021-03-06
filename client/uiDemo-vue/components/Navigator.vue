<style lang="less">
@import "../../controls/style/theme/theme.less";

.NavigatorWrapper {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	border-right: 1px solid @white;
}

.Nav-slide.NavigatorWrapper,
.Nav-slide .SlideoutContent {
	width: 250px;
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
	<component
		v-bind:is="navigatorType"
		v-bind:class="[navigatorType === 'div' ? 'NavigatorWrapper' : '']"
		class="Nav-slide"
		ref="nav"
		@show="() => {}"
		@hide="onHide"
	>
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
	</component>
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
			navigatorType: "div",
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
		screenMode: function () {
			return this.$store.state.uiDemo.screenMode;
		},
		displayNav: function () {
			return this.$store.state.uiDemo.displayNav;
		},
		pageContent: function () {
			return this.$store.state.uiDemo.mainContentView;
		},
	},
	methods: {
		switchContextTerm: function (term) {
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
			newVal &&
				this.$refs.nav.showSlideout &&
				this.$refs.nav.showSlideout();
		},

		screenMode(newVal, oldVal) {
			this.navigatorType = newVal === "small" ? "Slideout" : "div";
			this.$refs.nav.hideSlideout && this.$refs.nav.hideSlideout();
		},
	},
	beforeDestroy: function () {
		this.unwatch();
	},
};
</script>