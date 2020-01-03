<template>
	<q-page class="q-pa-md">
		<div class="text-h4 title">Departments</div>
		<DepartmentsList
			v-if="downloaded && departments.length > 0"
			:departments="departments"
			@toDept="toDept"
		/>
		<div v-else-if="downloaded" class="absolute-center">
			No departments available
		</div>
		<Loading v-else />
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
import DepartmentsList from "../components/Clinic/DepartmentsList";
import Loading from "../components/Shared/Loading";
const clicic = new ClinicService();

export default {
	name: "PageClinic",
	components: { Loading, DepartmentsList },
	data() {
		return {
			downloaded: false,
			departments: []
		};
	},
	methods: {
		toDept(id) {
			this.$router.push({
				name: "Department",
				params: {
					id
				}
			});
		},
		getDepartments() {
			clicic.getDepartments().then(depts => {
				this.departments = depts;
				this.downloaded = true;
			});
		}
	},
	mounted() {
		this.getDepartments();
	}
};
</script>

<style scoped lang="scss">
.title {
	/* TODO other font?*/
	/*font-size: 2rem;*/
	font-weight: bold;
}
/*TODO scroll area?*/
/*	TODO ellipsis on dept name*/
</style>
