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
						<img :src="profilePicture()" alt="Patient picture" />
					</q-avatar>
				</div>
				<div class="col" id="patient-info">
					<span id="patient-name">
						{{ patient.name }}
					</span>
					<div class="dept-data">
						<div class="dept-data-item">
							{{ patient.room.departmentName }}
						</div>
						<div class="dept-data-item">
							Room {{ patient.room.number }}
						</div>
					</div>
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
		<NoContent v-else-if="downloaded" @tryAgain="init">
			Patient information not available
		</NoContent>
		<Loading v-else />
	</q-page>
</template>

<script>
import PatientInfo from "../components/Patient/PatientInfo";
import PatientActions from "../components/Patient/Actions/PatientActions";
import Loading from "../components/Shared/Loading";
import NoContent from "../components/Shared/NoContent";

import ClinicService from "../services/ClinicService";
const clinic = new ClinicService();

import getProfilePicture from "../functions/profilepictures";

export default {
	name: "PagePatient",
	components: { NoContent, Loading, PatientActions, PatientInfo },
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
		profilePicture() {
			return getProfilePicture(this.patient.picture);
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
#patient-picture {
	margin-right: 1rem;
}

#patient-info {
	align-self: center;
}

#patient-name {
	font-size: 1.75rem;
	line-height: 2rem;
}

.dept-data-item {
	display: block;
	font-size: 0.9rem;
}
</style>
