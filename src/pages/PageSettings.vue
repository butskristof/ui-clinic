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

		<q-list bordered padding class="q-mb-md">
			<q-item-label header>Treshold preferences</q-item-label>

			<q-item tag="label" class="row">
				<q-item-section class="col-2">
					<q-item-label>Heart rate</q-item-label>
				</q-item-section>
				<q-item-section class="col">
					<q-range
						v-model="heartRateRange"
						:min="0"
						:max="200"
						label-always
					/>
				</q-item-section>
			</q-item>

			<q-item tag="label" class="row">
				<q-item-section class="col-2">
					<q-item-label>Blood pressure systolic</q-item-label>
				</q-item-section>
				<q-item-section class="col">
					<q-slider
						v-model="bloodPressureUpper"
						:min="100"
						:max="180"
						label-always
					/>
				</q-item-section>
			</q-item>

			<q-item tag="label" class="row">
				<q-item-section class="col-2">
					<q-item-label>Blood pressure diastolic</q-item-label>
				</q-item-section>
				<q-item-section class="col">
					<q-slider
						v-model="bloodPressureLower"
						:min="60"
						:max="120"
						label-always
					/>
				</q-item-section>
			</q-item>
		</q-list>

		<q-list bordered padding class="q-mb-md">
			<q-item-label header>Alarm preferences</q-item-label>

			<q-item tag="label">
				<q-item-section>
					<q-item-label>Enable alarm sound</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-toggle color="blue" v-model="alarmSound" />
				</q-item-section>
			</q-item>

			<q-item tag="label" class="row">
				<q-item-section class="col-2">
					<q-item-label>Time before alarm</q-item-label>
				</q-item-section>
				<q-item-section class="col">
					<q-slider
						v-model="alarmTime"
						:min="0"
						:max="200"
						label-always
					/>
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
		},
		alarmSound: {
			get() {
				return this.settings.enableAlarm;
			},
			set(value) {
				this.setAlarm(value);
			}
		},
		heartRateUpper: {
			get() {
				return this.settings.tresholds.heartRate.upper;
			},
			set(value) {
				this.setTreshold({
					key: "heartRate",
					type: "upper",
					value
				});
			}
		},
		heartRateLower: {
			get() {
				return this.settings.tresholds.heartRate.lower;
			},
			set(value) {
				this.setTreshold({
					key: "heartRate",
					type: "lower",
					value
				});
			}
		},
		heartRateRange: {
			get() {
				return {
					min: this.heartRateLower,
					max: this.heartRateUpper
				};
			},
			set(value) {
				this.heartRateUpper = value.max;
				this.heartRateLower = value.min;
			}
		},
		bloodPressureUpper: {
			get() {
				return this.settings.tresholds.bloodPressure.upper;
			},
			set(value) {
				this.setTreshold({
					key: "bloodPressure",
					type: "upper",
					value
				});
			}
		},
		bloodPressureLower: {
			get() {
				return this.settings.tresholds.bloodPressure.lower;
			},
			set(value) {
				this.setTreshold({
					key: "bloodPressure",
					type: "lower",
					value
				});
			}
		},
		alarmTime: {
			get() {
				return this.settings.alarmTime;
			},
			set(value) {
				this.setAlarmTime(value);
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		...mapActions("settings", [
			"setViewPreference",
			"setAlarm",
			"setAlarmTime",
			"setTreshold"
		]),
		visitOurWebsite() {},
		emailUs() {}
	}
};
</script>
