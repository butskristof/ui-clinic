import { Notify } from "quasar";

const ErrorService = {
	showAlert(message, color) {
		Notify.create({
			color: color,
			position: "bottom",
			message: message,
			icon: "report_problem"
		});
	}
};

export default ErrorService;
