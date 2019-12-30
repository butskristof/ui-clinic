<template>
	<q-form class="q-ma-md">
		<q-input v-model="departmentName" label="Department" readonly />
		<q-input v-model="roomNumber" label="Room number" readonly />
		<q-input
			:value="patient.dateOfAdmission | moment('DD/MM/YYYY')"
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
		},
		departmentName() {
			return this.patient.room.departmentName
				? this.patient.room.departmentName
				: "";
		},
		roomNumber() {
			return this.patient.room ? this.patient.room.number : "";
		}
	}
};
</script>

<style scoped lang="scss">
.q-input {
	margin: 1rem auto;
}
</style>
