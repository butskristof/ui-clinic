<template>
	<q-card-section
		class="row"
		@click="toPatient"
		id="patient-row"
		v-if="settings.viewPreferences.patient && patient"
	>
		<div class="col-auto">
			<q-avatar rounded id="patient-picture" size="5rem">
				<img :src="imgLink" alt="Patient picture" />
			</q-avatar>
		</div>
		<div class="col" id="patient-info">
			<span id="patient-name">
				{{ patient.name }}
			</span>
			<div
				v-if="
					settings.viewPreferences.monitoringData && patient.metrics
				"
				class="monitoring-data row"
			>
				<div class="monitoring-data-item col-auto">
					<q-icon name="fas fa-heartbeat" size="sm" color="primary" />
					{{ patient.metrics.heartRate }}
				</div>
				<div class="monitoring-data-item col-auto">
					<q-icon name="fas fa-stopwatch" size="sm" color="primary" />
					{{ patient.metrics.bloodPressure.upper }} /
					{{ patient.metrics.bloodPressure.lower }}
				</div>
			</div>
		</div>
	</q-card-section>
</template>

<script>
import { mapGetters } from "vuex";
import getProfilePicture from "../../../functions/profilepictures";
export default {
	name: "RoomPatientInfo",
	props: {
		patient: {
			type: Object
		}
	},
	computed: {
		...mapGetters("settings", ["settings"]),
		imgLink() {
			return getProfilePicture(this.patient.picture);
		}
	},
	methods: {
		toPatient() {
			this.$router.push({
				name: "Patient",
				params: {
					id: this.patient.id
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
#patient-row {
	cursor: pointer;
}

#patient-picture {
	margin-right: 1rem;
}

#patient-info {
	align-self: center;
}

#patient-name {
	font-size: 1.5rem;
}

.monitoring-data-item {
	display: inline-block;
	margin-right: 1rem;

	font-size: 1.1rem;

	.q-icon {
		margin-right: 0.3rem;
	}
}
</style>
