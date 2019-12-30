<template>
	<q-card id="patient-action" class="q-ma-md">
		<q-card-section>
			<div class="text-h6">{{ actionName }}</div>
			<div class="text-subtitle2">{{ action.timestamp }}</div>
		</q-card-section>

		<q-card-section>
			{{ action.description }}
		</q-card-section>

		<q-separator />

		<q-card-actions align="right">
			<q-btn flat color="primary" label="Mark complete" />
			<q-btn flat color="primary" icon="edit" />
			<q-btn flat dense color="primary" icon="delete" />
		</q-card-actions>
	</q-card>
</template>

<script>
import {
	actionTypeToName,
	checkActionAccess
} from "../../functions/actionTypeFunctions";

export default {
	name: "PatientAction",
	props: {
		action: {
			required: true
		}
	},
	computed: {
		allowed() {
			return checkActionAccess(this.action.type);
		},
		actionName() {
			return actionTypeToName(this.action.type);
		}
	}
};
</script>

<style scoped></style>
