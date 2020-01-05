<template>
	<div id="metrics-wrapper">
		<LineChart />
	</div>
</template>

<script>
import LineChart from "./LineChart";
export default {
	name: "PatientMetrics",
	components: { LineChart }
};
</script>

<style scoped lang="scss">
#metrics-wrapper {
	flex-grow: 1;
}
</style>
