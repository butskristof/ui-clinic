<template>
	<q-card id="patient-action">
		<q-card-section class="row">
			<div class="col">
				<div class="text-h6">{{ actionName }}</div>
				<div class="text-subtitle2">
					{{ action.timestamp | moment("DD/MM/YYYY HH:mm") }}
				</div>
			</div>
			<div class="col-auto action-status-icon">
				<q-icon v-if="action.done" name="check_circle_outline" />
				<q-icon v-else name="hourglass_empty" />
			</div>
		</q-card-section>

		<q-card-section v-if="action.description">
			{{ action.description }}
		</q-card-section>

		<q-separator />

		<q-card-actions align="between">
			<q-btn
				flat
				color="primary"
				:label="completedText"
				@click="$emit('updateActionStatus', action.id, !action.done)"
			/>
			<div v-if="allowed">
				<q-btn flat color="primary" icon="edit" @click="showDialog" />
				<q-btn
					flat
					color="primary"
					icon="delete"
					@click="deleteAction"
				/>
			</div>
		</q-card-actions>
	</q-card>
</template>

<script>
import {
	actionTypeToName,
	checkActionAccess
} from "../../functions/actionTypeFunctions";
import EditActionDialog from "../Patient/Actions/EditActionDialog";

export default {
	name: "PatientAction",
	props: {
		action: {
			required: true
		}
	},
	data() {
		return {
			showEditDialog: false
		};
	},
	computed: {
		completedText() {
			return `Mark ${this.action.done ? "incomplete" : "complete"}`;
		},
		allowed() {
			return checkActionAccess(this.action.type);
		},
		actionName() {
			return actionTypeToName(this.action.type);
		}
	},
	methods: {
		showDialog() {
			this.$q
				.dialog({
					component: EditActionDialog,
					parent: this, // becomes child of this Vue node
					action: { ...this.action }
				})
				.onOk(payload => {
					this.$emit("updateActionDetails", this.action.id, payload);
				});
		},
		deleteAction() {
			this.$q
				.dialog({
					title: "Confirm delete",
					message: "Are you sure you want to delete this action?",
					cancel: true,
					persistent: true,
					ok: "Delete"
				})
				.onOk(() => {
					this.$emit("deleteAction", this.action.id);
				});
		}
	}
};
</script>

<style scoped lang="scss">
#patient-action {
	max-width: 25rem;
	width: 100%;
}

.action-status-icon {
	font-size: 2rem;
}
</style>
