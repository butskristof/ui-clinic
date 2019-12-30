export function actionTypeToName(type) {
	switch (type) {
		case 0:
			return "Eten";
		case 1:
			return "Wassen";
		case 2:
			return "Omkeren";
		case 10:
			return "Medicatie";
		case 11:
			return "Injectie";
		case 12:
			return "Infuus";
		default:
			return "Unknown action";
	}
}

export function checkActionAccess(type) {
	return type < 10;
}
