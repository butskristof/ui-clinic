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
				v-model="view"
				:options="[
					{ icon: 'map', value: 'map' },
					{ icon: 'list', value: 'list' }
				]"
			/>
		</q-toolbar>

		Department name

		<DepartmentMap v-if="view === 'map'" :rooms="this.rooms" />
		<DepartmentList v-if="view === 'list'" :rooms="this.rooms" />
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
const clinic = new ClinicService();

import DepartmentMap from "../components/DepartmentMap/DepartmentMap";
import DepartmentList from "../components/DepartmentList/DepartmentList";

export default {
	name: "PageDepartment",
	components: { DepartmentMap, DepartmentList },
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			view: "list", // TODO replace with setting
			rooms: [],
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
		getRooms() {
			clinic
				.getRoomsForDepartment(this.id)
				.then(rooms => (this.rooms = rooms));
		}
	},
	mounted() {
		this.getRooms();
		this.updateInterval = setInterval(this.getRooms, 10000);
	}
};
</script>

<style lang="scss">
.q-btn-group > .q-btn.text-primary {
	background: rgba(0, 0, 0, 0.25);
}
</style>
