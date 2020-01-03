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

		<div
			v-if="filteredActions.length > 0"
			id="patient-actions"
			class="q-mb-xl"
		>
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
		<div v-else class="empty-state">
			There are no upcoming actions for this patient.
		</div>

		<q-page-sticky position="bottom-right" :offset="[18, 18]">
			<q-btn round color="secondary" icon="add" @click="addAction" />
		</q-page-sticky>
	</div>
</template>

<script>
import PatientAction from "../../Shared/PatientAction";
import AddActionDialog from "./AddActionDialog";

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
			if (actions) {
				actions.sort(
					(a, b) => new Date(a.timestamp) - new Date(b.timestamp)
				);
			}
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
		updateActionDetails(id, payload) {
			this.$emit("updateActionDetails", id, payload);
		},
		deleteAction(id) {
			this.$emit("deleteAction", id);
		},
		addAction() {
			this.$q
				.dialog({
					component: AddActionDialog,
					parent: this // becomes child of this Vue node
				})
				.onOk(payload => {
					this.$emit("addAction", payload);
				});
		}
	}
};
</script>

<style scoped lang="scss">
.empty-state {
	width: 100%;
	text-align: center;
	margin-top: 2rem;
}
#patient-actions {
	margin-top: -1rem;
}
</style>
