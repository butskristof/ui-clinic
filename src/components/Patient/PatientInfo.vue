<template>
	<q-form class="q-ma-md">
		<q-input v-model="department" label="Department" readonly />
		<q-input v-model="room" label="Room number" readonly />
		<q-input
			v-model="patient.dateOfAdmission"
			label="Date of admission"
			readonly
		/>
		<q-input
			v-model="patient.reasonOfAdmission"
			label="Reason of admission"
			readonly
		/>
		<q-input v-model="physicianName" label="Attending physician" readonly />
		<q-input v-model="patient.diet" label="Dietary constraints" />
		<q-input v-model="patient.remarks" label="Remarks" type="textarea" />
	</q-form>
</template>

<script>
export default {
	name: "PatientInfo",
	props: {
		patient: {
			type: Object
		}
	},
	computed: {
		physicianName() {
			return this.patient.physician ? this.patient.physician.name : "";
		}
	},
	data() {
		return {
			department: "Test",
			room: "4.10"
		};
	}
};
</script>

<style scoped lang="scss">
.q-input {
	margin: 1rem auto;
}
</style>
