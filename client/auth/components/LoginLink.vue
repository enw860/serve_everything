<template>
	<l-link
		:openInNewTab="false"
		value="Log in"
		size="small"
		@click="toLogin"
	/>
</template>

<script>
import store from "../store/store";

export default {
	name: "LoginLink",
	components: {},
	data: function () {
		return {};
	},
	props: {},
	computed: {},
	methods: {
		toLogin: function () {
			store.dispatch("contentSwitcher/switchMainContent", "Login");
		},
	},
};
</script>