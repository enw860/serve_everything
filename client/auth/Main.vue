<style lang="less">
.Authorization {
	width: 100vw;
	height: 100vh;
}
</style>

<template>
	<div class="VLayout flow-center align-center Authorization">
		<component v-bind:is="pageContent"></component>
	</div>
</template>

<script>
import store from "./store/store";

import Login from "./views/Login";
import Signup from "./views/Signup";
import ResetPassword from "./views/ResetPassword";

export default {
	name: "Main",
	components: {
		Login,
		Signup,
		ResetPassword,
	},
	data: function () {
		return {};
	},
	props: {},
	computed: {
		pageContent: function () {
			// clean the cache when view changes
			store.dispatch("auth/cleanCache");

			return this.$store.state.contentSwitcher.mainContentView;
		},
	},
	methods: {},
};
</script>