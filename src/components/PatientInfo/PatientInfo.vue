<template>
	<q-form class="q-ma-md">
		<q-input v-model="department" label="Department" readonly />
		<q-input v-model="room" label="Room number" readonly />
		<q-input v-model="date" label="Date of admission" readonly />
		<q-input v-model="reason" label="Reason of admission" readonly />
		<q-input v-model="physician" label="Attending physician" readonly />
		<q-input v-model="diet" label="Dietary constraints" />
		<q-input v-model="remarks" label="Remarks" type="textarea" />
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
	data() {
		return {
			department: "Test",
			room: "4.10",
			date: "01/01/2020",
			reason: "Food poisoning",
			physician: "Joske",
			diet: "Just some text",
			remarks: "Grass smells good found something move i bite it tail bite off human's toes cat not kitten around sit in box or get my claw stuck in the dog's ear. Purr for no reason pee on walls it smells like breakfast and pet me pet me don't pet me."
		};
	}
};
</script>

<style scoped lang="scss">
.q-input {
	margin: 1rem auto;
}
</style>
