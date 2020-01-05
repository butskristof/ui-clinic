<template>
	<q-page>
		<q-toolbar class="bg-grey-3">
			<q-icon
				color="primary"
				name="arrow_back"
				size="sm"
				class="q-mr-sm"
				@click="backToOverview"
			/>
			Departments
			<q-space />
			<q-btn-toggle
				flat
				stretch
				v-if="downloaded && this.rooms.length > 0"
				v-model="view"
				:options="[
					{ icon: 'map', value: 'map' },
					{ icon: 'list', value: 'list' }
				]"
			/>
		</q-toolbar>

		<div v-if="departmentName" class="text-h4 title">
			{{ departmentName }}
		</div>

		<div v-if="downloaded && this.rooms.length > 0">
			<DepartmentMap
				v-if="view === 'map'"
				:rooms="this.rooms"
				@startAlarm="startAlarm"
				@stopAlarm="stopAlarm"
			/>
			<DepartmentList
				v-if="view === 'list'"
				:rooms="this.rooms"
				@startAlarm="startAlarm"
				@stopAlarm="stopAlarm"
			/>
			<audio id="alarm-audio" src="statics/alarm.mp3" preload="auto" />
		</div>

		<NoContent v-else-if="downloaded" @tryAgain="init">
			No rooms available
		</NoContent>

		<Loading v-else />
	</q-page>
</template>

<script>
import { mapGetters } from "vuex";
import ClinicService from "../services/ClinicService";
const clinic = new ClinicService();
import MedicalDataService from "../services/MedicalDataService";
const medicalData = new MedicalDataService();

import DepartmentMap from "../components/Department/DepartmentMap/DepartmentMap";
import DepartmentList from "../components/Department/DepartmentList/DepartmentList";
import Loading from "../components/Shared/Loading";
import NoContent from "../components/Shared/NoContent";

export default {
	name: "PageDepartment",
	components: { NoContent, Loading, DepartmentMap, DepartmentList },
	props: {
		id: {
			required: true
		}
	},
	computed: {
		...mapGetters("settings", ["settings"])
	},
	data() {
		return {
			downloaded: false,
			view: "map", // TODO replace with setting
			rooms: [],
			departmentName: "",
			updateInterval: null,
			playAlarm: false
		};
	},
	methods: {
		backToOverview() {
			this.$router.push({
				name: "Clinic"
			});
		},
		getDepartmentName() {
			return clinic
				.getDepartmentName(this.id)
				.then(name => (this.departmentName = name));
		},
		getRooms() {
			return clinic
				.getRoomsForDepartment(this.id)
				.then(rooms => (this.rooms = rooms))
				.then(() => {
					this.rooms.forEach(r => {
						if (r.patients[0] && !r.patients[0].metrics) {
							medicalData
								.getPatientMedicalData()
								.then(data =>
									this.$set(r.patients[0], "metrics", data)
								);
						}
					});
				});
		},
		startAlarm() {
			if (this.settings.enableAlarm) {
				document.querySelector("#alarm-audio").play();
			}
		},
		stopAlarm() {
			document.querySelector("#alarm-audio").pause();
		},
		async init() {
			clearInterval(this.updateInterval);
			this.getDepartmentName();
			this.getRooms();
			this.updateInterval = setInterval(this.getRooms, 10000);
		}
	},
	async mounted() {
		await this.init();
		this.downloaded = true;
	},
	beforeDestroy() {
		clearInterval(this.updateInterval);
	}
};
</script>

<style lang="scss">
.title {
	margin-top: 1rem;
	margin-left: 1rem;
}

.q-btn-group > .q-btn.text-primary {
	background: rgba(0, 0, 0, 0.25);
}

audio {
	position: absolute;
	visibility: hidden;
}
</style>
