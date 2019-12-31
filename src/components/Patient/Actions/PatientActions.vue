<template>
	<div>
		<q-toolbar>
			<q-space />
			<q-toggle
				v-model="showCompleted"
				label="Show completed"
				left-label
			/>
		</q-toolbar>

		<div id="patient-actions">
			<PatientAction
				class="q-ma-md"
				v-for="action in filteredActions"
				:key="action.id"
				:action="action"
				@updateActionStatus="updateActionStatus"
				@updateActionDetails="updateActionDetails"
				@deleteAction="deleteAction"
			/>
		</div>

		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="secondary" icon="add" />
		</q-page-sticky>
	</div>
</template>

<script>
import PatientAction from "../../Shared/PatientAction";

export default {
	name: "PatientActions",
	components: { PatientAction },
	props: {
		actions: {
			required: true
		}
	},
	computed: {
		filteredActions() {
			let actions = this.actions;
			if (!this.showCompleted) {
				actions = actions.filter(a => !a.done);
			}
			return actions;
		}
	},
	data() {
		return {
			showCompleted: true
		};
	},
	methods: {
		updateActionStatus(id, value) {
			this.$emit("updateActionStatus", id, value);
		},
		updateActionDetails(id, timestamp, description) {
			this.$emit("updateActionDetails", id, timestamp, description);
		},
		deleteAction(id) {
			this.$emit("deleteAction", id);
		}
	}
};
</script>

<style scoped lang="scss">
#patient-actions {
	margin-top: -1rem;
}
</style>
