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
	</q-page>
</template>

<script>
export default {
	name: "PageDepartment",
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			view: "map" // TODO replace with setting
		};
	},
	methods: {
		backToOverview() {
			this.$router.push({
				name: "Clinic"
			});
		}
	}
};
</script>

<style lang="scss">
.q-btn-group > .q-btn.text-primary {
	background: rgba(0, 0, 0, 0.25);
}
</style>
