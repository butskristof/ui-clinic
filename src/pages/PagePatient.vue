<template>
	<q-page>
		<q-toolbar class="bg-grey-3">
			<q-icon
				color="primary"
				name="arrow_back"
				size="sm"
				class="q-mr-sm"
				@click="$router.go(-1)"
			/>
			Back
		</q-toolbar>

		<div v-if="downloaded && this.patient">
			<div class="row q-ma-md">
				<div class="col-auto">
					<q-avatar rounded id="patient-picture" size="8rem">
						<img
							src="https://lorempixel.com/200/200/people"
							alt="Patient picture"
						/>
					</q-avatar>
				</div>
				<div class="col" id="patient-name">
					{{ patient.name }}
				</div>
			</div>

			<q-tabs v-model="tab" inline-label>
				<q-tab name="actions" icon="alarm" label="Actions" />
				<q-tab name="info" icon="info" label="Info" />
			</q-tabs>

			<PatientInfo
				v-if="tab === 'info'"
				:patient="patient"
				@updatePatientInfo="updatePatientInfo"
			/>

			<PatientActions
				v-if="tab === 'actions'"
				:actions="patient.actions"
				@updateActionStatus="updateActionStatus"
				@updateActionDetails="updateActionDetails"
				@deleteAction="deleteAction"
				@addAction="addAction"
			/>
		</div>
		<div v-else-if="downloaded" id="error-message" class="absolute-center">
			Patient information not available
		</div>
		<Loading v-else />
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
import PatientInfo from "../components/Patient/PatientInfo";
import PatientActions from "../components/Patient/Actions/PatientActions";
import Loading from "../components/Shared/Loading";
const clinic = new ClinicService();

export default {
	name: "PagePatient",
	components: { Loading, PatientActions, PatientInfo },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			tab: "actions",
			downloaded: false,
			patient: null,
			departmentName: ""
		};
	},
	methods: {
		getPatient() {
			clinic
				.getPatient(this.id)
				.then(pat => (this.patient = pat))
				.then(() => {
					this.getDepartmentName(this.patient.room.departmentId);
				});
		},
		getDepartmentName(id) {
			clinic.getDepartmentName(id).then(name => {
				this.$set(this.patient.room, "departmentName", name);
				// $set trigger a Vue update, just assigning with this.patient.room.departmentName does not
			});
		},
		updateActionStatus(id, value) {
			clinic.setActionStatus(id, value).then(() => this.getPatient());
		},
		updateActionDetails(id, payload) {
			clinic
				.setActionDetails(id, payload.timestamp, payload.description)
				.then(() => this.getPatient());
		},
		deleteAction(id) {
			clinic.deleteAction(id).then(() => this.getPatient());
		},
		addAction(payload) {
			payload.patientId = this.patient.id;
			clinic.addAction(payload).then(() => this.getPatient());
		},
		updatePatientInfo() {
			clinic
				.updatePatientInfo(
					this.patient.id,
					this.patient.diet,
					this.patient.remarks
				)
				.then(() => this.getPatient());
		},
		async init() {
			this.getPatient();
		}
	},
	async mounted() {
		await this.init();
		this.downloaded = true;
	}
};
</script>

<style scoped lang="scss">
#error-message {
	width: 100%;
	text-align: center;
}

#patient-picture {
	margin-right: 1rem;
}

#patient-name {
	align-self: center;
	font-size: 2rem;
}

dd {
	margin-bottom: 1rem;
}
</style>
