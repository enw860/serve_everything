<style lang="less">
@import "../../controls/style/theme/theme.less";

.PageContentHeader {
	width: 100%;
	background-color: @grey-100;
	color: @white;
	padding: 64px 10% 32px 10%;
	border-bottom: 1px solid @grey-070;

	> .category {
		font-size: 24px;
		letter-spacing: 1px;
	}

	> .displayName {
		font-size: 64px;
		letter-spacing: 2px;
	}
}

.PageContentNav {
	width: 100%;
	padding: 0 calc(~"10% - 16px");
	background-color: @grey-100;
	position: sticky;
	top: 54px;
	z-index: 1000;

	.NavBlock {
		> .Button.active {
			border-top: 2px solid @primary-060;
			background-color: @grey-070;
		}
	}
}

.PageContentBody {
	width: 100%;
	padding: 32px 10%;
}

.PageContentFooter {
	width: 100%;
	background-color: @grey-100;
	color: @white;
	padding: 24px 10%;

	> .HLayout * {
		margin-right: 8px;
	}
}
</style>

<template>
	<div class="Page">
		<Navigator />
		<div class="main">
			<MenuBar />
			<div class="PageContentWrapper VLayout align-center">
				<div class="PageContentHeader VLayout">
					<span class="category">{{
						pageContent.category || "Category"
					}}</span>
					<span class="displayName">{{
						pageContent.displayName || "Welcome"
					}}</span>
				</div>

				<div class="PageContentNav HLayout">
					<div
						class="NavBlock"
						v-for="navObj of navLinks"
						:key="navObj.name"
					>
						<Button
							size="large"
							btnStyle="dark"
							:value="navObj.name"
							:class="navObj.active ? 'active' : ''"
							@click="(event) => scrollTo(event, navObj.href)"
						/>
					</div>
				</div>

				<div class="PageContentBody VLayour align-center">
					<component v-bind:is="pageContent.widgetName"></component>
				</div>

				<div class="PageContentFooter">
					<div class="HLayout">
						<Link
							value="Github"
							href="https://github.com/enw860/vueApp"
						/>
						<DisplayText value="- Version 1.0.0" color="#e0e0e0" />
					</div>
					<div class="HLayout">
						<DisplayText
							value="Designed and built by "
							color="#e0e0e0"
						/>
						<Link
							value="Lionel Wu."
							href="https://www.linkedin.com/in/enhao-wu-18a596138"
						/>
						<DisplayText
							value="Licensed under the"
							color="#e0e0e0"
						/>
						<Link
							value="MIT License."
							href="https://github.com/enw860/vueApp"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import store from "../store/store";
import Navigator from "../components/Navigator.vue";
import MenuBar from "../components/MenuBar.vue";

import Link from "../../controls/vue/infomational/Link.vue";
import DisplayText from "../../controls/vue/infomational/DisplayText.vue";
import Button from "../../controls/vue/infomational/Button.vue";

import AvatarDemo from "./informational/Avatar.vue";
import BadgeDemo from "./informational/Badge.vue";
import BreadCrumbsDemo from "./informational/BreadCrumbs.vue";
import ButtonDemo from "./informational/Button.vue";

export default {
	name: "PageContent",
	components: {
		Navigator,
		MenuBar,
		Link,
		DisplayText,
		Button,
		AvatarDemo,
		BadgeDemo,
		BreadCrumbsDemo,
		ButtonDemo,
	},
	data: function () {
		return {
			navLinks: [
				{
					active: false,
					name: "Overview",
					href: "#overview",
				},
				{
					active: false,
					name: "Demo",
					href: "#demo",
				},
				{
					active: false,
					name: "Settings",
					href: "#properties",
				},
			],
		};
	},
	computed: {
		pageContent: function () {
			return this.$store.state.uiDemo.mainContentView;
		},

		scrollHeightDeduction: function () {
			const menuBar = this.$el.querySelector(".MenuBar");
			const menuBarHeight = menuBar
				? menuBar.getBoundingClientRect().height
				: 0;

			const navBar = this.$el.querySelector(".PageContentNav");
			const navBarHeight = navBar
				? navBar.getBoundingClientRect().height
				: 0;

			return menuBarHeight + navBarHeight + 16;
		},
	},
	methods: {
		scrollTo: function (event, anchor) {
			event.preventDefault();

			let anchorTag = anchor.match(/#(\w+)/);
			anchorTag = anchorTag ? anchorTag[1] : "";

			const anchorEle = document.querySelector(`a[name=${anchorTag}]`);
			const anchorPosition = anchorEle ? anchorEle.offsetTop : 0;

			this.navLinks = this.navLinks.map((navObj) => {
				navObj.active = navObj.href === anchor;
				return navObj;
			});

			window.scrollTo(0, anchorPosition - this.scrollHeightDeduction);
		},
		resetPage: function () {
			window.scrollTo(0, 0);
			this.navLinks = this.navLinks.map((navObj) => {
				navObj.active = false;
				return navObj;
			});
		},
	},
	watch: {
		pageContent: function (newVal, oldVal) {
			console.log(`content switch: from ${oldVal} to ${newVal}`);
			this.resetPage();
		},
	},
	beforeDestroy: function () {
		window.removeEventListener("scroll", this.onScroll, true);
		this.unwatch();
	},
};
</script>