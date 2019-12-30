<template>
	<div id="patient-actions">
		<PatientAction
			v-for="action in actions"
			:key="action.id"
			:action="action"
		/>
	</div>
</template>

<script>
import PatientAction from "./PatientAction";
export default {
	name: "PatientActions",
	components: { PatientAction },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			actions: [
				{
					type: 0,
					description: "Russian blue have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat lie on your belly and purr when you are asleep meow.",
					timestamp: new Date(),
					done: false
				}
			]
		};
	}
};
</script>

<style scoped></style>
