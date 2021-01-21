<template>
	<div class="HLayout flow-center align-center">
		<div ref="_slider_wrapper" v-bind:style="trackStyle"></div>
		<div class="VLayout flow-between" v-bind:style="thumbTrackStyle">
			<div
				v-if="!hideThumb"
				class="HLayout flow-center align-center"
				v-bind:style="thumbStyle"
				@mousedown="rangerDown"
				@mouseup="rangerRelease"
			>
				<i v-bind:class="['fa fa-xs', thumbIcon]" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CircleRanger",

	data: function () {
		return {
			onHold: false,
			inputValue: this.value,
			circlePathDef: [
				{
					min: -1,
					max: 101,
					inRangeAction: (val) => ["50% 50%", "50% 0%"],
					outRangeAction: () => [],
				},
				{
					min: 0,
					max: 12.5,
					inRangeAction: (val) => [`${50 + (val * 100) / 25}% 0%`],
					outRangeAction: () => ["100% 0%"],
				},
				{
					min: 12.5,
					max: 37.5,
					inRangeAction: (val) => [
						`100% ${((val - 12.5) * 100) / 25}%`,
					],
					outRangeAction: () => ["100% 100%"],
				},
				{
					min: 37.5,
					max: 62.5,
					inRangeAction: (val) => [
						`${100 - ((val - 37.5) * 100) / 25}% 100%`,
					],
					outRangeAction: () => ["0% 100%"],
				},
				{
					min: 62.5,
					max: 87.5,
					inRangeAction: (val) => [
						`0% ${100 - ((val - 62.5) * 100) / 25}%`,
					],
					outRangeAction: () => ["0% 0%"],
				},
				{
					min: 87.5,
					max: 100,
					inRangeAction: (val) => [
						`${((val - 87.5) * 100) / 25}% 0%`,
					],
					outRangeAction: () => [],
				},
			],
		};
	},

	props: {
		minRange: {
			type: Number,
			default: 0,
		},
		maxRange: {
			type: Number,
			default: 100,
		},
		value: {
			type: Number,
			default: 60,
		},
		radius: {
			type: Number,
			default: 100,
		},
		borderColor: {
			type: String,
			default: "#000000",
		},
		borderWidth: {
			type: Number,
			default: 3,
		},
		thumbRadius: {
			type: Number,
			default: 8,
		},
		thumbColor: {
			type: String,
			default: "#000000",
		},
		thumbIcon: {
			type: String,
			default: "fa-circle",
		},
		muteRanger: {
			type: Boolean,
			default: false,
		},
		hideThumb: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		trackStyle: function () {
			return {
				width: `${this.radius * 2}px`,
				height: `${this.radius * 2}px`,
				borderRadius: "100%",
				border: `${this.borderWidth}px solid ${this.borderColor}`,
				clipPath: this.buildCircleTrack(this.inputValue),
				zIndex: 1,
			};
		},

		thumbTrackStyle: function () {
			return {
				width: `${this.thumbRadius * 2}px`,
				height: `${this.radius + this.thumbRadius * 0.85}px`,
				top: `${0 - this.thumbRadius * 0.85}px`,
				transform: `rotate(${360 * this.inputValue * 0.01}deg)`,
				position: "absolute",
				transformOrigin: "bottom center",
				zIndex: 2,
			};
		},

		thumbStyle: function () {
			return {
				width: `${this.thumbRadius * 2}px`,
				height: `${this.thumbRadius * 2}px`,
				fontSize: `${this.thumbRadius * 2}px`,
				color: this.thumbColor,
				cursor: this.muteRanger ? "default" : "pointer",
			};
		},
	},

	methods: {
		buildCircleTrack: function (val) {
			if (val === 100) return "";

			val = val % 100;
			const { circlePathDef } = this;

			const ploygonPoints = circlePathDef.reduce((points, term) => {
				const point =
					val >= term.max
						? term.outRangeAction()
						: val <= term.min
						? []
						: term.inRangeAction(val);
				return point ? [...points, ...point] : points;
			}, []);

			return `polygon(${ploygonPoints.join(", ")})`;
		},

		module: function (v) {
			return Math.sqrt(
				v.map((val) => val * val).reduce((sum, val) => sum + val, 0)
			);
		},

		dotProduct: function (u, v) {
			if (u.length !== v.length) return;

			return Array(u.length)
				.fill(0)
				.reduce((sum, val, index) => {
					return sum + u[index] * v[index];
				}, 0);
		},

		radiusBetweenVectors: function (u, v) {
			if (u.length !== v.length) return;
			return Math.acos(
				this.dotProduct(u, v) / (this.module(u) * this.module(v))
			);
		},

		computeVector: function (org, ref) {
			if (org.length !== ref.length) return;
			return org.map((val, index) => val - ref[index]);
		},

		getPoints: function (e) {
			const { _slider_wrapper } = this.$refs;
			const {
				top,
				left,
				width,
				height,
			} = _slider_wrapper.getBoundingClientRect();

			const center = [left + width / 2, top + height / 2];
			const start = [left + width / 2, top];
			const cursor = [e.clientX, e.clientY];

			return [center, start, cursor];
		},

		radiusToPercentageInCircle: function (r, cond) {
			const tempPercentage = (100 * r) / (2 * Math.PI);
			return cond ? 100 - tempPercentage : tempPercentage;
		},

		checkValueRange: function (val) {
			return val > this.maxRange
				? this.maxRange
				: val < this.minRange
				? this.minRange
				: val;
		},

		dragRangerHandler: function (e) {
			const {
				getPoints,
				computeVector,
				radiusToPercentageInCircle,
				radiusBetweenVectors,
				checkValueRange,
			} = this;

			const [center, start, cursor] = getPoints(e);

			const u = computeVector(center, start);
			const v = computeVector(center, cursor);

			const radius = radiusBetweenVectors(u, v);
			const value = radiusToPercentageInCircle(
				radius,
				start[0] > cursor[0]
			);

			this.inputValue = checkValueRange(value);
		},

		rangerDown: function () {
			if (this.muteRanger) return;

			if (!this.onHold) {
				this.onHold = true;
				document.addEventListener("mousemove", this.dragRangerHandler);
			}
		},

		rangerRelease: function () {
			if (this.muteRanger) return;

			if (this.onHold) {
				this.onHold = false;
				document.removeEventListener(
					"mousemove",
					this.dragRangerHandler
				);
			}
		},

		setValue: function (newVal) {
			if (newVal !== this.inputValue) {
				this.inputValue = newVal;
			}
		},

		getValue: function () {
			return this.inputValue;
		},
	},
};
</script>