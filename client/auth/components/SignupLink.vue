<template>
	<l-link
		:openInNewTab="false"
		value="Sign up now!"
		size="small"
		@click="toSignup"
	/>
</template>

<script>
import store from "../store/store";

export default {
	name: "SignupLink",
	components: {},
	data: function () {
		return {};
	},
	props: {},
	computed: {},
	methods: {
		toSignup: function () {
			store.dispatch("contentSwitcher/switchMainContent", "Signup");
		},
	},
};
</script>