import axios from "axios";
import ErrorService from "./ErrorService";

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
			ErrorService.showAlert("Could not get departments", "red");
			return [];
		}
	}

	async getDepartmentName(id) {
		try {
			const result = await axios.get(`${BASE_URL}/departments/${id}`);
			const data = await result.data;
			return data.name;
		} catch (err) {
			// ErrorService.showAlert("Could not get department name", "red");
			return null;
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
			ErrorService.showAlert(
				"Could not get rooms for this department",
				"red"
			);
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
			return null;
		}
	}

	async updatePatientInfo(patientId, diet, remarks) {
		try {
			await axios.patch(`${BASE_URL}/patients/${patientId}`, {
				diet,
				remarks
			});
		} catch (err) {
			ErrorService.showAlert(
				"Error while updating patient information.",
				"red"
			);
		}
	}

	async getNextActionForPatient(patientId) {
		try {
			const result = await axios.get(
				`${BASE_URL}/actions?patientId=${patientId}`
			);
			const actions = await result.data;
			const now = new Date();
			actions.sort(
				(a, b) => new Date(a.timestamp) - new Date(b.timestamp)
			);
			return actions.filter(
				a => a.done === false || new Date(a.timestamp) > now
			)[0];
		} catch (err) {
			return null;
		}
	}

	async setActionStatus(actionId, value) {
		try {
			await axios.patch(`${BASE_URL}/actions/${actionId}`, {
				done: value
			});
		} catch (err) {
			ErrorService.showAlert("Could not update action status", "red");
		}
	}

	async setActionDetails(actionId, timestamp, description) {
		try {
			await axios.patch(`${BASE_URL}/actions/${actionId}`, {
				timestamp,
				description
			});
		} catch (err) {
			ErrorService.showAlert("Could not update action details", "red");
		}
	}

	async deleteAction(id) {
		try {
			// await axios.delete(`${BASE_URL}/actions/${id}`);
			console.log(`Just pretend we've deleted action with id ${id}`);
		} catch (err) {
			ErrorService.showAlert("Could not delete action", "red");
		}
	}

	async addAction(payload) {
		try {
			await axios.post(`${BASE_URL}/actions`, payload);
		} catch (err) {
			ErrorService.showAlert("Error while adding action", "red");
		}
	}
}
