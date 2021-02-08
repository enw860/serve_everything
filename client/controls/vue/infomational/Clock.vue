<template>
	<div class="HLayout flex-center">
		<div
			class="clock-background"
			v-bind:style="{ width: clockSize + 'px', height: clockSize + 'px' }"
		>
			<div class="clock-center"></div>
			<div
				v-for="term in Object.keys(time)"
				:key="term + '_hand'"
				class="clock-arm"
				v-bind:class="term + '-arm'"
				v-bind:style="{
					transform: `rotate(${
						360 *
						((time[term].value % (term === 'hh' ? 12 : 60)) /
							(term === 'hh' ? 12 : 60))
					}deg)`,
				}"
			></div>
			<CircleRanger
				ref="_ranger"
				:radius="clockSize / 2"
				:muteRanger="true"
				thumbIcon="fa-play"
			/>
			<div className="VLayout flow-center timestr-wrapper">
				<div
					class="HLayout flow-center"
					v-bind:style="{ fontSize: fontSize }"
					v-if="showTimeString"
				>
					{{ timeString }}
				</div>
				<div
					class="HLayout flow-center"
					v-bind:style="{ fontSize: fontSize }"
					v-if="showDateString"
				>
					{{ dateString }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CircleRanger from "../inputs/CircleRanger";
import "../../style/toolkit/infomational/Timer.less";

export default {
	name: "Clock",
	data: function () {
		return {
			value: 0,
			time: {},
			intervalDef: [
				{ name: "dd", interval: 24 * 60 * 60 * 1000, minDecimal: 0 },
				{ name: "hh", interval: 60 * 60 * 1000, minDecimal: 2 },
				{ name: "mm", interval: 60 * 1000, minDecimal: 2 },
				{ name: "ss", interval: 1000, minDecimal: 2 },
				{ name: "ms", interval: 1, minDecimal: 3 },
			],
		};
	},
	components: {
		CircleRanger,
	},
	props: {
		clockSize: {
			type: Number,
			default: 150,
		},
		format: {
			type: String,
			default: "hh:mm:ss",
		},
		fontSize: {
			type: String,
			default: "0.7em",
		},
		timezoneOffset: {
			type: Number,
			default: 0,
		},
		showTimeString: {
			type: Boolean,
			default: false,
		},
		showDateString: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		timeString: function () {
			return Object.keys(this.time).reduce((timeStr, term) => {
				return timeStr.indexOf(term) > -1
					? timeStr.replace(term, this.time[term].displayValue)
					: timeStr;
			}, this.format);
		},
		dateString: function () {
			var date = new Date(this.value);
			return date.toDateString();
		},
	},
	methods: {
		convertMS: function (t) {
			var { intervalDef, paddingStr } = this;

			return intervalDef.reduce((timeObj, term) => {
				// 1 decimal place
				var interValExcat = Math.floor((t * 10) / term.interval) / 10;
				var interValInt = Math.floor(interValExcat);

				t -= interValInt * term.interval;
				timeObj[term.name] = {
					value: interValExcat,
					displayValue: paddingStr(interValInt, term.minDecimal, 0),
				};
				return timeObj;
			}, {});
		},

		paddingStr: function (val, minLength, padStr) {
			var val = val + "";
			var padStr = padStr + "";
			var padLength = minLength - val.length;
			return padLength < 0
				? val
				: Array(padLength).fill(padStr).join("") + val;
		},

		updateClock: function () {
			const { _ranger } = this.$refs;

			let t = new Date().getTime();
			t = t + this.timezoneOffset * 60 * 60 * 1000;

			this.value = t;
			this.time = this.convertMS(this.value);

			let rangerValue = (this.time.ss.value / 60) * 100;
			_ranger.setValue(rangerValue);
		},
	},
	mounted() {
		this.updateClock();
		this.interval = setInterval(this.updateClock, 1000);
	},
	beforeDestroy() {
		clearInterval(this.interval);
	},
};
</script>