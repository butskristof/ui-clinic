<script>
import { Line } from "vue-chartjs";

import MedicalDataService from "../../../services/MedicalDataService";
const service = new MedicalDataService();

export default {
	extends: Line,
	data() {
		return {
			healthData: {}
		};
	},
	methods: {
		getData() {
			return service.getMedicalData().then(data => {
				this.healthData = data;
			});
		},
		async init() {
			await this.getData();
			const dataObject = {
				labels: this.healthData.labels,
				datasets: [
					{
						label: "Heart rate",
						data: this.healthData.datasets.heartRate,
						backgroundColor: "red",
						borderColor: "red",
						fill: false
					},
					{
						label: "Blood pressure systolic",
						data: this.healthData.datasets.bloodPressureUpper,
						backgroundColor: "green",
						borderColor: "green",
						fill: false
					},
					{
						label: "Blood pressure diastolic",
						data: this.healthData.datasets.bloodPressureLower,
						backgroundColor: "blue",
						borderColor: "blue",
						fill: false
					}
				]
			};
			const optionsObject = {
				responsive: true,
				maintainAspectRatio: false,
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

			this.renderChart(dataObject, optionsObject);
		}
	},
	mounted() {
		this.init();
	}
};
</script>
