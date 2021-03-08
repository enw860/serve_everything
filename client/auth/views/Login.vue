<template>
	<AuthModal
		title="Sign in with your LServer account"
		:errorMessage="logInErrorMessage"
	>
		<div slot="Inputs" class="VLayout AuthModal-inputs">
			<l-label-wrapper value="Username:" size="small">
				<l-input-text
					slot="labelContent"
					ref="_username"
					placeholder="username"
				/>
			</l-label-wrapper>

			<l-label-wrapper value="Password:" size="small">
				<l-input-password
					slot="labelContent"
					ref="_password"
					placeholder="password"
				/>
			</l-label-wrapper>
		</div>

		<div slot="Links" class="HLayout flow-between AuthModal-links">
			<SignupLink />
			<ResetPasswordLink />
		</div>

		<div
			slot="Buttons"
			class="HLayout flow-end AuthModal-buttons full-width"
		>
			<l-button value="Sign in" btnStyle="primary" @click="signIn" />
		</div>
	</AuthModal>
</template>

<script>
import store from "../store/store";

import AuthModal from "../components/AuthModal";
import SignupLink from "../components/SignupLink";
import ResetPasswordLink from "../components/ResetPasswordLink";

export default {
	name: "Login",
	components: {
		AuthModal,
		SignupLink,
		ResetPasswordLink,
	},
	data: function () {
		return {};
	},
	props: {},
	computed: {
		logInErrorMessage: function () {
			const { result, success } = this.$store.state.auth.login;

			if (success !== undefined) {
				if (!success) {
					return result.message || "Error detected!";
				}
			}

			return "";
		},
	},
	methods: {
		signIn: function () {
			const { _username, _password } = this.$refs;
			store.dispatch("auth/login", {
				data: {
					username: _username.getValue() || "",
					password: _password.getValue() || "",
				},
				onSuccess: function () {
					document.location.href = "/";
				},
			});
		},
	},
};
</script>