<template>
	<q-page class="q-pa-md">
		<div class="title">Choose department</div>
		<q-list bordered separator class="q-mt-md">
			<q-item
				clickable
				v-ripple
				v-for="dept in departments"
				:key="dept.id"
				@click="toDept(dept.id)"
			>
				<q-item-section avatar>
					<q-avatar rounded>
						<img
							src="https://cdn.quasar.dev/img/mountains.jpg"
							alt="Mountains"
						/>
					</q-avatar>
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ dept.name }}</q-item-label>
					<q-item-label>2 rooms</q-item-label>
				</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
import ClinicService from "../services/ClinicService";
const clicic = new ClinicService();

export default {
	name: "PageClinic",
	data() {
		return {
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
			clicic.getDepartments().then(depts => (this.departments = depts));
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
	font-size: 2rem;
}
/*TODO scroll area?*/
/*	TODO ellipsis on dept name*/
</style>
