<style lang="less">
@import "../../controls/style/theme/theme.less";

.widgitDemoControl {
	width: 100%;

	.widgit {
		width: 60%;
		margin-right: 16px;
		position: relative;

		> .Background-color-control {
			position: absolute;
			bottom: 0;
			right: 0;
		}

		> .Demo-box {
			width: 100%;
			height: 100%;
		}
	}

	.widgitControl {
		width: 40%;

		> * > * {
			margin-left: 8px;
			margin-right: 8px;
		}

		> * > *:not(:last-child) {
			margin-bottom: 16px;
		}
	}
}
</style>

<template>
	<div class="widgitDemoControl HLayout">
		<div
			class="widgit VLayout"
			:style="{ backgroundColor: backgroundColor }"
		>
			<LabelWrapper
				class="Background-color-control"
				value="Background color:"
				size="small"
			>
				<ColorInput
					slot="labelContent"
					:value="backgroundColor"
					@change="updateBackgoundColor"
				/>
			</LabelWrapper>

			<div class="Demo-box HLayout align-center flow-center">
				<slot name="widgit"></slot>
			</div>
		</div>
		<div class="widgitControl VLayout">
			<slot name="control"></slot>
		</div>
	</div>
</template>

<script>
import ColorInput from "../../controls/vue/inputs/ColorInput.vue";
import LabelWrapper from "../../controls/vue/Wrapper/LabelWrapper.vue";

export default {
	name: "widgitDemo",
	components: {
		ColorInput,
		LabelWrapper,
	},
	data: function () {
		return {
			backgroundColor: "#f4f4f4",
		};
	},
	methods: {
		updateBackgoundColor: function (event) {
			this.backgroundColor = event.target.value;
		},
	},
};
</script>

