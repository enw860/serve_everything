<style lang="less">
@import "../style/theme.less";

.AuthModal {
	width: 500px;
	box-shadow: 0 0 16px 0 rgb(41 70 97 / 10%);

	.AuthModal-title {
		padding: 16px 32px;
		background-color: @primary-060;
	}

	.AuthModal-main {
		margin: 32px;
	}

	.AuthModal-inputs {
		& > *:not(:last-child) {
			margin-bottom: 16px;
		}

		.LabelWrapper {
			margin-left: 0;
			margin-right: 0;
		}
	}

	.AuthModal-buttons {
		&.full-width > .Button {
			width: 100%;
		}

		& > .Button {
			min-width: 33%;
			justify-content: center;
			align-items: center;
		}
	}

	.AuthModal-links {
		margin: 16px 0;
	}

	.AuthModal-error {
		padding: 8px;
		background-color: @danger-020;
		border-left: 8px solid @danger-060;
		color: @danger-060;
		margin-bottom: 16px;

		.error-icon > i {
			font-style: normal;
		}

		& > *:not(:last-child) {
			margin-right: 8px;
		}
	}
}
</style>

<template>
	<div class="AuthModal">
		<div class="HLayout AuthModal-title">
			<l-text :value="title" size="xxlarge" color="#ffffff" />
		</div>

		<div class="VLayout AuthModal-main">
			<div class="VLayout">
				<div
					class="HLayout AuthModal-error align-center"
					v-if="!!errorMessage"
				>
					<div class="error-icon">
						<i class="fas fa-exclamation-circle"></i>
					</div>
					<l-text
						:value="errorMessage"
						color="#da1e28"
						size="small"
					/>
				</div>

				<slot name="Inputs"></slot>
			</div>

			<slot name="Links"></slot>

			<slot name="Buttons"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "AuthModal",
	components: {},
	props: {
		title: {
			type: String,
			default: "Title",
		},
		errorMessage: {
			type: String,
			default: "",
		},
	},
};
</script>