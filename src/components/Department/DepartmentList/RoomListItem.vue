<template>
	<q-card class="room-box">
		<RoomHeader
			:room="room"
			:nextAction="nextAction"
			@startAlarm="$emit('startAlarm')"
			@stopAlarm="$emit('stopAlarm')"
		/>

		<RoomPatientInfo :patient="patient" />

		<PatientAction
			v-if="settings.viewPreferences.nextAction && patient && nextAction"
			:action="nextAction"
			@updateActionStatus="updateActionStatus"
			@updateActionDetails="updateActionDetails"
			@deleteAction="deleteAction"
		/>
	</q-card>
</template>

<script>
import { mapGetters } from "vuex";
import PatientAction from "../../Shared/PatientAction";

import ClinicService from "../../../services/ClinicService";
const clinic = new ClinicService();

import RoomHeader from "../Shared/RoomHeader";
import RoomPatientInfo from "../Shared/RoomPatientInfo";

export default {
	name: "RoomListItem",
	components: {
		RoomPatientInfo,
		RoomHeader,
		PatientAction
	},
	props: {
		room: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters("settings", ["settings"]),
		patient() {
			return this.room.patients[0];
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
		},
		updateActionStatus(id, value) {
			clinic
				.setActionStatus(id, value)
				.then(() => this.getNextActionForPatient());
		},
		updateActionDetails(id, payload) {
			clinic
				.setActionDetails(id, payload.timestamp, payload.description)
				.then(() => this.getNextActionForPatient());
		},
		deleteAction(id) {
			clinic.deleteAction(id).then(() => this.getNextActionForPatient());
		}
	},
	mounted() {
		this.getNextActionForPatient();
	}
};
</script>

<style scoped lang="scss">
.room-box {
	max-width: 25rem;
	width: 100%;
	margin: 1rem;
}
</style>
