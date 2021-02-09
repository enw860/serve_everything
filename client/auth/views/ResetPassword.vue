<template>
	<AuthModal
		title="Reset your LServer password"
		:errorMessage="s1ErrorMessage || s3ErrorMessage"
	>
		<div slot="Inputs" class="VLayout AuthModal-inputs">
			<LabelWrapper value="Please enter your user name:" size="small">
				<InputText
					slot="labelContent"
					ref="_username"
					placeholder="username"
					@blur="setUsername"
				/>
			</LabelWrapper>

			<LabelWrapper
				value="Please paste secrete send to your email:"
				size="small"
				v-if="!!startStep2"
			>
				<InputText
					slot="labelContent"
					ref="_secrete"
					placeholder="secrete"
					@blur="validateSecrete"
					:error="s2ErrorMessage"
				/>
			</LabelWrapper>

			<LabelWrapper
				value="New password:"
				size="small"
				v-if="!!startStep3"
			>
				<Password
					slot="labelContent"
					ref="_password"
					placeholder="password"
					@blur="checkPassword"
					:error="validatePasswordErrorMessage"
				/>
			</LabelWrapper>

			<LabelWrapper
				value="Confirm your new password:"
				size="small"
				v-if="!!startStep3"
			>
				<Password
					slot="labelContent"
					ref="_confirmed"
					placeholder="password"
					@blur="setConfirmedPassword"
					:error="comfirmedPasswordErrorMessage"
				/>
			</LabelWrapper>
		</div>

		<div slot="Links" class="HLayout flow-between AuthModal-links">
			<LoginLink />
			<SignupLink />
		</div>

		<div slot="Buttons" class="HLayout flow-between AuthModal-buttons">
			<Button
				value="Send me secrete"
				btnStyle="primary"
				@click="sendSecrete"
				:disabled="!username"
			/>
			<Button
				value="Submit"
				btnStyle="primary"
				@click="submit"
				:disabled="!enableSubmit"
			/>
		</div>
	</AuthModal>
</template>

<script>
import store from "../store/store";

import InputText from "../../controls/vue/inputs/InputText";
import Password from "../../controls/vue/inputs/Password";
import Button from "../../controls/vue/infomational/Button";

import LabelWrapper from "../../controls/vue/Wrapper/LabelWrapper";

import AuthModal from "../components/AuthModal";
import LoginLink from "../components/LoginLink";
import SignupLink from "../components/SignupLink";

export default {
	name: "Login",
	components: {
		AuthModal,
		SignupLink,
		LoginLink,
		InputText,
		Password,
		Button,
		LabelWrapper,
	},
	data: function () {
		return {
			username: "",
			password: "",
			cPassword: "",
			startStep1: true,
			startStep2: false,
			startStep3: false,
			validPassword: false,
		};
	},
	props: {},
	computed: {
		s1ErrorMessage: function () {
			const {
				result,
				success,
			} = this.$store.state.auth.resetPasswordStep1;

			if (success !== undefined) {
				if (!success) {
					return result.message || "Error detected!";
				}

				this.startStep2 = success;
			}

			return "";
		},
		s2ErrorMessage: function () {
			const {
				result,
				success,
			} = this.$store.state.auth.resetPasswordStep2;

			if (success !== undefined) {
				if (!success) {
					return result.message || "Error detected!";
				}

				this.startStep3 = success;
			}

			return "";
		},
		s3ErrorMessage: function () {
			const {
				result,
				success,
			} = this.$store.state.auth.resetPasswordStep3;

			if (success !== undefined) {
				if (!success) {
					return result.message || "Error detected!";
				}

				this.startStep3 = success;
			}

			return "";
		},
		validatePasswordErrorMessage: function () {
			const { detail } = this.$store.state.auth.validatePassword;

			this.validPassword = false;

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

			this.validPassword = true;

			return "";
		},
		comfirmedPasswordErrorMessage: function () {
			return this.password === this.cPassword
				? ""
				: "Password not matched!";
		},
		enableSubmit: function () {
			return this.validPassword && this.username && this.password;
		},
	},
	methods: {
		setUsername: function () {
			const { _username } = this.$refs;
			this.username = _username.getValue() || "";
		},
		sendSecrete: function () {
			store.dispatch("auth/resetPasswordStep1", {
				data: {
					username: this.username,
				},
			});
		},
		validateSecrete: function () {
			const { _secrete } = this.$refs;
			const secrete = _secrete.getValue() || "";

			if (!!secrete) {
				store.dispatch("auth/resetPasswordStep2", {
					data: {
						temp_secrete: secrete,
					},
				});
			}
		},
		checkPassword: function () {
			const { _password } = this.$refs;
			const password = _password.getValue() || "";

			if (password) {
				store.dispatch("auth/validatePassword", { data: { password } });
				this.password = password;
			}
		},
		setConfirmedPassword: function () {
			const { _confirmed } = this.$refs;
			const cPassword = _confirmed.getValue() || "";
			this.cPassword = cPassword;
		},
		submit: function () {
			store.dispatch("auth/resetPasswordStep3", {
				data: {
					username: this.username,
					password: this.password,
				},
				onSuccess: () =>
					store.dispatch(
						"contentSwitcher/switchMainContent",
						"Login"
					),
			});
		},
	},
};
</script>