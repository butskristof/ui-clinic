import { LocalStorage } from "quasar";

const state = {
	settings: {
		viewPreferences: {
			roomNumber: true,
			facilities: true,
			patient: true,
			monitoringData: true,
			nextAction: true
		},
		tresholds: {
			heartRate: {
				lower: 50,
				upper: 100
			},
			bloodPressure: {
				lower: 90,
				upper: 140
			}
		},
		enableAlarm: false,
		alarmTime: 120,
		defaultView: "list"
	}
};

const mutations = {
	setViewPreference(state, payload) {
		state.settings.viewPreferences[payload.key] = payload.value;
	},
	setTreshold(state, payload) {
		state.settings.tresholds[payload.key][payload.type] = payload.value;
	},
	setAlarm(state, value) {
		state.settings.enableAlarm = value;
	},
	setAlarmTime(state, value) {
		state.settings.alarmTime = value;
	},
	setDefaultView(state, value) {
		state.settings.defaultView = value;
	},
	setSettings(state, settings) {
		Object.assign(state.settings, settings);
	}
};

const actions = {
	setViewPreference({ commit, dispatch }, payload) {
		commit("setViewPreference", payload);
		dispatch("saveSettings");
	},
	setTreshold({ commit, dispatch }, payload) {
		commit("setTreshold", payload);
		dispatch("saveSettings");
	},
	setAlarm({ commit, dispatch }, value) {
		commit("setAlarm", value);
		dispatch("saveSettings");
	},
	setAlarmTime({ commit, dispatch }, value) {
		commit("setAlarmTime", value);
		dispatch("saveSettings");
	},
	setDefaultView({ commit, dispatch }, value) {
		commit("setDefaultView", value);
		dispatch("saveSettings");
	},
	saveSettings({ state }) {
		LocalStorage.set("settings", state.settings);
	},
	getSettings({ commit }) {
		const settings = LocalStorage.getItem("settings");
		if (settings) {
			commit("setSettings", settings);
		}
	}
};

const getters = {
	settings: state => {
		return state.settings;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
};
