import axios from "axios";

const BASE_URL = "http://localhost:3000";
const CLINIC_ID = 1;

export default class ClinicService {
	async getDepartments() {
		try {
			const result = await axios.get(
				`${BASE_URL}/departments?clinicId=${CLINIC_ID}`
			);
			return await result.data;
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}
