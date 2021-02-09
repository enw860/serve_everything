<template>
	<Link :openInNewTab="false" value="Log in" size="small" @click="toLogin" />
</template>

<script>
import store from "../store/store";

import Link from "../../controls/vue/infomational/Link";

export default {
	name: "LoginLink",
	components: {
		Link,
	},
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