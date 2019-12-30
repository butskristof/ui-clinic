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
				lower: 50,
				upper: 100
			}
		},
		enableAlarm: true
	}
};

const mutations = {
	setViewPreference(state, payload) {
		state.settings.viewPreferences[payload.key] = payload.value;
	},
	setLowerTreshold(state, payload) {
		state.settings.tresholds[payload.key].lower = payload.value;
	},
	setUpperTreshold(state, payload) {
		state.settings.tresholds[payload].upper = payload.value;
	},
	setAlarm(state, value) {
		state.enableAlarm = value;
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
	setLowerTreshold({ commit, dispatch }, payload) {
		commit("setLowerTreshold", payload);
		dispatch("saveSettings");
	},
	setUpperTreshold({ commit, dispatch }, payload) {
		commit("setUpperTreshold", payload);
		dispatch("saveSettings");
	},
	setAlarm({ commit, dispatch }, value) {
		commit("setAlarm", value);
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
