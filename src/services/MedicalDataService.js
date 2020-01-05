import axios from "axios";
import ErrorService from "./ErrorService";

const BASE_URL = "http://localhost:3001";

export default class MedicalDataService {
	async getMedicalData() {
		try {
			const result = await axios.get(`${BASE_URL}/historic`);
			return await result.data;
		} catch (err) {
			ErrorService.showAlert(err.message, "red");
		}
	}

	async getPatientMedicalData() {
		try {
			const result = await axios.get(`${BASE_URL}/now`);
			return await result.data;
		} catch (err) {
			ErrorService.showAlert(err.message, "red");
		}
	}
}
