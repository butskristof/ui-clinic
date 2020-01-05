<template>
	<q-card id="room-box" :style="getPositioning">
		<RoomHeader
			:room="room"
			:nextAction="nextAction"
			@startAlarm="$emit('startAlarm')"
			@stopAlarm="$emit('stopAlarm')"
		/>

		<RoomPatientInfo :patient="patient" />
	</q-card>
</template>

<script>
import { mapGetters } from "vuex";

import ClinicService from "../../../services/ClinicService";
import RoomPatientInfo from "../Shared/RoomPatientInfo";
import RoomHeader from "../Shared/RoomHeader";
const clinic = new ClinicService();

export default {
	name: "RoomMapItem",
	components: { RoomHeader, RoomPatientInfo },
	props: {
		room: {
			type: Object,
			required: true
		},
		mapDimensions: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters("settings", ["settings"]),
		patient() {
			return this.room.patients[0];
		},
		getPositioning() {
			return {
				width: `${this.room.dimensions.x * this.mapDimensions.width}px`,
				height: `${this.room.dimensions.y *
					this.mapDimensions.height}px`,
				left: `${this.room.position.x * this.mapDimensions.width}px`,
				top: `${this.room.position.y * this.mapDimensions.height}px`
			};
		}
	},
	data() {
		return {
			nextAction: {}
		};
	},
	methods: {
		getNextActionForPatient() {
			if (!this.patient) return;
			clinic
				.getNextActionForPatient(this.room.patients[0].id)
				.then(action => (this.nextAction = action));
		}
	},
	mounted() {
		this.getNextActionForPatient();
	}
};
</script>

<style scoped>
#room-box {
	position: absolute;
}
</style>
