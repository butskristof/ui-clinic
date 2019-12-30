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
			<q-tab name="info" icon="info" label="Info" />
			<q-tab name="actions" icon="alarm" label="Actions" />
		</q-tabs>

		<PatientInfo v-if="tab === 'info'" :patient="patient" />

		<PatientActions v-if="tab === 'actions'" :actions="patient.actions" />
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
import PatientInfo from "../components/Patient/PatientInfo";
import PatientActions from "../components/Patient/PatientActions";
const clinic = new ClinicService();

export default {
	name: "PagePatient",
	components: { PatientActions, PatientInfo },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			tab: "actions",
			patient: {}
		};
	},
	methods: {
		getPatient() {
			clinic.getPatient(this.id).then(pat => (this.patient = pat));
		}
	},
	mounted() {
		this.getPatient();
	}
};
</script>

<style scoped>
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