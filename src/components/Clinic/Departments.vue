<template>
	<DepartmentsList
		v-if="downloaded && departments.length > 0"
		:departments="departments"
		@toDept="toDept"
	/>

	<NoContent v-else-if="downloaded" @tryAgain="getDepartments">
		No departments available
	</NoContent>

	<Loading v-else />
</template>

<script>
import ClinicService from "../../services/ClinicService";
import DepartmentsList from "./DepartmentsList";
import NoContent from "../Shared/NoContent";
import Loading from "../Shared/Loading";
const clinic = new ClinicService();

export default {
	name: "Departments",
	components: { DepartmentsList, NoContent, Loading },
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
			this.downloaded = false;
			clinic.getDepartments().then(depts => {
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

<style scoped></style>
