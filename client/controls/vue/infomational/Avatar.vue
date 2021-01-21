<template>
	<div
		class="Avatar"
		v-bind:class="[shapeClass, avatarSizeClass, isActive ? '' : 'disabled']"
		v-bind:tabindex="clickable && isActive ? '0' : ''"
		@click="onclick"
	>
		<div
			class="AvatarContent VLayout flow-center align-center"
			v-bind:style="avatarStyle"
		>
			<div class="disabler"></div>
			<img v-if="avatarContentType === 'image'" v-bind:src="content" />
			<i
				v-else-if="avatarContentType === 'icon'"
				v-bind:class="content"
				v-bind:style="avatarIconColor"
			></i>
			<div v-else v-bind:style="avatarIconColor">{{ avatarContent }}</div>
		</div>

		<slot name="badge"></slot>
	</div>
</template>

<script>
import { normalizeInput, randDarkColor } from "../../util/utilities";
import "../../style/toolkit/infomational/Avatar.less";

export default {
	name: "Avatar",

	data: function () {
		return {
			SHAPES: {
				round: "avatar-round",
				square: "avatar-square",
			},
			SIZES: {
				default: "avatar-normal",
				small: "avatar-small",
				large: "avatar-large",
				xlarge: "avatar-xlarge",
			},
			TYPES: {
				text: "text",
				image: "image",
				icon: "icon",
			},
		};
	},

	props: {
		isActive: {
			type: Boolean,
			default: true,
		},
		shape: {
			type: String,
			default: "round",
		},
		type: {
			type: String,
			default: "text",
		},
		avatarSize: {
			type: String,
			default: "default",
		},
		avatarColor: {
			type: String,
		},
		iconColor: {
			type: String,
		},
		content: {
			type: String,
			required: true,
		},
	},

	computed: {
		shapeClass: function () {
			return normalizeInput(this.SHAPES, this.shape);
		},
		avatarSizeClass: function () {
			return normalizeInput(this.SIZES, this.avatarSize);
		},
		avatarContentType: function () {
			return normalizeInput(this.TYPES, this.type);
		},
		avatarContent: function () {
			if (this.avatarContentType === "text") {
				let words = this.content
					.split(" ")
					.map((word) => word[0].toUpperCase());
				return words.length > 1
					? words.splice(0, 2).join("")
					: words.length === 0
					? ""
					: words[0];
			} else {
				return this.content;
			}
		},
		clickable: function () {
			return !!this._events.click;
		},
		avatarStyle: function () {
			return {
				backgroundColor:
					this.avatarColor || randDarkColor(this.content),
			};
		},
		avatarIconColor: function () {
			return {
				color: this.iconColor || "#ffffff",
			};
		},
	},

	methods: {
		onclick: function (event) {
			!!this.clickable && this.isActive && this.$emit("click", event);
		},
	},
};
</script>
