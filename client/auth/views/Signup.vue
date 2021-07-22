<template>
	<AuthModal
		title="Create your LSever account"
		:errorMessage="signUpErrorMessage"
	>
		<div slot="Inputs" class="VLayout AuthModal-inputs">
			<l-label-wrapper value="Username:" size="small">
				<l-input-text
					slot="labelContent"
					ref="_username"
					placeholder="username"
					@blur="checkUsername"
					:error="validateNameErrorMessage"
				/>
			</l-label-wrapper>

			<l-label-wrapper value="Password:" size="small">
				<l-input-password
					slot="labelContent"
					ref="_password"
					placeholder="password"
					@blur="checkPassword"
					:error="validatePasswordErrorMessage"
				/>
			</l-label-wrapper>

			<l-label-wrapper value="Confirm your password:" size="small">
				<l-input-password
					slot="labelContent"
					ref="_confirmed"
					placeholder="password"
					@blur="checkConfirmedPassword"
					:error="comfirmedPasswordErrorMessage"
				/>
			</l-label-wrapper>
		</div>

		<div slot="Links" class="HLayout flow-between AuthModal-links">
			<LoginLink />
			<ResetPasswordLink />
		</div>

		<div
			slot="Buttons"
			class="HLayout flow-end AuthModal-buttons full-width"
		>
			<l-button
				value="Sign up"
				btnStyle="primary"
				size="large"
				@click="signUp"
				:disabled="disableBtn"
			/>
		</div>
	</AuthModal>
</template>

<script>
import store from "../store/store";

import AuthModal from "../components/AuthModal";
import LoginLink from "../components/LoginLink";
import ResetPasswordLink from "../components/ResetPasswordLink";

export default {
	name: "Signup",
	components: {
		AuthModal,
		LoginLink,
		ResetPasswordLink,
	},
	data: function () {
		return {
			username: "",
			password: "",
			confirmed: true,
		};
	},
	props: {},
	computed: {
		validateNameErrorMessage: function () {
			const { detail } = this.$store.state.auth.validateName;

			if ((detail || {}).existed) {
				return "Username already existed!";
			} else {
				return "";
			}
		},
		validatePasswordErrorMessage: function () {
			const { detail } = this.$store.state.auth.validatePassword;

			if (Object.keys(detail || {}).length === 0) {
				return "";
			}

			if (detail.noCap) {
				return "Need at least one capital letter";
			}

			if (detail.noLow) {
				return "Need at least one lower letter";
			}

			if (detail.noNum) {
				return "Need at least one number";
			}

			if (detail.noSpc) {
				return "Need at least one special letter";
			}

			if (detail.tooShort) {
				return "Need at least 6 letters\n";
			}

			return "";
		},
		comfirmedPasswordErrorMessage: function () {
			return this.confirmed ? "" : "Password not matched!";
		},
		signUpErrorMessage: function () {
			const { success, result } = this.$store.state.auth.signup;

			if (success !== undefined) {
				if (!this.$store.state.auth.signup.success) {
					return result.message || "Error detected!";
				}
			}

			return "";
		},
		disableBtn: function () {
			if (
				this.validateNameErrorMessage !== "" ||
				this.validatePasswordErrorMessage !== "" ||
				this.comfirmedPasswordErrorMessage !== ""
			) {
				return true;
			} else if (this.username === "" || this.password === "") {
				return true;
			} else if (!this.confirmed) {
				return true;
			}
			return false;
		},
	},
	methods: {
		signUp: function () {
			const { _username, _password, _confirmed } = this.$refs;

			const username = _username.getValue();
			const password = _password.getValue();

			if (this.confirmed) {
				store.dispatch("auth/signup", {
					data: { username, password },
					onSuccess: () =>
						store.dispatch(
							"contentSwitcher/switchMainContent",
							"Login"
						),
				});
			}
		},
		checkUsername: function () {
			const { _username } = this.$refs;
			const username = _username.getValue() || "";

			if (username) {
				store.dispatch("auth/validateUsername", { data: { username } });
				this.username = username;
			}
		},
		checkPassword: function () {
			const { _password } = this.$refs;
			const password = _password.getValue() || "";

			if (password) {
				store.dispatch("auth/validatePassword", { data: { password } });
				this.password = password;
			}

			this.checkConfirmedPassword(true);
		},
		checkConfirmedPassword: function (force) {
			const { _confirmed } = this.$refs;
			const cPassword = _confirmed.getValue() || "";

			if (cPassword || force) {
				this.confirmed = this.password === cPassword;
			}
		},
	},
};
</script>