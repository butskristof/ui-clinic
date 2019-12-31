<template>
	<span :class="statusClass" />
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
			const heartRate = this.patient.metrics.heartRate;
			if (
				heartRate < this.settings.tresholds.heartRate.lower ||
				heartRate > this.settings.tresholds.heartRate.upper
			) {
				return true;
			}

			// TODO add calculation
			const bloodPressure = this.patient.metrics.bloodPressure;
			if (
				bloodPressure < this.settings.tresholds.bloodPressure.lower ||
				bloodPressure > this.settings.tresholds.bloodPressure.upper
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
				return "status6";
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
	background-color: rebeccapurple;
}
</style>
