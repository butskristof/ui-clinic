import { Notify } from "quasar";

const ErrorService = {
	showAlert(message, color) {
		console.log(message);
		console.log(color);
		Notify.create({
			color: color,
			position: "bottom",
			message: message,
			icon: "report_problem"
		});
	}
};

export default ErrorService;
