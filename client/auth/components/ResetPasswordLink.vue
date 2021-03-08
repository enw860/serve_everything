<template>
	<l-link
		:openInNewTab="false"
		value="Forget password?"
		size="small"
		@click="toResetPassword"
	/>
</template>

<script>
import store from "../store/store";

export default {
	name: "ResetPasswordLink",
	components: {},
	data: function () {
		return {};
	},
	props: {},
	computed: {},
	methods: {
		toResetPassword: function () {
			store.dispatch(
				"contentSwitcher/switchMainContent",
				"ResetPassword"
			);
		},
	},
};
</script>