<template>
	<div class="UIDemo">
		<PageContent />
		<MaskLayer></MaskLayer>
	</div>
</template>

<script>
import store from "./store/store";
import MaskLayer from "../controls/vue/layout/MaskLayer";
import PageContent from "./views/PageContent";

export default {
	name: "UIDemo",
	components: {
		PageContent,
		MaskLayer,
	},
	data: function () {
		return {
			screenMode: this.$store.state.uiDemo.screenMode,
		};
	},
	props: {},
	methods: {
		getScreenMode: function (width) {
			if (!width) {
				width = window.innerWidth;
			}

			return width <= 850 ? "small" : "regular";
		},
		onResize: function (event) {
			this.screenMode = this.getScreenMode();
		},
	},
	watch: {
		screenMode(newVal, oldVal) {
			console.warn(`Screen size changed from ${oldVal} to ${newVal}`);
			store.dispatch("uiDemo/switchScreenMode", newVal);
		},
	},
	mounted() {
		window.addEventListener("resize", this.onResize);
		this.onResize();
	},
	beforeDestroy: function () {
		window.removeEventListener("resize", this.onResize);
	},
};
</script>