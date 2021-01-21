<template>
	<div
		class="Badge"
		v-bind:class="vPositionClass"
		v-bind:style="backgroundStyle"
	>
		<div class="badge-content-text">{{ displayingContent }}</div>
	</div>
</template>

<script>
import { normalizeInput } from "../../util/utilities";
import "../../style/toolkit/infomational/Badge.less";

export default {
	name: "Badge",

	data: function () {
		return {
			VPOSITIONS: {
				top: "v-align-top",
				center: "v-align-center",
				bottom: "v-align-bottom",
			},
		};
	},

	props: {
		vPosition: {
			type: String,
			default: "top",
		},
		content: {
			type: Number,
			default: 99,
			isRequred: true,
		},
		backgroundColor: {
			type: String,
			default: "",
		},
	},

	computed: {
		vPositionClass: function () {
			return normalizeInput(this.VPOSITIONS, this.vPosition || "top");
		},
		backgroundStyle: function () {
			return {
				backgroundColor: this.backgroundColor || "#da1e28",
			};
		},
		displayingContent: function () {
			return this.content > 99
				? "+99"
				: this.content < -99
				? "-99"
				: this.content || "";
		},
	},
};
</script>