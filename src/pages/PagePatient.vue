<template>
	<q-page>
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

		<PatientInfo v-if="tab === 'info'" />

		<div v-if="tab === 'actions'"></div>
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
import PatientInfo from "../components/PatientInfo/PatientInfo";
const clinic = new ClinicService();

export default {
	name: "PagePatient",
	components: { PatientInfo },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			tab: "info",
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
