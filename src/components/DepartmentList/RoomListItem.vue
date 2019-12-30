<template>
	<q-card class="room-box">
		<q-card-section class="row">
			<div class="col">
				<h4>Room {{ room.number }}</h4>
			</div>
			<div class="col-auto" id="facilities">
				<q-icon
					v-for="f in room.facilities"
					:key="f"
					:name="facilities[f].icon"
					size="xs"
				/>
			</div>
		</q-card-section>

		<q-card-section>
			<q-avatar id="patient-picture">
				<img
					src="https://lorempixel.com/200/200/people"
					alt="Patient picture"
				/>
			</q-avatar>
			<span id="patient-name">{{ room.patient.name }}</span>
		</q-card-section>

		<q-card-section id="monitoring-data">
			<div class="monitoring-data-item">
				<q-icon name="fas fa-heartbeat" size="sm" /> 75
			</div>
			<div class="monitoring-data-item">
				<q-icon name="fas fa-stopwatch" size="sm" /> 75
			</div>
		</q-card-section>

		<q-card-section>
			Next action
		</q-card-section>
	</q-card>
</template>

<script>
export default {
	name: "RoomListItem",
	props: {
		room: {
			type: Object,
			required: true
		}
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
.room-box {
	min-width: 150px;
	margin: 1rem;
}

h4 {
	margin: 0 auto;
}

#facilities {
	align-self: flex-end;

	.q-icon {
		/*font-size: 1.25rem;*/
		margin: 0.25rem;
	}
}

#patient-picture {
	margin-right: 1rem;
}

#patient-name {
	font-size: 1.25rem;
}

.monitoring-data-item {
	display: inline-block;
	margin: auto 0.5rem;

	&:first-of-type {
		margin-left: 0;
	}

	font-size: 1.1rem;

	.q-icon {
		margin-right: 0.3rem;
	}
}
</style>
