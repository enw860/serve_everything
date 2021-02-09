<template>
	<Link
		:openInNewTab="false"
		value="Sign up now!"
		size="small"
		@click="toSignup"
	/>
</template>

<script>
import store from "../store/store";

import Link from "../../controls/vue/infomational/Link";

export default {
	name: "SignupLink",
	components: {
		Link,
	},
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