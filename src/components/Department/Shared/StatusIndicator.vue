<template>
	<span :class="statusClass" @click="clickIndicator" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "StatusIndicator",
	props: {
		room: {
			type: Object
		},
		nextAction: {
			type: Object
		},
		alarmTime: {
			type: Number
		}
	},
	computed: {
		...mapGetters("settings", ["settings"]),
		patient() {
			return this.room.patients[0];
		},
		checkMonitoringData() {
			if (!this.patient || !this.patient.metrics) return false;

			const heartRate = this.patient.metrics.heartRate;
			if (
				heartRate < this.settings.tresholds.heartRate.lower ||
				heartRate > this.settings.tresholds.heartRate.upper
			) {
				return true;
			}

			const bloodPressureLower = this.patient.metrics.bloodPressure.lower;
			if (
				bloodPressureLower > this.settings.tresholds.bloodPressure.lower
			) {
				return true;
			}

			const bloodPressureUpper = this.patient.metrics.bloodPressure.upper;
			if (
				bloodPressureUpper > this.settings.tresholds.bloodPressure.upper
			) {
				return true;
			}

			return false;
		},
		statusClass() {
			if (!this.patient) {
				return "status1";
			} else if (this.patient.calledForHelp) {
				return "status5";
			} else if (this.checkMonitoringData) {
				this.$emit("startAlarm");
				return "status5 pulsate";
			} else if (!this.nextAction) {
				return "status2";
			} else if (
				this.$moment(this.nextAction.timestamp).isBefore(this.$moment())
			) {
				return "status4";
			} else if (
				this.$moment(this.nextAction.timestamp)
					.subtract(this.settings.alarmTime, "minutes")
					.isBefore(this.$moment())
			) {
				return "status3";
			} else {
				return "";
			}
		}
	},
	methods: {
		clickIndicator() {
			this.$emit("stopAlarm");
		}
	}
};
</script>

<style scoped lang="scss">
span {
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 50%;
}

.status1 {
	background-image: linear-gradient(
		to bottom,
		rgb(255, 255, 255),
		rgb(253, 253, 253),
		rgb(252, 252, 252),
		rgb(250, 250, 250),
		rgb(248, 248, 248),
		rgb(247, 247, 247),
		rgb(245, 245, 245),
		rgb(244, 244, 244),
		rgb(242, 242, 242),
		rgb(240, 240, 240),
		rgb(239, 239, 239),
		rgb(237, 237, 237)
	);
	border: 1px solid rgba(0, 0, 0, 0.25);
}

/*.status2 {*/
/*	background-image: linear-gradient(*/
/*		to bottom,*/
/*		rgb(80, 92, 222),*/
/*		rgb(74, 86, 218),*/
/*		rgb(68, 79, 214),*/
/*		rgb(63, 73, 209),*/
/*		rgb(57, 66, 205),*/
/*		rgb(51, 60, 201),*/
/*		rgb(45, 53, 197),*/
/*		rgb(39, 47, 193),*/
/*		rgb(33, 40, 189),*/
/*		rgb(28, 34, 184),*/
/*		rgb(22, 27, 180),*/
/*		rgb(16, 21, 176)*/
/*	);*/
/*}*/

.status2 {
	background-image: linear-gradient(
		to bottom,
		rgb(12, 189, 6),
		rgb(12, 182, 10),
		rgb(11, 175, 15),
		rgb(11, 168, 19),
		rgb(11, 161, 24),
		rgb(11, 154, 28),
		rgb(10, 147, 33),
		rgb(10, 140, 37),
		rgb(10, 133, 42),
		rgb(10, 126, 46),
		rgb(9, 119, 51),
		rgb(9, 112, 55)
	);
}

.status3 {
	background-image: linear-gradient(
		to bottom,
		rgb(255, 217, 0),
		rgb(249, 210, 1),
		rgb(242, 204, 2),
		rgb(236, 197, 2),
		rgb(229, 190, 3),
		rgb(223, 183, 4),
		rgb(216, 177, 5),
		rgb(210, 170, 6),
		rgb(203, 163, 7),
		rgb(197, 156, 7),
		rgb(190, 150, 8),
		rgb(184, 143, 9)
	);
}

.status4 {
	background-image: linear-gradient(
		to bottom,
		rgb(255, 145, 0),
		rgb(249, 138, 1),
		rgb(242, 132, 2),
		rgb(236, 125, 2),
		rgb(229, 119, 3),
		rgb(223, 112, 4),
		rgb(216, 106, 5),
		rgb(210, 99, 6),
		rgb(203, 93, 7),
		rgb(197, 86, 7),
		rgb(190, 80, 8),
		rgb(184, 73, 9)
	);
}

.status5 {
	background-image: linear-gradient(
		to bottom,
		rgb(230, 12, 12),
		rgb(227, 14, 14),
		rgb(224, 16, 16),
		rgb(222, 18, 18),
		rgb(219, 20, 20),
		rgb(216, 22, 22),
		rgb(213, 24, 24),
		rgb(210, 26, 26),
		rgb(207, 28, 28),
		rgb(205, 30, 30),
		rgb(202, 32, 32),
		rgb(199, 34, 34)
	);
}

.pulsate {
	-webkit-animation: pulsate 0.5s ease-out;
	-webkit-animation-iteration-count: infinite;
	opacity: 0.5;
}
@-webkit-keyframes pulsate {
	0% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.5;
	}
}
</style>
