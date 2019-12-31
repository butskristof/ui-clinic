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

	async getDepartmentName(id) {
		try {
			const result = await axios.get(`${BASE_URL}/departments/${id}`);
			const data = await result.data;
			return data.name;
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
				`${BASE_URL}/patients/${id}?_embed=actions&_expand=physician&_expand=room`
			);
			return await result.data;
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async updatePatientInfo(patientId, diet, remarks) {
		try {
			await axios.patch(`${BASE_URL}/patients/${patientId}`, {
				diet,
				remarks
			});
		} catch (err) {
			console.error(err);
		}
	}

	async getNextActionForPatient(patientId) {
		try {
			const result = await axios.get(
				`${BASE_URL}/actions?patientId=${patientId}`
			);
			const actions = await result.data;
			const now = new Date();
			return actions
				.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
				.filter(a => new Date(a.timestamp) > now)[0];
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async setActionStatus(actionId, value) {
		try {
			await axios.patch(`${BASE_URL}/actions/${actionId}`, {
				done: value
			});
		} catch (err) {
			console.error(err);
		}
	}

	async setActionDetails(actionId, timestamp, description) {
		try {
			console.log(description);
			await axios.patch(`${BASE_URL}/actions/${actionId}`, {
				timestamp,
				description
			});
		} catch (err) {
			console.error(err);
		}
	}

	async deleteAction(id) {
		try {
			// await axios.delete(`${BASE_URL}/actions/${id}`);
			console.log(`Just pretend we've deleted action with id ${id}`);
		} catch (err) {
			console.error(err);
		}
	}

	async addAction(payload) {
		try {
			await axios.post(`${BASE_URL}/actions`, payload);
		} catch (err) {
			console.error(err);
		}
	}
}
