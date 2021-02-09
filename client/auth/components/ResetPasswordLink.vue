<template>
	<Link
		:openInNewTab="false"
		value="Forget password?"
		size="small"
		@click="toResetPassword"
	/>
</template>

<script>
import store from "../store/store";

import Link from "../../controls/vue/infomational/Link";

export default {
	name: "ResetPasswordLink",
	components: {
		Link,
	},
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