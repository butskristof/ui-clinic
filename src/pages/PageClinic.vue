<template>
	<q-page>
		<q-tabs v-model="tab">
			<q-tab name="departments" icon="folder_open" label="Departments" />
			<q-tab name="info" icon="info" label="Info" />
		</q-tabs>

		<Departments v-if="tab === 'departments'" />
	</q-page>
</template>

<script>
import Departments from "../components/Clinic/Departments";

export default {
	name: "PageClinic",
	components: { Departments },
	data() {
		return {
			tab: "departments",
			downloaded: false,
			departments: []
		};
	}
};
</script>

<style scoped lang="scss"></style>
