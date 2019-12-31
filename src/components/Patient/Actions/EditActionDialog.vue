<template>
	<q-dialog ref="dialog" @hide="onDialogHide">
		<q-card class="q-dialog-plugin">
			<q-form @submit="onOKClick">
				<q-card-section>
					<div class="text-h6">Edit action</div>
				</q-card-section>

				<q-card-section>
					<q-input
						v-model="date"
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
										v-model="date"
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
										v-model="date"
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
						v-model="action.description"
						label="Description"
						type="textarea"
					/>
				</q-card-section>

				<!-- buttons example -->
				<q-card-actions align="right">
					<q-btn
						color="secondary"
						label="Cancel"
						@click="onCancelClick"
					/>
					<q-btn
						color="secondary"
						label="Save changes"
						type="submit"
					/>
				</q-card-actions>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script>
export default {
	props: {
		action: {
			type: Object
		}
	},
	data() {
		return {
			text: "",
			date: "",
			time: ""
		};
	},
	computed: {
		/**
		 * @return {string}
		 */
		DATETIME_FORMAT() {
			return "DD/MM/YYYY HH:mm";
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
			const date = this.$moment(this.date, this.DATETIME_FORMAT).format();
			this.$emit("ok", {
				timestamp: date,
				description: this.action.description
			});
			// or with payload: this.$emit('ok', { ... })

			// then hiding dialog
			this.hide();
		},

		onCancelClick() {
			// we just need to hide dialog
			this.hide();
		}
	},
	mounted() {
		this.date = this.$moment(this.action.timestamp).format(
			this.DATETIME_FORMAT
		);
	}
};
</script>
