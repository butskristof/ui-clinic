<template>
	<q-card class="room-box">
		<q-card-section class="row">
			<div class="col-auto flex">
				<StatusIndicator
					class="status-indicator"
					:room="room"
					:nextAction="nextAction"
					@startAlarm="$emit('startAlarm')"
					@stopAlarm="$emit('stopAlarm')"
				/>
			</div>
			<div class="col">
				<h4>Room {{ room.number }}</h4>
			</div>
			<div class="col-auto" id="facilities">
				<q-icon
					v-for="f in room.facilities"
					:key="f"
					:name="facilities[f].icon"
					size="xs"
				/>
			</div>
		</q-card-section>

		<q-card-section
			class="row"
			@click="toPatient"
			id="patient-row"
			v-if="patient"
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
				<div class="monitoring-data">
					<div class="monitoring-data-item">
						<q-icon name="fas fa-heartbeat" size="sm" />
						{{ patient.metrics.heartRate }}
					</div>
					<div class="monitoring-data-item">
						<q-icon name="fas fa-stopwatch" size="sm" />
						{{ patient.metrics.bloodPressure }}
					</div>
				</div>
			</div>
		</q-card-section>

		<PatientAction
			v-if="patient && nextAction"
			:action="nextAction"
			@updateActionStatus="updateActionStatus"
			@updateActionDetails="updateActionDetails"
			@deleteAction="deleteAction"
		/>
	</q-card>
</template>

<script>
import { mapGetters } from "vuex";
import StatusIndicator from "../Shared/StatusIndicator";
import PatientAction from "../Shared/PatientAction";
import ClinicService from "../../services/ClinicService";
const clinic = new ClinicService();

export default {
	name: "RoomListItem",
	components: {
		StatusIndicator,
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
		imgLink() {
			return `https://lorempixel.com/200/200/people?q=${Math.random()}`;
		},
		patient() {
			return this.room.patients[0];
		}
	},
	data() {
		return {
			// TODO get from api
			facilities: {
				"1": {
					icon: "fas fa-bath"
				},
				"2": {
					icon: "fas fa-tv"
				}
			},
			nextAction: {}
		};
	},
	methods: {
		toPatient() {
			this.$router.push({
				name: "Patient",
				params: {
					id: this.patient.id
				}
			});
		},
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
	/*min-width: 150px;*/
	max-width: 25rem;
	width: 100%;
	margin: 1rem;
	/*height: 10rem;*/
	/*overflow: auto;*/
}

.status-indicator {
	align-self: center;
	width: 1.75rem;
	height: 1.75rem;
	margin-right: 0.75rem;
}

h4 {
	margin: 0 auto;
}

#facilities {
	align-self: flex-end;

	.q-icon {
		margin: 0.25rem;
	}
}

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
	margin: auto 0.5rem;

	&:first-of-type {
		margin-left: 0;
	}

	font-size: 1.1rem;

	.q-icon {
		margin-right: 0.3rem;
	}
}
</style>
