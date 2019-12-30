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

	async getRoomsForDepartment(deptId) {
		try {
			const result = await axios.get(
				`${BASE_URL}/rooms?departmentId=${deptId}&_embed=patients`
			);
			return await result.data;
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async getPatient(id) {
		try {
			const result = await axios.get(
				`${BASE_URL}/patients/${id}?_embed=actions&_expand=physician`
			);
			return await result.data;
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}
