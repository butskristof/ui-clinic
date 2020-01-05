<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveData } = mixins;

import MedicalDataService from "../../../services/MedicalDataService";
const service = new MedicalDataService();

export default {
	extends: Line,
	mixins: [reactiveData],
	props: ["options"],
	data() {
		return {
			healthData: {},
			updateInterval: null
		};
	},
	methods: {
		getData() {
			return service.getMedicalData().then(data => {
				this.healthData = data;
			});
		},
		updateData() {
			service.getPatientMedicalData().then(data => {
				if (
					this.chartData.labels[this.chartData.labels.length - 1] !==
					data.label
				) {
					const newData = { ...this.chartData };
					newData.labels.push(data.label);
					newData.datasets[0].data.push(data.heartRate);
					newData.datasets[1].data.push(data.bloodPressure.upper);
					newData.datasets[2].data.push(data.bloodPressure.lower);
					this.chartData = newData;
				}
			});
		},
		async init() {
			await this.getData();
			this.chartData = {
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

			this.renderChart(this.chartData, this.options);

			if (this.updateInterval == null) {
				this.updateInterval = setInterval(this.updateData, 10000);
			}
		}
	},
	mounted() {
		this.init();
	},
	beforeDestroy() {
		clearInterval(this.updateInterval);
		this.updateInterval = null;
	}
};
</script>
