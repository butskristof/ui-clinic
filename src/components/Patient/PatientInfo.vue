<template>
	<q-form class="q-ma-md" @submit="updatePatientInfo">
		<q-input
			v-model="patient.room.departmentName"
			label="Department"
			readonly
		/>
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

		<q-btn
			color="secondary"
			label="Save changes"
			class="q-mt-md"
			type="submit"
		/>
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
		roomNumber() {
			return this.patient.room ? this.patient.room.number : "";
		}
	},
	methods: {
		updatePatientInfo() {
			this.$emit("updatePatientInfo");
		}
	}
};
</script>

<style scoped lang="scss">
.q-input {
	margin: 1rem auto;
}
</style>
