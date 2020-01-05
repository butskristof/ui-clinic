<template>
	<div id="metrics-wrapper">
		<LineChart :options="chartOptions" />
	</div>
</template>

<script>
import LineChart from "./LineChart";
export default {
	name: "PatientMetrics",
	computed: {
		chartOptions() {
			return {
				responsive: true,
				maintainAspectRatio: false,
				aspectRatio: 0.5,
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}
					]
				}
			};
		}
	},
	components: { LineChart }
};
</script>

<style scoped lang="scss">
#metrics-wrapper {
	flex-grow: 1;
}
</style>
