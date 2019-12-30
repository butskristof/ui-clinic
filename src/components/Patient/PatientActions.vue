<template>
	<div>
		<div id="patient-actions">
			<PatientAction
				v-for="action in actions"
				:key="action.id"
				:action="action"
			/>
		</div>
		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="secondary" icon="add" />
		</q-page-sticky>
	</div>
</template>

<script>
import PatientAction from "./PatientAction";

export default {
	name: "PatientActions",
	components: { PatientAction },
	props: {
		actions: {
			required: true
		}
	}
};
</script>

<style scoped></style>
