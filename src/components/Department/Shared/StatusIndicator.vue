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
			if (!this.patient) return false;

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
				return "status6 pulsate";
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
	background-color: white;
	border: 1px solid;
}

.status2 {
	background-color: blue;
}

.status3 {
	background-color: green;
}

.status4 {
	background-color: orange;
}

.status5 {
	background-color: red;
}

.status6 {
	background-color: red;
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
