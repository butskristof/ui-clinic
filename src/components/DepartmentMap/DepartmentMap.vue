<template>
	<q-page>
		<img
			src="statics/floorplan.png"
			alt="UI Clinic floorplan"
			id="floorplan"
		/>
	</q-page>
</template>

<script>
export default {
	name: "DepartmentMap",
	props: {
		rooms: {
			type: Array,
			required: true
		}
	}
};
</script>

<style scoped>
#floorplan {
	position: absolute;
	width: 100%;
	min-width: 1000px;
}
</style>
