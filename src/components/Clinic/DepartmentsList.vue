<template>
	<q-list bordered separator class="q-mt-md">
		<q-item
			clickable
			v-ripple
			v-for="dept in departments"
			:key="dept.id"
			@click="$emit('toDept', dept.id)"
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
</template>

<script>
export default {
	name: "DepartmentsList",
	props: {
		departments: {
			type: Array
		}
	}
};
</script>

<style scoped></style>
