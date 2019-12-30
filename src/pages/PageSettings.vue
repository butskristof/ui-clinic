<template>
	<q-page class="q-pa-md">
		<q-list bordered padding class="q-mb-md">
			<q-item-label header>View preferences</q-item-label>

			<q-item tag="label">
				<q-item-section>
					<q-item-label>Show room number</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle color="blue" v-model="roomNumber" />
				</q-item-section>
			</q-item>
			<q-item tag="label">
				<q-item-section>
					<q-item-label>Show facilities</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle color="blue" v-model="facilities" />
				</q-item-section>
			</q-item>
			<q-item tag="label">
				<q-item-section>
					<q-item-label>Show patient</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle color="blue" v-model="patient" />
				</q-item-section>
			</q-item>
			<q-item tag="label">
				<q-item-section>
					<q-item-label>Show monitoring data</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle color="blue" v-model="monitoringData" />
				</q-item-section>
			</q-item>
			<q-item tag="label">
				<q-item-section>
					<q-item-label>Show next action</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle color="blue" v-model="nextAction" />
				</q-item-section>
			</q-item>
		</q-list>

		<q-list bordered padding>
			<q-item-label header>More</q-item-label>

			<q-item to="/settings/help" tag="label" v-ripple>
				<q-item-section>
					<q-item-label>Help</q-item-label>
				</q-item-section>
			</q-item>

			<q-item @click="visitOurWebsite" tag="label" v-ripple>
				<q-item-section>
					<q-item-label>Visit our web site</q-item-label>
				</q-item-section>
			</q-item>

			<q-item @click="emailUs" tag="label" v-ripple>
				<q-item-section>
					<q-item-label>Email us</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "PageSettings",
	computed: {
		...mapGetters("settings", ["settings"]),
		roomNumber: {
			get() {
				return this.settings.viewPreferences.roomNumber;
			},
			set(value) {
				this.setViewPreference({
					key: "roomNumber",
					value
				});
			}
		},
		facilities: {
			get() {
				return this.settings.viewPreferences.facilities;
			},
			set(value) {
				this.setViewPreference({
					key: "facilities",
					value
				});
			}
		},
		patient: {
			get() {
				return this.settings.viewPreferences.patient;
			},
			set(value) {
				this.setViewPreference({
					key: "patient",
					value
				});
			}
		},
		monitoringData: {
			get() {
				return this.settings.viewPreferences.monitoringData;
			},
			set(value) {
				this.setViewPreference({
					key: "monitoringData",
					value
				});
			}
		},
		nextAction: {
			get() {
				return this.settings.viewPreferences.nextAction;
			},
			set(value) {
				this.setViewPreference({
					key: "nextAction",
					value
				});
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		...mapActions("settings", ["setViewPreference"]),
		visitOurWebsite() {},
		emailUs() {}
	}
};
</script>
