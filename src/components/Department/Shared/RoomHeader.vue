<template>
	<q-card-section class="row">
		<div class="col-auto flex">
			<StatusIndicator
				class="status-indicator"
				:room="room"
				:nextAction="nextAction"
				@startAlarm="$emit('startAlarm')"
				@stopAlarm="$emit('stopAlarm')"
			/>
		</div>
		<div class="col">
			<h4 v-if="settings.viewPreferences.roomNumber">
				Room {{ room.number }}
			</h4>
		</div>
		<div
			v-if="settings.viewPreferences.facilities"
			class="col-auto"
			id="facilities"
		>
			<q-icon
				v-for="f in room.facilities"
				:key="f"
				:name="facilities[f].icon"
				size="xs"
			/>
		</div>
	</q-card-section>
</template>

<script>
import { mapGetters } from "vuex";
import StatusIndicator from "./StatusIndicator";
export default {
	name: "RoomHeader",
	components: { StatusIndicator },
	props: {
		room: {
			type: Object,
			required: true
		},
		nextAction: {
			type: Object
		}
	},
	computed: {
		...mapGetters("settings", ["settings"])
	},
	data() {
		return {
			// TODO get from api
			facilities: {
				"1": {
					icon: "fas fa-bath"
				},
				"2": {
					icon: "fas fa-tv"
				}
			}
		};
	}
};
</script>

<style scoped lang="scss">
.status-indicator {
	align-self: center;
	width: 1.75rem;
	height: 1.75rem;
	margin-right: 0.75rem;
}

h4 {
	margin: 0 auto;
}

#facilities {
	align-self: flex-end;

	.q-icon {
		margin: 0.25rem;
	}
}
</style>
