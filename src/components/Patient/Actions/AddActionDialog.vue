<template>
	<q-dialog ref="dialog" @hide="onDialogHide">
		<q-card class="q-dialog-plugin">
			<q-form @submit="onOKClick">
				<q-card-section>
					<div class="text-h6">Add action</div>
				</q-card-section>

				<q-card-section>
					<q-select
						v-model="newAction.type"
						:options="types"
						label="Type"
						lazy-rules
						:rules="[val => !!val || '* Required']"
					/>
				</q-card-section>

				<q-card-section>
					<q-input
						v-model="newAction.timestamp"
						readonly
						label="Date and time of action"
						lazy-rules
						:rules="[
							val => !!val || '* Required',
							val =>
								$moment(val, DATETIME_FORMAT).isValid() ||
								'Invalid date'
						]"
					>
						<template v-slot:append>
							<q-icon name="event" class="cursor-pointer">
								<q-popup-proxy
									ref="qDateProxy"
									transition-show="scale"
									transition-hide="scale"
								>
									<q-date
										v-model="newAction.timestamp"
										:mask="DATETIME_FORMAT"
										@input="() => $refs.qDateProxy.hide()"
									/>
								</q-popup-proxy>
							</q-icon>
							<q-icon name="access_time" class="cursor-pointer">
								<q-popup-proxy
									ref="qTimeProxy"
									transition-show="scale"
									transition-hide="scale"
								>
									<q-time
										v-model="newAction.timestamp"
										:mask="DATETIME_FORMAT"
										format24h
										@input="() => $refs.qTimeProxy.hide()"
									/>
								</q-popup-proxy>
							</q-icon>
						</template>
					</q-input>
				</q-card-section>

				<q-card-section>
					<q-input
						v-model="newAction.description"
						label="Description"
						type="textarea"
					/>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
						color="secondary"
						label="Cancel"
						@click="onCancelClick"
					/>
					<q-btn color="secondary" label="Add action" type="submit" />
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script>
import { getAllowedTypes } from "../../../functions/actionTypeFunctions";

export default {
	data() {
		return {
			newAction: {
				type: "",
				done: false,
				timestamp: "",
				description: ""
			}
		};
	},
	computed: {
		/**
		 * @return {string}
		 */
		DATETIME_FORMAT() {
			return "DD/MM/YYYY HH:mm";
		},
		types() {
			return getAllowedTypes();
		}
	},
	methods: {
		// following method is REQUIRED
		// (don't change its name --> "show")
		show() {
			this.$refs.dialog.show();
		},

		// following method is REQUIRED
		// (don't change its name --> "hide")
		hide() {
			this.$refs.dialog.hide();
		},

		onDialogHide() {
			// required to be emitted
			// when QDialog emits "hide" event
			this.$emit("hide");
		},

		onOKClick() {
			// on OK, it is REQUIRED to
			// emit "ok" event (with optional payload)
			// before hiding the QDialog
			const payload = { ...this.newAction };
			payload.timestamp = this.$moment(
				this.newAction.timestamp,
				this.DATETIME_FORMAT
			).format();
			payload.type = this.newAction.type ? this.newAction.type.value : "";
			this.$emit("ok", payload);

			// then hiding dialog
			this.hide();
		},

		onCancelClick() {
			// we just need to hide dialog
			this.hide();
		}
	}
};
</script>
