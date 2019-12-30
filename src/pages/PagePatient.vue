<template>
	<q-page class="q-ma-md">
		<div class="row">
			<div class="col-auto">
				<q-avatar rounded id="patient-picture" size="8rem">
					<img
						src="https://lorempixel.com/200/200/people"
						alt="Patient picture"
					/>
				</q-avatar>
			</div>
			<div class="col" id="patient-info">
				<span id="patient-name">
					{{ patient.name }}
				</span>
			</div>
		</div>
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
const clinic = new ClinicService();

export default {
	name: "PagePatient",
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
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

#patient-info {
	align-self: center;
}

#patient-name {
	font-size: 2rem;
}
</style>
