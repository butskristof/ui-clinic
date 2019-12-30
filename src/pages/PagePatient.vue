<template>
	<q-page class="q-ma-md">
		Patient name
	</q-page>
</template>

<script>
export default {
	name: "PagePatient",
	props: {
		id: {
			required: true
		}
	},
	data() {
		return {
			patient: {}
		};
	},
	methods: {
		getPatient() {

		}
	},
	mounted() {
		this.getPatient();
	}
};
</script>

<style scoped></style>
