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
				<q-item-section>{{ dept.name }}</q-item-section>
			</q-item>
		</q-list>
	</q-page>
</template>

<script>
export default {
	name: "PageClinic",
	data() {
		return {
			departments: [
				{
					id: 0,
					name: "dept1"
				},
				{
					id: 1,
					name: "dept2"
				},
				{
					id: 2,
					name: "dept3"
				}
			]
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
		}
	}
};
</script>

<style scoped lang="scss">
.title {
	/* TODO other font?*/
	font-size: 2rem;
}
/*TODO scroll area?*/
</style>
